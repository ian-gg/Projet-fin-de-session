import React from 'react';
import { FlatList, SafeAreaView, TextInput, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { PatientStore } from '~stores';
import { PatientListEntry } from '~components';
import { observer } from 'mobx-react';

const patientStore = new PatientStore();

const PatientList = observer(() => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <TextInput
          value={patientStore.filters.text}
          placeholder="Recherche"
          onChangeText={(v) => patientStore.setFilter('text', v)}
        />

      <FlatList
        data={patientStore.filteredPatients}
        renderItem={PatientListEntry}
      />
      </View>
    </SafeAreaView>
  );
});

export default PatientList;
