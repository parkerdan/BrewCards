package com.brewcards;

import com.facebook.react.ReactActivity;
import com.parkerdan.splashscreen.SplashScreen;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.ReactInstanceManager;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "BrewCards";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);
      super.onCreate(savedInstanceState);
   }
}
