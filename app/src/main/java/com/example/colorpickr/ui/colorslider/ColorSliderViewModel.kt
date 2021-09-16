package com.example.colorpickr.ui.colorslider

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.colorpickr.dataclass.ColorScheme
import com.example.colorpickr.services.ColorServices

class ColorSliderViewModel : ViewModel() {

    val colors = MutableLiveData<List<ColorScheme>>()
    private val  tempList = mutableListOf<ColorScheme>()
    lateinit var colorSchemeServices: ColorServices

    init {
        colors.postValue(emptyList())
    }

    fun setColorScheme(response: MutableList<ColorScheme>){
        colors.postValue(response)
    }

    private fun createList(response: ColorScheme){
        tempList.add(response)

        if(tempList.size == 4 ){
            setColorScheme(tempList)
        }
    }

    fun loadColorScheme(color: String){
        colorSchemeServices.getColorScheme(color, "analogic-complement", ::createList)
        colorSchemeServices.getColorScheme(color, "complement", ::createList)
        colorSchemeServices.getColorScheme(color, "triad", ::createList)
        colorSchemeServices.getColorScheme(color, "quad", ::createList)
    }
}