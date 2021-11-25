import React from 'react';
import { FlatList, SafeAreaView, TextInput, useColorScheme, View, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Button } from 'react-native-paper';

import { DrawerNavigationProps } from '~models/types';

import { PatientStore } from '~stores';
import { PatientListEntry } from '~components';
import { observer } from 'mobx-react';

const patientStore = new PatientStore();

const updateStore = async () => {
  await patientStore.load();
};

const PatientList = observer(({ route, navigation }: DrawerNavigationProps) => {
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
          <Button
            icon="camera"
            mode="contained"
            onPress={() => navigation.navigate('Camera', {
              screen: 'CameraHome',
            })}
          >
            Par caméra
          </Button>
        </View>     
      </View>
      <View style={styles.flatListView}>
        <FlatList
          data={patientStore?.filteredPatients}
          renderItem={(item) => {
            return (
              <PatientListEntry
                key={`patient-${item.item.id}`}
                index={item.index}
                patient={item.item}
                onPress={() => navigation.navigate('Patients', {
                  screen: 'PatientDetails',
                  params: { patientId: item.item.id },
                })}
              />
            );
          }}
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
