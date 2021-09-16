package com.example.colorpickr.ui.camera

import android.content.ContentValues.TAG
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.colorpickr.dataclass.Color
import com.example.colorpickr.dataclass.ColorScheme
import com.example.colorpickr.services.ColorServices

class CameraViewModel : ViewModel() {

    val colorsScheme = MutableLiveData<List<ColorScheme>>()
    private val  tempList = mutableListOf<ColorScheme>()
    private var colorSchemeServices =  ColorServices()

    init {
        colorsScheme.postValue(emptyList())
    }

    fun setColorScheme(response: MutableList<ColorScheme>){
        colorsScheme.postValue(response)
    }

    private fun createList(response: ColorScheme){
        tempList.add(response)

        if(tempList.size == 4 ){
            setColorScheme(tempList)
        }
    }

    fun loadColorScheme(color: String){
        clearData()
        if(color != "") {
            colorSchemeServices.getColorScheme(color, "analogic-complement", ::createList)
            colorSchemeServices.getColorScheme(color, "complement", ::createList)
            colorSchemeServices.getColorScheme(color, "triad", ::createList)
            colorSchemeServices.getColorScheme(color, "quad", ::createList)
        }
    }

    fun clearData(){
        colorsScheme.postValue(emptyList())
        tempList.removeAll(tempList)
    }
}