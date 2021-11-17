import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, useColorScheme, View, StyleSheet, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { PatientNavigationProps } from '~models/types';

import { Patient } from '~models';
import { PatientService } from '~services';

import HistoryList from './HistoryList';

const PatientDetails = observer(({ route, navigation }: PatientNavigationProps) => {
  const { patientId } = route.params;

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const getPatient = async () => {
      setPatient(await PatientService.get(patientId));
    };

    getPatient();
  }, [patientId]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          
          <Text>{ patient?.id }</Text>
          <Text>{ patient?.assurance_maladie }</Text>

          <HistoryList/>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  patientEntry : {
    padding : 15
  }
});

export default PatientDetails;
