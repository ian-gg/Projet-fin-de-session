import React from 'react';
import { StyleSheet } from 'react-native';
import { CentreDeSante } from '~models';

import { List } from 'react-native-paper';

const CentreDeSanteListEntry = (index: number, centre: CentreDeSante, navigation: any) => {
  return (
    <List.Item
      title={centre.nom}
      style={[styles.centreDeSanteEntry, {backgroundColor: index % 2 === 0 ? 'grey' : 'white' }]}
      onPress={() => navigation.navigate('CentreDeSanteDetails', { centreDeSanteId: centre.id })}
    />
  );
};

const styles = StyleSheet.create({
  centreDeSanteEntry : {
    padding : 5
  }
});

export default CentreDeSanteListEntry;
