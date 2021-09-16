package com.example.colorpickr

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.viewpager.widget.ViewPager
import com.example.colorpickr.adapters.TutorialPageAdapter
import com.example.colorpickr.dataclass.TutorialScreenItem

class TutorialActivity : AppCompatActivity() {

    /* Variables */
    private lateinit var tutorialViewPager : ViewPager
    private lateinit var tutorialPageAdapter : TutorialPageAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // TODO : UNCOMMENT HERE TO HAVE TUTORIAL SHOWING
        updateTutorialHasBeenCompleted(0)

        // Vérifie si le tutoriel déjà fini
        if(checkTutorialHasAlreadyBeenCompleted()) {
            launchMainActivity()
            return
        }

        setContentView(R.layout.activity_tutorial)

        var listTutorial : MutableList<TutorialScreenItem> = mutableListOf<TutorialScreenItem>()
        // TODO : ADD TUTORIAL UPDATE TXT
        listTutorial.add(TutorialScreenItem(getString(R.string.tutorial_step1), 1, "", R.drawable.ic_camera_alt_24dp))
        listTutorial.add(TutorialScreenItem(getString(R.string.tutorial_step2), 2, "", R.drawable.ic_camera_alt_24dp))
        listTutorial.add(TutorialScreenItem(getString(R.string.tutorial_step3), 3, "", R.drawable.ic_camera_alt_24dp))

        // Init viewpager sur la première étape du tutoriel en ne montrant pas les images
        tutorialViewPager = findViewById(R.id.tutorial_viewpager)
        tutorialPageAdapter = TutorialPageAdapter(this, listTutorial, false)
        tutorialViewPager.adapter = tutorialPageAdapter
        tutorialViewPager.currentItem = 0

        // Ajout un écouteur lorsqu'on est sur une page du viewpager
        tutorialViewPager.addOnPageChangeListener(object : ViewPager.OnPageChangeListener {
            override fun onPageSelected(position: Int) {

                val size = tutorialPageAdapter.count - 1
                val lastTutorialItem = size.equals(position)
                val btn = findViewById(R.id.tutorial_endbtn) as Button
                val step = findViewById(R.id.tutorial_tip) as TextView


                // N'est pas le dernier element du tutoriel, alors cache le button
                if (!lastTutorialItem) {
                    btn.visibility = View.INVISIBLE
                    btn.isEnabled = false
                    step.setText(R.string.tutorial_tip)
                }
                // sinon l'affiche le dernier element avec le button pour sortir
                else if (lastTutorialItem) {
                    btn.isEnabled = true
                    btn.visibility = View.VISIBLE
                    step.setText(R.string.tutorial_tip_end)
                }
            }

            override fun onPageScrollStateChanged(state: Int) {}
            override fun onPageScrolled(position: Int, positionOffset: Float, positionOffsetPixels: Int) {}
        })

        // Ajout l'exécution de sendMesssage() lorsqu'on click sur le bouton
        val btnQuitTutorial = findViewById(R.id.tutorial_endbtn) as Button
        btnQuitTutorial.text = getString(R.string.tutorial_endbtntxt)
        btnQuitTutorial.setOnClickListener(View.OnClickListener {
            launchMainActivity()

            // Save tutorial as been completed
            updateTutorialHasBeenCompleted(1)
        })

    }

    // Appeler lorsqu'on clique le bouton de fin du tutoriel
    private fun launchMainActivity() {
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        finish()
    }

    // Ref : https://developer.android.com/training/data-storage/shared-preferences
    private fun checkTutorialHasAlreadyBeenCompleted() : Boolean {
        val sharedPrefs = getPreferences(Context.MODE_PRIVATE)
        val tutorialHasBeenCompleted = sharedPrefs.getInt(getString(R.string.tutorial_hasbeencompleted), 0)
        return (tutorialHasBeenCompleted == 1)
    }

    private fun updateTutorialHasBeenCompleted(newValue : Int) {
        val sharedPref = getPreferences(Context.MODE_PRIVATE) ?: return
        with (sharedPref.edit()) {
            putInt(getString(R.string.tutorial_hasbeencompleted), newValue)
            apply()
        }
    }


}