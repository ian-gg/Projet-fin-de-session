import React from 'react';
import { Patient } from '~models';

import { List } from 'react-native-paper';
import { PatientListEntry } from '~components';

const PatientListAccordion = (props: {
  patients: Patient[] | undefined;
  navigation: any;
}) => {
  return (
    <List.Accordion title="Liste des patients">
      {props.patients?.map((patient: Patient, index: number) => {
        return (
          <PatientListEntry
            key={`patient-${patient.id}`}
            index={index}
            patient={patient}
            onPress={() =>
              props.navigation.navigate('Centres', {
                screen: 'PatientDetails',
                params: {
                  navStack: 'Centres',
                  patientId: patient.id,
                },
              })
            }
          />
        );
      })}
    </List.Accordion>
  );
};

export default PatientListAccordion;
