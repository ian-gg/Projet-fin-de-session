import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {PatientList, PatientDetails, GestionSummary} from '~views';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Accueil">
        <Drawer.Screen name="Accueil" component={AccueilNavigator} />
        <Drawer.Screen name="Patients" component={PatientNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const AccueilNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="GestionSummary">
      <Stack.Screen name="GestionSummary" component={GestionSummary} options={{ headerShown: false}} />
    </Stack.Navigator>
  );
};
const PatientNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PatientList">
      <Stack.Screen name="PatientList" component={PatientList} options={{ headerShown: false}} />
      <Stack.Screen name="PatientDetails" component={PatientDetails} options={{ headerShown: false, title: "Informations du patient" }} />
    </Stack.Navigator>
  );
};

export default App;
