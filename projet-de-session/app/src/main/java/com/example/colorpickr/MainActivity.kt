package com.example.colorpickr

import android.content.ContentValues.TAG
import android.hardware.Sensor
import android.hardware.SensorManager
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.example.colorpickr.adapters.ColorSchemeAdapter
import com.example.colorpickr.dataclass.Color
import com.example.colorpickr.dataclass.ColorScheme
import com.example.colorpickr.sensoreventlistener.ShakeDetector
import com.google.android.material.bottomnavigation.BottomNavigationView


class MainActivity : AppCompatActivity() {

    /* Variables pour ShakeService */
    private var sensorManager : SensorManager? = null
    private var shakeDetector : ShakeDetector? = null
    private var accelerometer : Sensor? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val navView: BottomNavigationView = findViewById(R.id.nav_view)

        val navController = findNavController(R.id.nav_host_fragment)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        val appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.navigation_setting, R.id.navigation_camera, R.id.navigation_colorslider
            )
        )
        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)

        /* Création de la détection du shake */
        initSensor()
    }

    private fun initSensor() {

        sensorManager = getSystemService(SENSOR_SERVICE) as SensorManager
        accelerometer = sensorManager!!.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        shakeDetector = ShakeDetector()
        shakeDetector!!.setOnShakeListener(object : ShakeDetector.OnShakeListener {

            // obtient couleur random en secouant l'appareil
            override fun onShake(count: Int) {

                val v = window.decorView

                // appel l'api
                shakeDetector!!.getColor()

                val color : Color? = shakeDetector!!.getCurrentC()
                val list : List<ColorScheme> = emptyList()
                val colorSchemeAdapter : ColorSchemeAdapter? = v?.context?.let { ColorSchemeAdapter(it, list) }

                if (color != null)
                    colorSchemeAdapter?.showPopupWindowClick(v, color.hex.value, color.name.value)
            }

        })
    }


    /* https://stackoverflow.com/questions/5271448/how-to-detect-shake-event-with-android
    * Économise la batterie en arrêtant l'écoute
    * du sensor lorsque l'app n'est plus visible
    */
    override fun onResume() {

        super.onResume()
        // Lancement de l'écoute du sensor
        sensorManager!!.registerListener(shakeDetector, accelerometer, SensorManager.SENSOR_DELAY_UI)

    }

    override fun onPause() {

        super.onPause()
        // Arrête l'écoute du sensor
        sensorManager!!.unregisterListener(shakeDetector)
    }

}