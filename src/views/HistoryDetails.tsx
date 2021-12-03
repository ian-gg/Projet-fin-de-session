import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { PatientNavigationProps } from '~models/types';

import { Patient } from '~models';
import { PatientService } from '~services';

const HistoryDetails = observer(({ route, navigation }: PatientNavigationProps) => {
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
          <Text>{ patient?.id }</Text>
          <Text>{ patient?.assurance_maladie }</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

export default HistoryDetails;
