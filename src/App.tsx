import React, { useEffect, useState } from 'react';

import { Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  PatientList,
  PatientDetails,
  GestionSummary,
  GestionDossier,
  CentreDeSanteList,
  CentreDeSanteDetails
} from '~views';
import { DbManager } from '~db';
import { Text } from 'react-native';

import { DrawerParamList } from '~models/types';

const Drawer = createDrawerNavigator<DrawerParamList>();
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
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Accueil">
          <Drawer.Screen name="Accueil" component={AccueilNavigator} />
          <Drawer.Screen name="Patients" component={PatientNavigator} options={{ headerShown: true }}/>
          <Drawer.Screen name="Dossier" component={GestionDossierNavigator}/>
          <Drawer.Screen name="Centres" component={CentreDeSanteNavigator}/>
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
    </Stack.Navigator>
  );
};

const GestionDossierNavigator = () => {
  return(
    <Stack.Navigator initialRouteName="GestionDossier">
      <Stack.Screen name="GestionDossier" component={GestionDossier} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const CentreDeSanteNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CentreDeSanteList">
      <Stack.Screen name="CentreDeSanteList" component={CentreDeSanteList} options={{ headerShown: false }} />
      <Stack.Screen
        name="CentreDeSanteDetails"
        component={CentreDeSanteDetails}
        options={{ headerShown: true, title: "Informations du centre" }}
      />
      <Stack.Screen
        name="PatientDetails"
        component={PatientDetails}
        options={{ headerShown: true, title: "Informations du patient" }}
      />
    </Stack.Navigator>
  );
};

export default App;
