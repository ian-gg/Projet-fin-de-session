package com.example.colorpickr.ui.setting

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.colorpickr.dataclass.Color
import com.example.colorpickr.dataclass.ColorScheme
import com.example.colorpickr.services.ColorServices

class SettingViewModel: ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "This is home"
    }
    val text: LiveData<String> = _text

    // test api
    var services = ColorServices()
    init {
        services.getColor("323054", ::setColor)
        services.getColorScheme("323054", "analogic-complement", ::setColorScheme)
    }

    fun setColor(colorResponse: Color){
        Log.d("TEST COLOR", colorResponse.toString())
    }

    fun setColorScheme(colorResponse: ColorScheme) {
        Log.d("TEST COLOR SCHEME", colorResponse.toString())
    }
}