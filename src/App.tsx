import React, { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  ActivityIndicator,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  Text,
} from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  PatientList,
  PatientDetails,
  GestionSummary,
  GestionDossier,
  CentreDeSanteList,
  CentreDeSanteDetails,
  DiagnosticList,
  ProcedureList,
  CameraHome,
  PermissionsManager,
} from '~views';
import { DbManager } from '~db';

import { DrawerParamList } from '~models/types';

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createNativeStackNavigator();

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

const App = () => {
  const isDarkMode = false; //useColorScheme() === 'dark';
  const theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

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
      <View style={[
        styles.container,
        styles.horizontal,
        { backgroundColor: theme.colors.background }
      ]}>
        <ActivityIndicator style={{ marginRight: 5 }}/>
        <Text style={{ color: theme.colors.text }}>
          Chargement...
        </Text>
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name='Root' component={DrawerNavigator} options={{ headerShown: false }}/>
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name='Camera' component={CameraNavigator} options={{ headerShown: false }}/>
            <Stack.Screen
              name='PermissionsManager'
              component={PermissionsManager}
              options={{ headerShown: true, title: "Permissions de l'application" }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
  }
})

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName='Accueil'>
      <Drawer.Screen
        name='Accueil'
        component={AccueilNavigator}
        options={{ headerShown: true, title: 'Sommaire de la base de données' }}
      />
      <Drawer.Screen name='Patients' component={PatientNavigator}/>
      <Drawer.Screen name='Dossier' component={GestionDossierNavigator}/>
      <Drawer.Screen name='Centres' component={CentreDeSanteNavigator}/>
      <Drawer.Screen name='Diagnostics' component={DiagnosticNavigator}/>
      <Drawer.Screen name='Procedures' component={ProcedureNavigator}/>
    </Drawer.Navigator>
  )
}

const AccueilNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='GestionSummary'>
      <Stack.Screen name='GestionSummary' component={GestionSummary} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const PatientNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='PatientList'>
      <Stack.Screen name='PatientList' component={PatientList} options={{ headerShown: false }} />
      <Stack.Screen
        name='PatientDetails'
        component={PatientDetails}
        options={{ headerShown: true, title: 'Informations du patient' }}
      />
    </Stack.Navigator>
  );
};

const GestionDossierNavigator = () => {
  return(
    <Stack.Navigator initialRouteName='GestionDossier'>
      <Stack.Screen name='GestionDossier' component={GestionDossier} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const CentreDeSanteNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='CentreDeSanteList'>
      <Stack.Screen name='CentreDeSanteList' component={CentreDeSanteList} options={{ headerShown: false }} />
      <Stack.Screen
        name='CentreDeSanteDetails'
        component={CentreDeSanteDetails}
        options={{ headerShown: true, title: 'Informations du centre' }}
      />
      <Stack.Screen
        name='PatientDetails'
        component={PatientDetails}
        options={{ headerShown: true, title: 'Informations du patient' }}
      />
    </Stack.Navigator>
  );
};

const DiagnosticNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='DiagnosticList'>
      <Stack.Screen name='DiagnosticList' component={DiagnosticList} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const ProcedureNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='ProcedureList'>
      <Stack.Screen name='ProcedureList' component={ProcedureList} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const CameraNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='CameraHome'>
      <Stack.Screen
        name='CameraHome'
        component={CameraHome}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default App;
