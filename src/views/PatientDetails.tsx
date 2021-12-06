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

    const [patient, setPatient] = useState<Patient | undefined>(undefined);
    const [isEditable, setIsEditable] = useState(false);

    getPatient();
    const focusListener = navigation.addListener('focus', () => {
      getPatient();
    });
  }, [patientId]);

      getPatient();
    }, [patientId]);

    function getPatientAge(birthdate: Date | undefined) {
      if (birthdate !== undefined) {
        return (
          new Date().getFullYear() - new Date(birthdate).getFullYear()
        ).toString();
      } else {
        return '';
      }
    }

  function getExpirationAssuranceMaladie(){
    if(patient?.assurance_maladie_exp_a === undefined || patient?.assurance_maladie_exp_m === undefined)
    {
      return "";
    }
    let dateExpiration = new Date(patient?.assurance_maladie_exp_a, patient?.assurance_maladie_exp_m-1);
    return `${dateExpiration.getFullYear()}/${dateExpiration.getMonth()+1}`;
  }

  return (
    <SafeAreaView style={{ padding: 5 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ height: "100%" }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text>Patient Id : { patient?.id } | Centre de santé Id : { patient?.centre_de_sante.id }</Text>
          </View>
          <View style={{ flex: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                label={"Centre de santé :"}
                value={patient?.centre_de_sante.nom}
                mode={"outlined"}
                disabled={true}
                autoComplete="off"
                style={[styles.textInput, {flex:1}]}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                label={"No. assurance maladie :"}
                value={ patient?.assurance_maladie }
                mode={"outlined"}
                disabled={true}
                autoComplete="off"
                style={[styles.textInput, {flex:3}]}
              />
              <TextInput
                label={"Expiration :"}
                value={getExpirationAssuranceMaladie()}
                mode={"outlined"}
                disabled={true}
                autoComplete="off"
                style={[styles.textInput, {flex:2}]}
              />
            </View>
            <View style={{flexDirection: "row"}}>
              <TextInput
                label={"Âge :"}
                value={ getPatientAge(patient?.date_naissance)}
                mode={"outlined"}
                disabled={true}
                autoComplete="off"
                style={[styles.textInput, {flex:1}]}
              />  
              <TextInput
                label={"Sexe :"}
                value={ patient?.sexe}
                mode={"outlined"}
                disabled={true}
                autoComplete="off"
                style={[styles.textInput, {flex:1}]}
              />  
            </View>
            <View style={{flexDirection: "row"}}>
              <TextInput
                label={"Date de naissance :"}
                value={ patient?.date_naissance.toString()}
                mode={"outlined"}
                disabled={true}
                autoComplete="off"
                style={[styles.textInput, {flex: 1}]}
              />  
            </View>
            <View style={{flexDirection: "row"}}>
              <TextInput
                label={"Téléphone :"}
                value={ patient?.cellulaire}
                mode={"outlined"}
                disabled={true}
                autoComplete="off"
                style={[styles.textInput, {flex: 1}]}
              />  
            </View>
          </View>
          <View style={{flexDirection: "column", flex: 6}}>
            <Button
                mode="text"
                onPress={() => navigation.navigate('PatientEdit', {patientId: patientId})}
                icon="pencil"
                style={[styles.button, {flex: 1}]}
                contentStyle={{flexDirection: 'row-reverse'}}
              >
               <Text style={{fontSize: 10}}> Modifier les informations du patient </Text>
            </Button>
            <Button
              mode="text"
              onPress={() => navigation.navigate('HistoryList', {patientId: patientId})}
              style={[styles.button, { flex: 1 }]}
            >
              <Text style={{fontSize: 10}}> Historique des interventions </Text>
            </Button>
            <Button
              mode="text"
              onPress={() => console.log('fichiers pressed')}
              style={[styles.button, {flex: 1}]}
            >
             <Text style={{fontSize: 10}}> Fichiers </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  patientEntry: {
    padding: 15,
  },
  textInput : {
    textAlign: "center"
  },
  button : {
    textAlign: "center",
    justifyContent: "center"
  }
});

export default PatientDetails;
