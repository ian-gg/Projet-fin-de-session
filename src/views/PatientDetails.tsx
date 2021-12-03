import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

import { PatientNavigationProps } from '~models/types';

import { Patient } from '~models';
import { PatientService } from '~services';

const PatientDetails = observer(({ route, navigation }: PatientNavigationProps) => {
  const { patientId } = route.params;
  
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const getPatient = async () => {
      setPatient(await PatientService.get(patientId));
    };

    getPatient();
  }, [patientId]);

  function getPatientAge(birthdate : Date|undefined){
    if(birthdate !== undefined){
      return (new Date().getFullYear() - new Date(birthdate).getFullYear()).toString();
    }
    else {
      return "";
    }
  }

  return (
    <SafeAreaView style={{ padding: 5 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ height: "100%" }}
      >
        <View>
          <Text>Patient { patient?.id }</Text>
          <Text>Centre de santé { patient?.centre_de_sante.id } - { patient?.centre_de_sante.nom }</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flex: 2 }}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                label={"No. assurance maladie :"}
                value={ patient?.assurance_maladie }
                mode={"outlined"}
                disabled={!isEditable}
                autoComplete="off"
                style={[styles.textInput, {flex:5}]}
              />
              <TextInput
                label={"Expiration :"}
                value={ patient?.assurance_maladie_exp_a.toString() + "/" + patient?.assurance_maladie_exp_m.toString() }
                mode={"outlined"}
                disabled={!isEditable}
                autoComplete="off"
                style={[styles.textInput, {flex:2}]}
              />
            </View>
            <View style={{flexDirection: "row"}}>
              <TextInput
                label={"Âge :"}
                value={ getPatientAge(patient?.date_naissance)}
                mode={"outlined"}
                disabled={!isEditable}
                autoComplete="off"
                style={[styles.textInput, {flex:1}]}
              />  
              <TextInput
                label={"Sexe :"}
                value={ patient?.sexe}
                mode={"outlined"}
                disabled={!isEditable}
                autoComplete="off"
                style={[styles.textInput, {flex:1}]}
              />  
            </View>
            <View style={{flexDirection: "row"}}>
              <TextInput
                label={"Date de naissance :"}
                value={ patient?.date_naissance.toString()}
                mode={"outlined"}
                disabled={!isEditable}
                autoComplete="off"
                style={[styles.textInput, {flex: 1}]}
              />  
            </View>
          </View>
          <View style={{flexDirection: "column", flex: 1}}>
            <Button
              mode="text"
              onPress={() => navigation.navigate('HistoryList', {patientId: 1})}
              style={[styles.button, { flex: 1 }]}
            >
              Historique des interventions
            </Button>
            <Button
              mode="text"
              onPress={() => console.log('fichiers pressed')}
              style={[styles.button, {flex: 1}]}
            >
              Fichiers
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  patientEntry : {
    padding : 15
  },
  textInput : {
    textAlign: "center",
    marginTop: 6,
    marginBottom : 6,
    marginLeft: 2,
    marginRight: 2
  },
  button : {
    textAlign: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom : 6,
    marginLeft: 2,
    marginRight: 2
  }
});

export default PatientDetails;
