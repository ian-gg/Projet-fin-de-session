import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Accueil from '~views/Accueil';
import PatientList from '~views/PatientList';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Accueil">
        <Drawer.Screen name="Accueil" component={Accueil} />
        <Drawer.Screen name="Patients" component={PatientList} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
