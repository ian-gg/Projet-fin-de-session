import React, { useCallback, useEffect, useState } from 'react';
import { createConnection, Connection, getConnection, ConnectionOptions } from 'typeorm';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import {
  CentreDeSante,
  Diagnostic,
  Fichier,
  Intervention,
  InterventionProcedure,
  Patient,
  Procedure,
} from '~models';

import Accueil from '~views/Accueil';
import PatientList from '~views/PatientList';

const Drawer = createDrawerNavigator();

const dbOptions: ConnectionOptions = {
  name: 'default',
  type: 'react-native',
  database: 'patients.db',
  location: 'default',
  logging: ['error', 'query', 'schema'],
  dropSchema: true,
  synchronize: true,
  entities: [
    CentreDeSante,
    Diagnostic,
    Fichier,
    Intervention,
    InterventionProcedure,
    Patient,
    Procedure,
  ]
};

const App = () => {
  const [defaultConnection, setConnection] = useState<Connection | undefined>(undefined);

  const setupConnection = useCallback(async () => {
    try {
      const connection = await getConnection(dbOptions.name);
      setConnection(connection);
    } catch {
      createConnection(dbOptions).then((connection) => {
        setConnection(connection)
      }, (err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (!defaultConnection) {
      setupConnection();
    }
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Accueil" component={Accueil} />
        <Drawer.Screen name="Patients" component={PatientList} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
