import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ListRenderItemInfo } from 'react-native';
import { Patient } from '~models';

const PatientListEntry = (item: ListRenderItemInfo<Patient>, navigation: any) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('PatientDetails',{patientId: item.item.id} )}>
      <View style={[styles.patientEntry, {backgroundColor: item.index % 2 === 0 ? 'grey' : 'white' }]}>
        <View>
          <Text style={{fontSize:18}}> {item.item.nom} </Text>
          <Text style={{fontSize:12}}> {item.item.num_dossier} </Text>
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