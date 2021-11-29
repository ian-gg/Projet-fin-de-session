import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, useColorScheme, View, StyleSheet, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { CentreDeSanteNavigationProps } from '~models/types';

import { CentreDeSante } from '~models';
import { CentreDeSanteService } from '~services';

import PatientListAccordion from '~components/PatientListAccordion';

const CentreDeSanteDetails = observer(({ route, navigation }: CentreDeSanteNavigationProps) => {
  const { centreDeSanteId } = route.params;

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  const [centreDeSante, setCentreDeSante] = useState<CentreDeSante | undefined>(undefined);

  useEffect(() => {
    const getCentreDeSante = async () => {
      setCentreDeSante(await CentreDeSanteService.get(centreDeSanteId))
    };

    getCentreDeSante();
  }, [centreDeSanteId]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          
          <Text>CentreDeSante { centreDeSante?.id }</Text>
          <Text>Nom: { centreDeSante?.nom }</Text>

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text>Nombre de patients: { centreDeSante?.patients.length || 0 }</Text>
            <PatientListAccordion
              patients={centreDeSante?.patients}
              navigation={navigation}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  centreDeSanteEntry : {
    padding : 5
  }
});

export default CentreDeSanteDetails;
