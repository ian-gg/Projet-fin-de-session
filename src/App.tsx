import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PatientList, PatientDetails, HistoryList, GestionSummary } from '~views';
import { DbManager } from '~db';
import { Text } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDb = async () => {
      await DbManager.db();
      setLoading(false);
    };

    initDb();
  });

  if (loading) {
    return (
      <Text>Chargement...</Text>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Accueil">
        <Drawer.Screen name="Accueil" component={AccueilNavigator} />
        <Drawer.Screen name="Patients" component={PatientNavigator} options={{ headerShown: true }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const AccueilNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="GestionSummary">
      <Stack.Screen name="GestionSummary" component={GestionSummary} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const PatientNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PatientList">
      <Stack.Screen name="PatientList" component={PatientList} options={{ headerShown: false }} />
      <Stack.Screen
        name="PatientDetails"
        component={PatientDetails}
        options={{ headerShown: true, title: "Informations du patient" }}
      />
      <Stack.Screen
        name="HistoryList"
        component={HistoryList}
        options={{ headerShown: true, title: "Historique du patient" }}
      />
    </Stack.Navigator>
  );
};

export default App;
