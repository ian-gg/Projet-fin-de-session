import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { CentreDeSanteService, PatientService } from '~services';

const GestionSummary = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [centresCount, setCentresCount] = useState<number>(0);
  const [patientsCount, setPatientsCount] = useState<number>(0);

  useEffect(() => {
    const setCounts = async () => {
      setCentresCount(await CentreDeSanteService.count());
      setPatientsCount(await PatientService.count());
    };

    setCounts();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>

        <Text>Centres de Santé: { centresCount }</Text>
        <Text>Nombre de patients: { patientsCount }</Text>
      </View>
    </SafeAreaView>
  );
};

export default GestionSummary;
