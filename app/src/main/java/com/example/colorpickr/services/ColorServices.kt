package com.example.colorpickr.services

import android.content.ContentValues
import android.util.Log
import com.example.colorpickr.dataclass.Color
import com.example.colorpickr.dataclass.ColorScheme
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import okhttp3.*
import java.io.IOException
import java.util.concurrent.TimeUnit

const val BASE_URL_ID = "https://www.thecolorapi.com/id"
const val BASE_URL_COMPLEMENTS = "https://www.thecolorapi.com/scheme"

class ColorServices {

    fun getColor(color: String, callback: (Color)->Unit) {

        val client = OkHttpClient.Builder()
                .connectTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .build()
        val url = HttpUrl.Builder()
                .scheme("http")
                .host("thecolorapi.com")
                .addPathSegment("id")
                .addQueryParameter("hex", color)
                .build().toUrl()

        val request = Request.Builder()
            .url(url)
            .build()

        client.newCall(request).enqueue(object: Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("Failed", e.toString())
            }

            override fun onResponse(call: Call, response: Response) {
                val listType = object : TypeToken<Color?>() {}.type
                val body = response.body?.string()
                callback(Gson().fromJson(body, listType) as Color)
            }

        })
    }

    fun getColorScheme(color: String, scheme: String, callback: (ColorScheme)->Unit){

        val client = OkHttpClient.Builder()
                .connectTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .build()
        val url = HttpUrl.Builder()
            .scheme("http")
            .host("thecolorapi.com")
            .addPathSegment("scheme")
            .addQueryParameter("hex", color)
            .addQueryParameter("mode", scheme)
            .addQueryParameter("count", "5")
            .build().toUrl()

        val request = Request.Builder()
            .url(url)
            .build()

        client.newCall(request).enqueue(object: Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("Failed", e.toString())
            }

            override fun onResponse(call: Call, response: Response) {
                val listType = object : TypeToken<ColorScheme?>() {}.type
                val body = response.body?.string()
                callback(Gson().fromJson(body, listType) as ColorScheme)
                Log.e(ContentValues.TAG, "call done")
            }

        })
    }
}