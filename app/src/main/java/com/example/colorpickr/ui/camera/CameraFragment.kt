package com.example.colorpickr.ui.camera

import android.Manifest
import android.content.ContentValues.TAG
import android.content.Context
import android.content.pm.PackageManager
import androidx.lifecycle.Observer
import android.graphics.*
import android.hardware.camera2.*
import android.hardware.camera2.params.StreamConfigurationMap
import android.media.Image
import android.media.ImageReader
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.HandlerThread
import android.util.Log
import android.util.Size
import android.view.*
import android.widget.*
import androidx.annotation.RequiresApi
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.example.colorpickr.CompareSizesByArea
import com.example.colorpickr.R
import com.example.colorpickr.adapters.ColorSchemeAdapter
import com.example.colorpickr.services.ShareService
import java.io.File
import java.lang.Math.cos
import java.lang.Math.sin
import java.nio.ByteBuffer
import java.util.*


class CameraFragment : Fragment() {

    private val MAX_PREVIEW_WIDTH = 1280
    private val MAX_PREVIEW_HEIGHT = 720

    private lateinit var cameraViewModel: CameraViewModel
    private lateinit var textureView: TextureView
    private lateinit var cameraDevice: CameraDevice
    private lateinit var cameraId: String
    private lateinit var imageDimension: Size
    private lateinit var backgroundHandler: Handler
    private lateinit var handlerThread: HandlerThread
    private lateinit var imageView: ImageView
    private lateinit var textView: TextView
    private var imageReader: ImageReader? = null
    private var hex : String = ""


    private lateinit var captureRequestBuilder: CaptureRequest.Builder
    private lateinit var captureSession: CameraCaptureSession

    private lateinit var file: File

    @RequiresApi(Build.VERSION_CODES.Q)
    private val onImageAvailableListener = ImageReader.OnImageAvailableListener {
            val image: Image? = it.acquireLatestImage()
            if(image != null) {
                val buffer: ByteBuffer = image.planes[0].buffer
                var bytes = ByteArray(buffer.capacity())
                buffer[bytes]
                val bitmapImage = BitmapFactory.decodeByteArray(bytes, 0, bytes.size, null)
                image.close()
                val avgColor = avgColorInRadius(
                        bitmapImage,
                        bitmapImage.width / 2,
                        bitmapImage.height / 2,
                        20
                )
                bitmapImage.recycle()
                buffer.clear()

                activity?.runOnUiThread(Runnable {
                    Log.d(TAG, "Middle pixel is $avgColor")
                    hex = java.lang.String.format("#%02x%02x%02x", avgColor[0], avgColor[1], avgColor[2])
                    textView.setText(hex)
                })
                imageView.setColorFilter(Color.rgb(avgColor[0], avgColor[1], avgColor[2]))
            }
    }

    @RequiresApi(Build.VERSION_CODES.Q)
    fun avgColorInRadius(data: Bitmap, x: Int, y: Int, r: Int): List<Int> {
        val PI = 3.1415926535;
        var totalR = 0f
        var totalG = 0f
        var totalB = 0f

        val pixelCoordinates: MutableList<List<Int>> = emptyList<List<Int>>().toMutableList()

        for(i in 0..360 step 1)
        {
            val angle = i.toDouble();
            val x1 = (r * cos(angle * PI / 180)).toInt();
            val y1 = (r * sin(angle * PI / 180)).toInt();
            if(!pixelCoordinates.contains(listOf(x + x1, y + y1))){
                pixelCoordinates.add(listOf(x + x1, y + y1))
                val pixel = data.getColor(x + x1, y + y1);
                totalR += (pixel.red() * 255)
                totalG += (pixel.green() * 255)
                totalB += (pixel.blue() * 255)
            }
        }
        return listOf((totalR / pixelCoordinates.size).toInt(), (totalG / pixelCoordinates.size).toInt(), (totalB / pixelCoordinates.size).toInt())
    }

    private val surfaceTextureListener = object : TextureView.SurfaceTextureListener {
        @RequiresApi(Build.VERSION_CODES.Q)
        override fun onSurfaceTextureAvailable(surface: SurfaceTexture, width: Int, height: Int) {
            openCamera(width, height)
        }

        override fun onSurfaceTextureSizeChanged(surface: SurfaceTexture, width: Int, height: Int) = Unit

        override fun onSurfaceTextureDestroyed(surface: SurfaceTexture) = true

        override fun onSurfaceTextureUpdated(surface: SurfaceTexture) = Unit

    }

    private val stateCallback = @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
    object : CameraDevice.StateCallback() {
        @RequiresApi(Build.VERSION_CODES.P)
        override fun onOpened(camera: CameraDevice) {
            cameraDevice = camera
            startCameraPreview()
        }

        override fun onDisconnected(camera: CameraDevice) {
            Log.d(TAG, "Camera device disconnected")
            camera?.close()
        }

        override fun onError(camera: CameraDevice, error: Int) {
            Log.d(TAG, "Camera device error")
            activity?.finish()
        }

    }


