import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TextInput, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Patient } from '~models';
import { PatientService } from '~services';

interface PatientFilters {
  text: string | undefined;
}
const defaultFilters: PatientFilters = {
  text: undefined,
};

const PatientList = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [patients, setPatients] = useState<Patient[] | undefined>(undefined);
  const [filters, setFilters] = useState<PatientFilters>(defaultFilters);

  const fetchPatients = useCallback(() => {
    PatientService.getAll().then((res) => setPatients(res));
  }, [filters]);

  const updateTextFilter = (text: string | undefined) => {
    setFilters({
      ...filters,
      text,
    });
  };

  const filteredPatients: () => Patient[] | undefined = () => {
    const filtered = patients;

    if (filters) {
      if (filters.text) {
        // ...
      }
    }

    return filtered;
  }

  useEffect(() => {
    if (!patients) {
      fetchPatients();
    }
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TextInput
            value={filters.text}
            placeholder="Recherche"
            onChangeText={updateTextFilter}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientList;
