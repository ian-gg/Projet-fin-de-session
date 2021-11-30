import React from 'react';
import { StyleSheet } from 'react-native';
import { Patient } from '~models';

import { List } from 'react-native-paper';

const PatientListEntry = (props: {
  index: number,
  patient: Patient,
  onPress: Function,
}) => {
  const {
    index,
    patient,
    onPress,
  } = props;

  return (
    <List.Item
      title={patient.nom}
      description={patient.num_dossier}
      onPress={() => onPress()}
    />
  );
};

const styles = StyleSheet.create({
});

export default PatientListEntry;
