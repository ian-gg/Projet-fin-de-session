package com.example.colorpickr

import org.junit.Test

import org.junit.Assert.*
import kotlin.math.pow

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
class ExampleUnitTest {
    @Test
    fun pickTextColor_isCorrect() {

        // Ref : https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
        fun pickTextColorBasedOnBgColorAdvanced(bgColor:String) : String {
            var color = if(bgColor.startsWith('#')) bgColor.substring(1,7) else bgColor
            var r = Integer.parseInt(color.substring(0, 2), 16) // hexToR
            var g = Integer.parseInt(color.substring(2, 4), 16) // hexToG
            var b = Integer.parseInt(color.substring(4, 6), 16) // hexToB
            var uicolors = arrayOf(r / 255, g / 255, b / 255)
            var c = uicolors.map {
                if (it <= 0.03928)
                    it / 12.92
                else
                    ((it + 0.055) / 1.055).pow(2.4)
            }
            var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2])
            return if(L > 0.179) "#FF000000" else "#FFFFFFFF"
        }

        val v1 = pickTextColorBasedOnBgColorAdvanced("#00ffa6")
        val v2 = pickTextColorBasedOnBgColorAdvanced("#000000")
        assertEquals("#FF000000", v1)
        assertEquals("#FFFFFFFF", v2)
    }


}