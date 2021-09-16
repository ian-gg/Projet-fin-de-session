package com.example.colorpickr.ui.colorslider

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ListView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.colorpickr.R
import com.example.colorpickr.adapters.ColorSchemeAdapter

class ColorSliderFragment : Fragment() {

    private lateinit var colorSliderViewModel: ColorSliderViewModel

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {

        colorSliderViewModel = activity?.run {
            ViewModelProvider(this).get(ColorSliderViewModel::class.java)
        } ?: throw Exception("Invalid Activity")

        val root = inflater.inflate(R.layout.fragment_colorslider, container, false)

        val headerView = inflater.inflate(R.layout.color_row, container, false)
        val lv: ListView = root.findViewById(R.id.colorList)
        lv.addHeaderView(headerView, null, false)

        var adapter: ColorSchemeAdapter

        colorSliderViewModel.colors.observe(viewLifecycleOwner, Observer {
            adapter = ColorSchemeAdapter(this.requireContext(), it)
            lv.adapter = adapter
        })
        return root
    }
}