import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ListRenderItemInfo } from 'react-native';
import { Patient } from '~models';

const PatientListEntry = (index: number, patient: Patient, navigation: any) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PatientDetails', { patientId: patient.id })}
    >
      <View style={[styles.patientEntry, {backgroundColor: index % 2 === 0 ? 'grey' : 'white' }]}>
        <View>
          <Text style={{fontSize:18}}> {patient.nom} </Text>
          <Text style={{fontSize:12}}> {patient.num_dossier} </Text>
        </View>     
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  patientEntry : {
    padding : 15
  }
});

export default PatientListEntry;
