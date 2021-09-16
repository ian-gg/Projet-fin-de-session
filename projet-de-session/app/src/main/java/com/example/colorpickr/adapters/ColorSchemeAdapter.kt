 package com.example.colorpickr.adapters

import android.content.ContentValues
import android.content.Context
import android.content.Context.LAYOUT_INFLATER_SERVICE
import android.graphics.Color
import android.util.Log
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import android.widget.LinearLayout
import androidx.core.content.ContextCompat.getSystemService
import com.example.colorpickr.R
import com.example.colorpickr.dataclass.ColorScheme
import java.lang.Integer.parseInt
import java.lang.Long.parseLong
import kotlin.math.pow


 class ColorSchemeAdapter(private val context: Context, private val colors: List<ColorScheme>): BaseAdapter(){

    private val inflater: LayoutInflater
            = context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater

    override fun getCount(): Int {
        return colors.size
    }

    override fun getItem(position: Int): Any {
        return colors[position]
    }

    override fun getItemId(position: Int): Long {
        //Log.e(ContentValues.TAG, "position: $position")
        val range = colors[position].colors.size
        val hexString = colors[position].colors[position].hex.value.subSequence(1, range + 2).toString()
        //Log.e(ContentValues.TAG, "valueCut : $hexString")
        return parseLong(hexString, 16)
    }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {

        val rowView = inflater.inflate(R.layout.color_row, parent, false)
        val name = rowView.findViewById(R.id.nameColor) as TextView
        val colorScheme1 = rowView.findViewById(R.id.colorScheme1) as ImageView
        val colorScheme2 = rowView.findViewById(R.id.colorScheme2) as ImageView
        val colorScheme3 = rowView.findViewById(R.id.colorScheme3) as ImageView
        val colorScheme4 = rowView.findViewById(R.id.colorScheme4) as ImageView
        val colorScheme5 = rowView.findViewById(R.id.colorScheme5) as ImageView

        name.text = colors[position].mode
        colorScheme1.setBackgroundColor(Color.parseColor(colors[position].colors[0].hex.value))
        colorScheme2.setBackgroundColor(Color.parseColor(colors[position].colors[1].hex.value))
        colorScheme3.setBackgroundColor(Color.parseColor(colors[position].colors[2].hex.value))
        colorScheme4.setBackgroundColor(Color.parseColor(colors[position].colors[3].hex.value))
        colorScheme5.setBackgroundColor(Color.parseColor(colors[position].colors[4].hex.value))

        colorScheme1.setOnClickListener(object : View.OnClickListener {
            override fun onClick(v: View?) {
                if (v != null) {
                    val color = colors[position].colors[0].hex.value
                    val name = colors[position].colors[0].name.value
                    showPopupWindowClick(v, color, name)
                }
            }
        })

        colorScheme2.setOnClickListener(object : View.OnClickListener {
            override fun onClick(v: View?) {
                if (v != null) {
                    //Log.e(ContentValues.TAG, "click on first, name ${colors[position].colors[0].name} and value ${colors[position].colors[0].hex}")
                    val color = colors[position].colors[1].hex.value
                    val name = colors[position].colors[1].name.value
                    showPopupWindowClick(v, color, name)
                }
            }
        })

        colorScheme3.setOnClickListener(object : View.OnClickListener {
            override fun onClick(v: View?) {
                if (v != null) {
                    //Log.e(ContentValues.TAG, "click on first, name ${colors[position].colors[0].name} and value ${colors[position].colors[0].hex}")
                    val color = colors[position].colors[2].hex.value
                    val name = colors[position].colors[2].name.value

                    showPopupWindowClick(v, color, name)
                }
            }
        })

        colorScheme4.setOnClickListener(object : View.OnClickListener {
            override fun onClick(v: View?) {
                if (v != null) {
                    //Log.e(ContentValues.TAG, "click on first, name ${colors[position].colors[0].name} and value ${colors[position].colors[0].hex}")
                    val color = colors[position].colors[3].hex.value
                    val name = colors[position].colors[3].name.value
                    showPopupWindowClick(v, color, name)
                }
            }
        })

        colorScheme5.setOnClickListener(object : View.OnClickListener {
            override fun onClick(v: View?) {
                if (v != null) {
                    //Log.e(ContentValues.TAG, "click on first, name ${colors[position].colors[0].name} and value ${colors[position].colors[0].hex}")
                    val color = colors[position].colors[4].hex.value
                    val name = colors[position].colors[4].name.value
                    showPopupWindowClick(v, color, name)
                }
            }
        })

        return rowView
    }


     fun showPopupWindowClick(v: View?, color: String, name: String) {

         // inflate the layout of the popup window
         val popupView: View = inflater.inflate(R.layout.activity_pop_up_window, null)
         val text = popupView.findViewById<TextView>(R.id.text)

         text.text = "Color name : $name and Hex value : $color"

         // change background color and text color
         text.setTextColor(Color.parseColor(pickTextColorBasedOnBgColorAdvanced(color)))
         popupView.setBackgroundColor(Color.parseColor(color))

         // create the popup window
         val width = LinearLayout.LayoutParams.WRAP_CONTENT
         val height = LinearLayout.LayoutParams.WRAP_CONTENT
         val focusable = true // lets taps outside the popup also dismiss it

         val popupWindow = PopupWindow(popupView, width, height, focusable)

         // show the popup window
         // which view you pass in doesn't matter, it is only used for the window tolken
         popupWindow.showAtLocation(v, Gravity.CENTER, 0, 0)

         // dismiss the popup window when touched
         popupView.setOnTouchListener { v, event ->
             popupWindow.dismiss()
             true
         }
     }

     // Ref : https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
     fun pickTextColorBasedOnBgColorAdvanced(bgColor:String) : String {
        var color = if(bgColor.startsWith('#')) bgColor.substring(1,7) else bgColor
        var r = parseInt(color.substring(0, 2), 16) // hexToR
        var g = parseInt(color.substring(2, 4), 16) // hexToG
        var b = parseInt(color.substring(4, 6), 16) // hexToB
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

}