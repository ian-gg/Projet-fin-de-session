import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

import { PatientNavigationProps } from '~models/types';

import { Patient } from '~models';
import { PatientService } from '~services';

const PatientDetails = observer(
  ({ route, navigation }: PatientNavigationProps) => {
    const { patientId } = route.params;

    const [patient, setPatient] = useState<Patient | undefined>(undefined);

    useEffect(() => {
      const getPatient = async () => {
        const fetched = await PatientService.get(patientId);

        if (fetched?.date_naissance) {
          console.log(fetched);
        }

        setPatient(fetched);
      };

      const onFocus = navigation.addListener('focus', async () => {
        await getPatient();
      });

      return onFocus;
    }, [navigation, patientId]);

    function getPatientAge(birthdate: Date | undefined) {
      if (birthdate) {
        return (
          new Date().getFullYear() - new Date(birthdate).getFullYear()
        ).toString();
      } else {
        return '';
      }
    }

    function getExpirationAssuranceMaladie() {
      if (
        !patient?.assurance_maladie_exp_a ||
        !patient?.assurance_maladie_exp_m
      ) {
        return '';
      }

      let dateExpiration = new Date(
        patient?.assurance_maladie_exp_a,
        patient?.assurance_maladie_exp_m - 1,
      );
      return `${dateExpiration.getFullYear()}/${dateExpiration.getMonth() + 1}`;
    }

    return (
      <SafeAreaView style={{ padding: 5 }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ height: '100%' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ marginBottom: 10 }}>
              <Text>
                Patient Id : {patient?.id} | Centre de santé Id :{' '}
                {patient?.centre_de_sante.id}
              </Text>
            </View>

            <ScrollView
              style={{
                flex: 1,
                flexDirection: 'column',
              }}>
              <TextInput
                label={'Centre de santé :'}
                value={patient?.centre_de_sante.nom}
                mode={'outlined'}
                disabled={true}
                autoComplete="off"
                style={[styles.textInput, { marginBottom: 5 }]}
              />

              <TextInput
                label={'Numéro de dossier :'}
                value={patient?.num_dossier}
                mode={'outlined'}
                disabled={true}
                autoComplete="off"
                style={[styles.textInput, { marginBottom: 5 }]}
              />

              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <TextInput
                  label={'No. assurance maladie :'}
                  value={patient?.assurance_maladie}
                  mode={'outlined'}
                  disabled={true}
                  autoComplete="off"
                  style={[styles.textInput, { flex: 1, marginRight: 10 }]}
                />
                <TextInput
                  label={'Expiration :'}
                  value={getExpirationAssuranceMaladie()}
                  mode={'outlined'}
                  disabled={true}
                  autoComplete="off"
                  style={[styles.textInput, { flex: 1 }]}
                />
              </View>

              <TextInput
                label={'Nom :'}
                value={patient?.nom}
                mode={'outlined'}
                disabled={true}
                autoComplete="off"
                style={[styles.textInput, { marginBottom: 5 }]}
              />

              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <TextInput
                  label={'Âge :'}
                  value={getPatientAge(patient?.date_naissance)}
                  mode={'outlined'}
                  disabled={true}
                  autoComplete="off"
                  style={[styles.textInput, { flex: 1, marginRight: 10 }]}
                />
                <TextInput
                  label={'Sexe :'}
                  value={patient?.sexe}
                  mode={'outlined'}
                  disabled={true}
                  autoComplete="off"
                  style={[styles.textInput, { flex: 1 }]}
                />
              </View>

              <TextInput
                label={'Date de naissance :'}
                value={patient?.date_naissance.toString()}
                mode={'outlined'}
                disabled={true}
                autoComplete="off"
                style={[styles.textInput, { marginBottom: 5 }]}
              />

              <TextInput
                label={'Téléphone :'}
                value={patient?.cellulaire}
                mode={'outlined'}
                disabled={true}
                autoComplete="off"
                style={[styles.textInput, { marginBottom: 10 }]}
              />

              {patient && (
                <View style={{ flexDirection: 'column', marginBottom: 30 }}>
                  <Button
                    mode="contained"
                    onPress={() => {
                      navigation.navigate(route.params.navStack, {
                        screen: 'PatientEdit',
                        params: {
                          navStack: route.params.navStack,
                          patient,
                        },
                      });
                    }}
                    icon="pencil"
                    style={[styles.button, { marginBottom: 15 }]}>
                    Modifier les informations du patient
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => {
                      navigation.navigate(route.params.navStack, {
                        screen: 'HistoryList',
                        params: {
                          navStack: route.params.navStack,
                          patientId,
                        },
                      });
                    }}
                    style={[styles.button, { marginBottom: 15 }]}>
                    Historique des interventions
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => console.log('fichiers pressed')}
                    style={[styles.button]}>
                    Fichiers
                  </Button>
                </View>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  patientEntry: {
    padding: 15,
  },
  textInput: {
    textAlign: 'center',
  },
  button: {
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default PatientDetails;
