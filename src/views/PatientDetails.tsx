import React from 'react';
import { SafeAreaView, ScrollView, useColorScheme, View, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const PatientDetails = (route : any) => {
  const patientId = route.route.params.patientId;
  console.log(patientId)
  console.log(route.route);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  patientEntry : {
      padding : 15
  }
});

export default PatientDetails;
