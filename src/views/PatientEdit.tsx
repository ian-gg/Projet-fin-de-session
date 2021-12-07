import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text as TextReactNative,
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

import { PatientNavigationProps } from '~models/types';

import { CentreDeSante, Patient } from '~models';
import { PatientService } from '~services';
import { CentreDeSanteStore } from '~stores';

const PatientEdit = observer(
  ({ route, navigation }: PatientNavigationProps) => {
    const { patientId } = route.params;
    const centreStore = new CentreDeSanteStore();
    const [patient, setPatient] = useState<Patient | undefined>(undefined);
    const [noAssuranceMaladie, setNoAssuranceMaladie] = useState<
      string | undefined
    >('');
    const [
      expirationAnneeAssuranceMaladie,
      setExpirationAnneeAssuranceMaladie,
    ] = useState<number | undefined>();
    const [expirationMoisAssuranceMaladie, setExpirationMoisAssuranceMaladie] =
      useState<number | undefined>();
    const [dateNaissance, setDateNaissance] = useState<string | undefined>();
    const [sexe, setSexe] = useState<string | undefined>('');
    const [cellulaire, setCellulaire] = useState<string | undefined>('');
    const [centres, setCentres] = useState<CentreDeSante[] | undefined>();
    const [dropdownValue, setDropdownValue] = useState<number | undefined>();

    useEffect(() => {
      const getPatient = async () => {
        let patient = await PatientService.get(patientId);
        setPatient(patient);
        setNoAssuranceMaladie(patient?.assurance_maladie);
        setExpirationAnneeAssuranceMaladie(patient?.assurance_maladie_exp_a);
        setExpirationMoisAssuranceMaladie(patient?.assurance_maladie_exp_m);
        setSexe(patient?.sexe);
        setDateNaissance(patient?.date_naissance.toString());
        setCellulaire(patient?.cellulaire);
        setDropdownValue(patient?.centre_de_sante.id);
      };
      getPatient();
      const updateCentreDeSanteStore = async () => {
        await centreStore.load();
        let centres = centreStore.centres;
        setCentres(centres);
      };
      updateCentreDeSanteStore();
    }, [patientId]);

    const getPatientAge = (birthdate: string | undefined) => {
      if (birthdate !== undefined) {
        return (
          new Date().getFullYear() - new Date(birthdate).getFullYear()
        ).toString();
      } else {
        return '';
      }
    };

    const getDropdownData = () => {
      if (centres === undefined) {
        return [];
      }
      let data = [];
      for (let i = 0; i < centres.length; i++) {
        data.push({ label: centres[i].nom, value: centres[i].id });
      }
      return data;
    };

    const noAssuranceMaladieHasErrors = () => {
      if (
        noAssuranceMaladie === undefined ||
        noAssuranceMaladie.length != 12 ||
        !isNaN(noAssuranceMaladie?.substring(0, 4) as any)
      ) {
        return true;
      }
      return false;
    };
    const expirationAnneeAssuranceMaladieHasErrors = () => {
      if (
        expirationAnneeAssuranceMaladie === undefined ||
        isNaN(expirationAnneeAssuranceMaladie) ||
        expirationAnneeAssuranceMaladie < 0
      ) {
        return true;
      }
      return false;
    };
    const expirationMoisAssuranceMaladieHasErrors = () => {
      if (
        expirationMoisAssuranceMaladie === undefined ||
        isNaN(expirationMoisAssuranceMaladie) ||
        expirationMoisAssuranceMaladie > 12 ||
        expirationMoisAssuranceMaladie < 1
      ) {
        return true;
      }
      return false;
    };
    const dateNaissanceHasErrors = () => {
      if (
        dateNaissance === undefined ||
        isNaN(new Date(dateNaissance).getDate())
      ) {
        return true;
      }
      return false;
    };
    const sexeHasErrors = () => {
      if (sexe === undefined || sexe.length != 1 || !isNaN(parseInt(sexe))) {
        return true;
      }
      return false;
    };
    const cellulaireHasErrors = () => {
      if (cellulaire === undefined || cellulaire.length != 12) {
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
        if (patient !== undefined) {
          let patientModifie = patient;
          try {
            patientModifie.assurance_maladie =
              noAssuranceMaladie ?? patientModifie.assurance_maladie;
            patientModifie.assurance_maladie_exp_a =
              expirationAnneeAssuranceMaladie ??
              patientModifie.assurance_maladie_exp_a;
            patientModifie.assurance_maladie_exp_m =
              expirationMoisAssuranceMaladie ??
              patientModifie.assurance_maladie_exp_m;
            patientModifie.sexe = sexe ?? patientModifie.sexe;
            if (dateNaissance !== undefined) {
              let date = new Date(Date.parse(dateNaissance));
              patientModifie.date_naissance = date;
            }
            if (centres !== undefined) {
              let centre = centres.find(c => c.id === dropdownValue);
              if (centre !== undefined) {
                patientModifie.centre_de_sante = centre;
              } else {
                throw Error;
              }
            }
            patientModifie.cellulaire = cellulaire ?? patientModifie.cellulaire;
            console.log(patientModifie);
            await PatientService.save(patientModifie);
            Alert.alert(
              'Succès',
              'Les informations du patient ont été modifiées avec succès.',
            );
            navigation.goBack();
          } catch (e) {
            console.log(e);
            Alert.alert(
              'Erreur',
              'Erreur lors de la modification des détails patient.',
            );
          }
        }
      }
    }

    return (
      <SafeAreaView style={{ padding: 5 }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ height: '100%' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text>
                Patient Id : {patient?.id} | Centre de santé Id :{' '}
                {patient?.centre_de_sante.id}
              </Text>
            </View>
            <View style={{ flex: 11 }}>
              <View style={{ flexDirection: 'row' }}>
                <TextReactNative style={[styles.dropdownLabel]}>
                  Centre de santé:
                </TextReactNative>
                <Dropdown
                  data={getDropdownData()}
                  placeholder="Choisir un centre de santé"
                  labelField="label"
                  valueField="value"
                  maxHeight={50}
                  value={dropdownValue}
                  renderItem={item => (
                    <TextReactNative style={{ fontSize: 16 }}>
                      {' '}
                      {item.label}{' '}
                    </TextReactNative>
                  )}
                  onChange={item => {
                    setDropdownValue(item.value);
                  }}
                  style={[styles.dropdown, { flex: 1 }]}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  label={'No. assurance maladie :'}
                  value={noAssuranceMaladie}
                  onChangeText={text => setNoAssuranceMaladie(text)}
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
                  value={expirationAnneeAssuranceMaladie?.toString()}
                  onChangeText={text =>
                    setExpirationAnneeAssuranceMaladie(
                      isNaN(parseInt(text)) ? 0 : parseInt(text),
                    )
                  }
                  error={expirationAnneeAssuranceMaladieHasErrors()}
                  mode={'outlined'}
                  disabled={false}
                  autoComplete="off"
                  style={[styles.textInput, { flex: 1 }]}
                />
                <TextInput
                  label={"Mois d'expiration : "}
                  value={expirationMoisAssuranceMaladie?.toString()}
                  onChangeText={text =>
                    setExpirationMoisAssuranceMaladie(
                      isNaN(parseInt(text)) ? 0 : parseInt(text),
                    )
                  }
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
                  value={getPatientAge(dateNaissance)}
                  mode={'outlined'}
                  disabled={true}
                  autoComplete="off"
                  style={[styles.textInput, { flex: 1 }]}
                />
                <TextInput
                  label={'Sexe :'}
                  value={sexe}
                  onChangeText={text => setSexe(text)}
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
                  value={dateNaissance}
                  onChangeText={text => setDateNaissance(text)}
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
                  value={cellulaire}
                  onChangeText={text => setCellulaire(text)}
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
