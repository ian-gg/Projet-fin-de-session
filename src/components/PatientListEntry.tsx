import React from 'react';
import { Text } from 'react-native';

import { Patient } from '~models';

const PatientListEntry = ({ item }: { item: Patient }) => {
  return (
    <Text>
      {item.id}
    </Text>
  );
};

export default PatientListEntry;
