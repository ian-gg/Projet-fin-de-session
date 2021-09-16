package com.example.colorpickr.sensoreventlistener

import android.content.ContentValues.TAG
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.nfc.Tag
import android.util.Log
import android.view.View
import com.example.colorpickr.adapters.ColorSchemeAdapter
import com.example.colorpickr.dataclass.ColorScheme
import com.example.colorpickr.services.ColorServices
import com.example.colorpickr.dataclass.Color
import java.util.*
import javax.inject.Inject
import kotlin.math.sqrt


class ShakeDetector : SensorEventListener {

    // REF : https://stackoverflow.com/questions/5271448/how-to-detect-shake-event-with-android
    /* Variables */

    private var listener : OnShakeListener? = null
    private var shakeTimestamp : Long = 0
    private var shakeCount : Int = 0
    private var colorSchemeServices =  ColorServices()
    private var currentColor : Color? = null
    private var hasDoneShaking = false

    // Méthode qui utiliser ColorAPI pour avoir une couleur
    // Ref : https://www.codespeedy.com/generate-random-hex-color-code-in-java/
    fun getColor() {

        // Obtenir une couleur au hasard
        val rnd = Random()
        val rand_num: Int = rnd.nextInt(0xffffff + 1)

        // Convertit l'entier représentant la couleur en hex sans le '#'
        val colorCode = String.format("%06x", rand_num)
        colorSchemeServices.getColor(colorCode, ::toConsultColor)
    }

    private fun toConsultColor(colorResponse: Color) {
        Log.d("SHAKE TEST COLOR", colorResponse.toString())
        currentColor = colorResponse
        hasDoneShaking = false
    }

    fun getCurrentC(): Color? {
        return currentColor
    }

    fun setOnShakeListener(listener: OnShakeListener?) {
        this.listener = listener
    }

    interface OnShakeListener {
        fun onShake(count: Int)
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        // ignore
    }

    override fun onSensorChanged(event: SensorEvent) {

        if (listener != null && !hasDoneShaking) {

            val x = event.values[0]
            val y = event.values[1]
            val z = event.values[2]
            val gX = x / SensorManager.GRAVITY_EARTH
            val gY = y / SensorManager.GRAVITY_EARTH
            val gZ = z / SensorManager.GRAVITY_EARTH

            // la froce gravitationnelle va être proche de 1 si aucun mouvement
            val gForce: Float = sqrt(gX * gX + gY * gY + gZ * gZ)

            if (gForce > SHAKE_THRESHOLD_GRAVITY) {

                val now = System.currentTimeMillis()

                // Ignore les evenements de secouage qui sont trop rapidement entre chacun d'eux (500ms)
                if (shakeTimestamp + SHAKE_SLOP_TIME_MS > now) {
                    return
                }

                // Réinitialise le compteur de secouage après 3 secondes sans secouage
                if (shakeTimestamp + SHAKE_COUNT_RESET_TIME_MS < now) {
                    shakeCount = 0
                }

                shakeTimestamp = now
                shakeCount++

                if (shakeCount == SHAKE_COUNT_MAX) {
                    listener!!.onShake(shakeCount)
                    shakeCount = 0
                    hasDoneShaking = true
                }

            }
        }
    }

    companion object {

        /*
         * La force gravitationnelle qui est necessaire pour enregistrer un secouement.
         * Doit être supérieur à 1G (un unité de gravité terrestre)
         * On peut installer l'application "G-Force", par Blake La Pierre
         * sur Google Play Store pour connaître le nb de G qu'on
         * veut pour reconnaître un
         * secouement dans notre application.
         */
        private val SHAKE_COUNT_MAX = 3
        private val SHAKE_THRESHOLD_GRAVITY = 2.7f
        private val SHAKE_SLOP_TIME_MS = 500
        private val SHAKE_COUNT_RESET_TIME_MS = 3000

    }

}