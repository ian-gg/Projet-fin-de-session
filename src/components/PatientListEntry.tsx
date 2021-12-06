import React from 'react';
import { Patient } from '~models';

import { List } from 'react-native-paper';

const PatientListEntry = (props: {
  index: number;
  patient: Patient;
  onPress: Function;
}) => {
  const { patient, onPress } = props;

  return (
    <List.Item
      title={patient.nom}
      description={patient.num_dossier}
      onPress={() => onPress()}
    />
  );
};

export default PatientListEntry;
