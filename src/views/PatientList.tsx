import React from 'react';
import { FlatList, SafeAreaView, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';

import { DrawerNavigationProps } from '~models/types';

import { PatientStore } from '~stores';
import { PatientListEntry } from '~components';
import { observer } from 'mobx-react';

const patientStore = new PatientStore();

const updateStore = async () => {
  await patientStore.load();
};

const PatientList = observer(({ route, navigation }: DrawerNavigationProps) => {
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
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

      <Searchbar
        placeholder="Recherche"
        value={patientStore?.filters.text}
        onChangeText={v => patientStore?.setFilter('text', v)}
        autoComplete={false}
        style={{ marginBottom: 5 }}
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
      </KeyboardAvoidingView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 5
  },
});

export default PatientList;
