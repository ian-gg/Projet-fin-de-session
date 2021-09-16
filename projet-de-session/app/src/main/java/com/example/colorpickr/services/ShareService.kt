package com.example.colorpickr.services

import android.content.ContentValues
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.colorpickr.R

class ShareService: AppCompatActivity(){

    private var color: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.fragment_camera)
    }

    fun shareColor(view: View, hex: String) {
        // trouver les hex des couleurs
        color = hex

        //Log.e(ContentValues.TAG, "color $hex")

        val intent : Intent = Intent().apply {
            action = Intent.ACTION_SEND
            putExtra(Intent.EXTRA_TEXT, color)
            type = "text/plain"
        }
        //Log.e(ContentValues.TAG, "intent :$intent")

        val shareIntent: Intent = Intent.createChooser(intent, "Share color")
        //Log.e(ContentValues.TAG, "share intent :$shareIntent")

        view.context.startActivity(shareIntent)
    }
}