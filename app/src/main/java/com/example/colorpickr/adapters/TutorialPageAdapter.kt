package com.example.colorpickr.adapters

import android.app.Activity
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.View.INVISIBLE
import android.view.View.VISIBLE
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.viewpager.widget.PagerAdapter
import androidx.viewpager.widget.ViewPager.SimpleOnPageChangeListener
import com.example.colorpickr.R
import com.example.colorpickr.dataclass.TutorialScreenItem


class TutorialPageAdapter(private val context: Context, private val tutorialItems: List<TutorialScreenItem>, private val showTutorialImages:Boolean) : PagerAdapter() {

    private val inflater : LayoutInflater = context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater

    override fun instantiateItem(container: ViewGroup, position: Int): Any {

        val tutorialItemView = inflater.inflate(R.layout.layout_tutorial, null)
        val title = tutorialItemView.findViewById(R.id.tutorial_title) as TextView
        val description = tutorialItemView.findViewById(R.id.tutorial_description) as TextView
        val image = tutorialItemView.findViewById(R.id.tutorial_img) as ImageView
        val step = tutorialItemView.findViewById(R.id.tutorial_titlestep) as TextView

        /* Update UI*/
        title.text = tutorialItems[position].title
        step.text = "Étape " + tutorialItems[position].step.toString()
        description.text = tutorialItems[position].description

        // Image to be shown or not
        if(showTutorialImages)
            image.setBackgroundResource(tutorialItems[position].imageID)

        container.addView(tutorialItemView)
        return tutorialItemView
    }

    override fun getCount(): Int {
        return tutorialItems.size
    }

    override fun destroyItem(container: ViewGroup, position: Int, `object`: Any) {
        container.removeView(`object` as View)
    }

    override fun isViewFromObject(view: View, `object`: Any): Boolean {

        return view == `object`
    }


}