    @RequiresApi(Build.VERSION_CODES.P)
    fun startCameraPreview(){

        textureView.surfaceTexture?.setDefaultBufferSize(MAX_PREVIEW_WIDTH, MAX_PREVIEW_HEIGHT)
        val surface = Surface(textureView.surfaceTexture)
        captureRequestBuilder = cameraDevice.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW)
        captureRequestBuilder.addTarget(surface)
        captureRequestBuilder.addTarget(imageReader!!.surface)
        cameraDevice.createCaptureSession(
                listOf(surface, imageReader?.surface),
                object : CameraCaptureSession.StateCallback() {
                    override fun onConfigured(session: CameraCaptureSession) {
                        if (session != null) captureSession = session
                        captureRequestBuilder.set(
                                CaptureRequest.CONTROL_AF_MODE,
                                CaptureRequest.CONTROL_AF_MODE_CONTINUOUS_PICTURE
                        )
                        captureSession.setRepeatingRequest(
                                captureRequestBuilder.build(),
                                null,
                                backgroundHandler
                        )
                    }

                    override fun onConfigureFailed(session: CameraCaptureSession) = Unit

                },
                null
        )
    }

    @RequiresApi(Build.VERSION_CODES.Q)
    fun openCamera(width: Int, height: Int){

        val permission = activity?.let { ContextCompat.checkSelfPermission(
                it,
                Manifest.permission.CAMERA
        ) }
        if (permission != PackageManager.PERMISSION_GRANTED) {
            activity?.let { ActivityCompat.requestPermissions(
                    it,
                    Array<String>(1) { Manifest.permission.CAMERA },
                    1
            ) };
            return
        }

        val manager = activity?.getSystemService(Context.CAMERA_SERVICE) as CameraManager
        cameraId = manager.cameraIdList[0]

        val cc: CameraCharacteristics = manager.getCameraCharacteristics(cameraId)
        val map: StreamConfigurationMap? = cc.get(CameraCharacteristics.SCALER_STREAM_CONFIGURATION_MAP)
        val imageDimension = map?.getOutputSizes(ImageFormat.JPEG)
        manager.openCamera(cameraId, stateCallback, null)
        val largest = Collections.max(
                Arrays.asList(*map?.getOutputSizes(ImageFormat.JPEG)),
                CompareSizesByArea()
        )
        imageReader = ImageReader.newInstance(
                largest.width, largest.height,
                ImageFormat.JPEG, /*maxImages*/ 2
        ).apply {
            setOnImageAvailableListener(onImageAvailableListener, backgroundHandler)
        }
    }

    @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
    fun closeCamera(){
            captureSession.close()
            cameraDevice.close()
            imageReader?.close();
            imageReader = null;
    }

    fun startBackgroundThread(){
        handlerThread = HandlerThread("Camera Background").also { it.start() }
        backgroundHandler = Handler(handlerThread?.looper)
    }

    @RequiresApi(Build.VERSION_CODES.JELLY_BEAN_MR2)
    fun stopBackgroundThread(){
        handlerThread.quitSafely()
        handlerThread.join()
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        file = File(activity?.getExternalFilesDir(null), "asd")
    }

    @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
    override fun onPause() {
        closeCamera()
        stopBackgroundThread()
        super.onPause()
    }

    @RequiresApi(Build.VERSION_CODES.Q)
    override fun onResume() {
        super.onResume()
        startBackgroundThread()
        if(!textureView.isAvailable)
            textureView.surfaceTextureListener = surfaceTextureListener
        else
            openCamera(MAX_PREVIEW_WIDTH, MAX_PREVIEW_HEIGHT)
    }


    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {

        cameraViewModel =
            ViewModelProvider(this).get(CameraViewModel::class.java)

        val root = inflater.inflate(R.layout.fragment_camera, container, false)

        textureView = root.findViewById(R.id.camera)

        imageView = root.findViewById(R.id.crosshair)
        textView = root.findViewById(R.id.previewHex)
        val crosshair : ImageView = root.findViewById(R.id.crosshair)
        val crosshair2 : ImageView = root.findViewById(R.id.crosshair2)
        val share : ImageButton = root.findViewById(R.id.share)
        val colorName : TextView = root.findViewById(R.id.colorName)


        val headerView = inflater.inflate(R.layout.color_row, container, false)
        val lv: ListView = root.findViewById(R.id.colorList)
        lv.addHeaderView(headerView, null, false)

        var adapter: ColorSchemeAdapter

        cameraViewModel.colorsScheme.observe(viewLifecycleOwner, Observer{
            adapter = ColorSchemeAdapter(this.requireContext(), it)
            lv.adapter = adapter
        })

//        crosshair2.setOnClickListener(object : View.OnClickListener {
//            @RequiresApi(Build.VERSION_CODES.Q)
//            override fun onClick(v: View?) {
//                if(hex !="") {
//                    if (v != null) {
//                        onResume()
//                    }
//                }
//            }
//        })



        crosshair.setOnClickListener(object : View.OnClickListener {
            @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
            override fun onClick(v: View?) {
                if(hex !="") {
                    if (v != null) {
                        Log.e(TAG, "begins ${hex}")
                        colorName.text = hex
                        cameraViewModel.loadColorScheme(hex)
                        //onPause()

                    }
                }
            }
        })

        share.setOnClickListener(object: View.OnClickListener{
            override fun onClick(v: View?) {
                if(hex !="") {
                    if (v != null) {
                        val shareColor = ShareService()
                        shareColor.shareColor(v, hex)
                    }
                }
            }
        })

        return root
    }
}