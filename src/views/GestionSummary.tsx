import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PatientNavigationProps } from '~models/types';

import { CentreDeSanteService, PatientService } from '~services';

const GestionSummary = ({ route, navigation }: PatientNavigationProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [centresCount, setCentresCount] = useState<number>(0);
  const [patientsCount, setPatientsCount] = useState<number>(0);
  
  useEffect(() => {
    const setCounts = navigation.addListener('focus', async () => {
      setCentresCount(await CentreDeSanteService.count());
      setPatientsCount(await PatientService.count());
    });

    return setCounts;
  }, [navigation]);

  return (
    <SafeAreaView style={[backgroundStyle, {flex:1}]}>
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
