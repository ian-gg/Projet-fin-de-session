import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { PatientNavigationProps } from '~models/types';

import { Patient } from '~models';
import { PatientService } from '~services';

const PatientDetails = observer(({ route, navigation }: PatientNavigationProps) => {
  const { patientId } = route.params;
  
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const getPatient = async () => {
      setPatient(await PatientService.get(patientId));
    };

    getPatient();
  }, [patientId]);

  return (
    <SafeAreaView style={{ padding: 5 }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Patient { patient?.id }</Text>
          <Text>Centre de santé { patient?.centre_de_sante.id } - { patient?.centre_de_sante.nom }</Text>
          <Text>{ patient?.assurance_maladie }</Text>
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
