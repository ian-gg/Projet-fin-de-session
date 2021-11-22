import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, TextInput, useColorScheme, View, Button, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { PatientNavigationProps } from '~models/types';

import { PatientStore } from '~stores';
import { PatientListEntry } from '~components';
import { observer } from 'mobx-react';

const patientStore = new PatientStore();

const updateStore = async () => {
  await patientStore.load();
};

const PatientList = observer(({ route, navigation }: PatientNavigationProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
        <View style={styles.buttonsView}>
          <View style={{marginLeft:8}}>
            <TextInput
              value={patientStore?.filters.text}
              placeholder="Recherche"
              onChangeText={(v) => patientStore?.setFilter('text', v)}
              style={{width:150}}
            />  
          </View>
          <View style={{ marginRight: 8 }}>
            <Button title="Par caméra"/>
          </View>     
        </View>
        <View style={styles.flatListView}>
          <FlatList
            data={patientStore?.filteredPatients}
            renderItem={(item) => PatientListEntry(item.index, item.item, navigation)}
          />
        </View> 
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonsView : {
    flexDirection:"row", 
    flex:1, 
    alignItems:"center", 
    justifyContent:"space-between"
  },
  flatListView : {
    flexDirection:"row", 
    flex:4
  }
});

export default PatientList;
