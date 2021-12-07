import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

import { PatientNavigationProps } from '~models/types';

import { Patient } from '~models';
import { PatientService } from '~services';
import { CentreDeSanteStore } from '~stores';

const centreStore = new CentreDeSanteStore();

const updateStore = async () => {
  await centreStore.load();
};

const PatientEdit = observer(
  ({ route, navigation }: PatientNavigationProps) => {
    const { patient } = route.params;

    const [patientCopy, setPatientCopy] = useState<Patient>({
      ...patient,
      date_naissance: new Date(patient.date_naissance),
    });

    useEffect(() => {
      const onFocus = navigation.addListener('focus', async () => {
        updateStore();
      });

      return onFocus;
    }, [navigation]);

    const getPatientAge = (birthdate: Date) => {
      if (birthdate) {
        return (
          new Date().getFullYear() - new Date(birthdate).getFullYear()
        ).toString();
      } else {
        return '';
      }
    };

    const noAssuranceMaladieHasErrors = () => {
      const noAssuranceMaladie = patientCopy.assurance_maladie;

      if (
        !noAssuranceMaladie ||
        noAssuranceMaladie.length != 12 ||
        !isNaN(noAssuranceMaladie?.substring(0, 4) as any)
      ) {
        return true;
      }

      return false;
    };

    const expirationAnneeAssuranceMaladieHasErrors = () => {
      const annee = patientCopy.assurance_maladie_exp_a;

      if (!annee || isNaN(annee) || annee < 0) {
        return true;
      }

      return false;
    };

    const expirationMoisAssuranceMaladieHasErrors = () => {
      const mois = patientCopy.assurance_maladie_exp_m;

      if (!mois || isNaN(mois) || mois > 12 || mois < 1) {
        return true;
      }

      return false;
    };

    const dateNaissanceHasErrors = () => {
      const dateNaissance = patientCopy.date_naissance;

      if (!dateNaissance || isNaN(new Date(dateNaissance).getDate())) {
        return true;
      }

      return false;
    };

    const sexeHasErrors = () => {
      const sexe = patientCopy.sexe;

      if (!sexe || sexe.length != 1 || !isNaN(parseInt(sexe, 10))) {
        return true;
      }

      return false;
    };

    const cellulaireHasErrors = () => {
      const cellulaire = patientCopy.cellulaire;

      if (!cellulaire || cellulaire.length !== 12) {
        return true;
      }

      return false;
    };

    const hasErrors = () => {
      if (
        noAssuranceMaladieHasErrors() ||
        expirationAnneeAssuranceMaladieHasErrors() ||
        expirationMoisAssuranceMaladieHasErrors() ||
        sexeHasErrors() ||
        dateNaissanceHasErrors() ||
        cellulaireHasErrors()
      ) {
        return true;
      }

      return false;
    };

    async function saveModifications() {
      if (hasErrors()) {
        Alert.alert(
          'Erreur',
          "Un ou plusieurs champs sont invalides. Vérifier qu'il n'y ait aucun champ en rouge.",
        );
      } else {
        if (patientCopy) {
          let patientModifie = { ...patientCopy };

          console.log(patientModifie);

          PatientService.save(patientModifie).then(
            () => {
              navigation.goBack();
            },
            e => {
              console.error(e);

              Alert.alert(
                'Erreur',
                'Erreur lors de la modification des détails patient.',
              );
            },
          );
        }
      }
    }

    return (
      <SafeAreaView style={{ padding: 5 }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ height: '100%' }}>
          {patientCopy && (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Text>
                  Patient Id : {patientCopy.id} | Centre de santé Id :{' '}
                  {patientCopy.centre_de_sante.id}
                </Text>
              </View>
              <View style={{ flex: 11 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.dropdownLabel]}>Centre de santé:</Text>
                  <Dropdown
                    data={centreStore.centres.map(c => ({
                      label: c.nom,
                      value: c.id,
                    }))}
                    placeholder="Choisir un centre de santé"
                    labelField="label"
                    valueField="value"
                    maxHeight={50}
                    value={patientCopy.centre_de_sante.id}
                    renderItem={item => (
                      <Text style={{ fontSize: 16 }}> {item.label} </Text>
                    )}
                    onChange={item => {
                      setPatientCopy({
                        ...patientCopy,
                        centre_de_sante: {
                          ...patientCopy.centre_de_sante,
                          id: item.value,
                        },
                      });
                    }}
                    style={[styles.dropdown, { flex: 1 }]}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    label={'No. assurance maladie :'}
                    value={patientCopy.assurance_maladie}
                    onChangeText={v => {
                      setPatientCopy({
                        ...patientCopy,
                        assurance_maladie: v,
                      });
                    }}
                    error={noAssuranceMaladieHasErrors()}
                    mode={'outlined'}
                    disabled={false}
                    autoComplete="off"
                    style={[styles.textInput, { flex: 1 }]}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    label={"Annee d'expiration:"}
                    value={patientCopy.assurance_maladie_exp_a.toString()}
                    onChangeText={v => {
                      setPatientCopy({
                        ...patientCopy,
                        assurance_maladie_exp_a: parseInt(v, 10),
                      });
                    }}
                    error={expirationAnneeAssuranceMaladieHasErrors()}
                    mode={'outlined'}
                    disabled={false}
                    autoComplete="off"
                    style={[styles.textInput, { flex: 1 }]}
                  />
                  <TextInput
                    label={"Mois d'expiration : "}
                    value={patientCopy.assurance_maladie_exp_m.toString()}
                    onChangeText={v => {
                      setPatientCopy({
                        ...patientCopy,
                        assurance_maladie_exp_m: parseInt(v, 10),
                      });
                    }}
                    error={expirationMoisAssuranceMaladieHasErrors()}
                    mode={'outlined'}
                    disabled={false}
                    autoComplete="off"
                    style={[styles.textInput, { flex: 1 }]}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    label={'Âge :'}
                    value={getPatientAge(patientCopy.date_naissance)}
                    mode={'outlined'}
                    disabled={true}
                    autoComplete="off"
                    style={[styles.textInput, { flex: 1 }]}
                  />
                  <TextInput
                    label={'Sexe :'}
                    value={patientCopy.sexe}
                    onChangeText={v => {
                      setPatientCopy({
                        ...patientCopy,
                        sexe: v,
                      });
                    }}
                    error={sexeHasErrors()}
                    mode={'outlined'}
                    disabled={false}
                    autoComplete="off"
                    style={[styles.textInput, { flex: 1 }]}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    label={'Date de naissance (aaaa-mm-jj) :'}
                    value={patientCopy.date_naissance
                      .toISOString()
                      .substring(0, 10)}
                    onChangeText={v => {
                      setPatientCopy({
                        ...patientCopy,
                        date_naissance: new Date(v),
                      });
                    }}
                    error={dateNaissanceHasErrors()}
                    mode={'outlined'}
                    disabled={false}
                    autoComplete="off"
                    style={[styles.textInput, { flex: 1 }]}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    label={'Téléphone (###-###-####) :'}
                    value={patientCopy.cellulaire}
                    onChangeText={v => {
                      setPatientCopy({
                        ...patientCopy,
                        cellulaire: v,
                      });
                    }}
                    error={cellulaireHasErrors()}
                    mode={'outlined'}
                    disabled={false}
                    autoComplete="off"
                    style={[styles.textInput, { flex: 1 }]}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'column', flex: 2 }}>
                <Button
                  mode="text"
                  icon="content-save"
                  onPress={() => saveModifications()}
                  style={[styles.button, { flex: 1 }]}
                  contentStyle={{ flexDirection: 'row-reverse' }}>
                  <Text style={{ fontSize: 10 }}>
                    {' '}
                    Sauvegarder les modifications{' '}
                  </Text>
                </Button>
              </View>
            </View>
          )}
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
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownLabel: {
    position: 'absolute',
    backgroundColor: '#f6f6f6',
    top: -8,
    zIndex: 999,
    marginHorizontal: 8,
    fontSize: 11,
  },
});

export default PatientEdit;
