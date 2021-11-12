import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PatientList, PatientDetails, GestionSummary } from '~views';

const Stack = createNativeStackNavigator();

const Accueil = () => {
  return (
    <Stack.Navigator initialRouteName="GestionSummary">
      <Stack.Screen name="GestionSummary" component={GestionSummary} options={{ headerShown: false }} />
      <Stack.Screen name="PatientList" component={PatientList} />
      <Stack.Screen name="PatientDetails" component={PatientDetails} />
    </Stack.Navigator>
  );
};

export default Accueil;
