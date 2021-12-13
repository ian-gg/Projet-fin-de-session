import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { MlkitOcrResult } from 'react-native-mlkit-ocr/src';
import { Button, Text, TextInput } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import { PatientService } from '~services';

import { CentreDeSanteStore } from '~stores';

const centreStore = new CentreDeSanteStore();

const updateStore = async () => {
  await centreStore.load();
};

const enum PatientField {
  NumDossier = 'num_dossier',
  Nom = 'nom',
  AssuranceMaladie = 'assurance_maladie',
  AssuranceMaladieExpA = 'assurance_maladie_exp_a',
  AssuranceMaladieExpM = 'assurance_maladie_exp_m',
  DateNaissance = 'date_naissance',
  Sexe = 'sexe',
  Cellulaire = 'cellulaire',
}

type PatientForm = {
  [key in PatientField]: string;
};

const defaultForm = {
  centre_de_sante: {
    id: '',
  },
  num_dossier: '',
  assurance_maladie: '',
  assurance_maladie_exp_a: '',
  assurance_maladie_exp_m: '',
  nom: '',
  date_naissance: '',
  sexe: '',
  cellulaire: '',
};

const formLabels = {
  num_dossier: 'Numéro de dossier',
  assurance_maladie: 'Assurance maladie',
  assurance_maladie_exp_a: "Année d'expiration",
  assurance_maladie_exp_m: "Mois d'expiration",
  nom: 'Nom',
  date_naissance: 'Date de naissance',
  sexe: 'Sexe',
  cellulaire: 'Cellulaire',
};

const PatientOcrResultPreview = (props: {
  image: string | undefined;
  result: MlkitOcrResult;
}) => {
  const { image, result } = props;

  const [resultLines, setResultLines] = useState<any[]>([]);
  const [form, setForm] = useState<any>(defaultForm);

  const navigation = useNavigation();

  useEffect(() => {
    updateStore();
    setForm(defaultForm);
  }, []);

  useEffect(() => {
    if (result && result.length > 0) {
      const newInfo = result.reduce((acc, block) => {
        const lineTexts: string[] = block.lines.map(line => line.text);

        return acc.concat(lineTexts);
      }, [] as string[]);

      newInfo.reverse();

      setResultLines(newInfo);
    }
  }, [image, result]);

  const canSave = () => {
    return (
      !!form.centre_de_sante.id &&
      !!form.num_dossier &&
      !!form.assurance_maladie
    );
  };

  if (result && result.length > 0) {
    return (
      <SafeAreaView style={styles.containerSuccess}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            padding: 10,
          }}
          showsVerticalScrollIndicator
          style={styles.scroll}>
          <Image
            source={{ uri: `file://${image}` }}
            style={styles.imageStyle}
            resizeMode="contain"
            onLoadEnd={() => console.log('loaded image')}
          />

          <Button
            mode="contained"
            onPress={async () => {
              await submitPatientForm(form, navigation);
            }}
            disabled={
              !form.centre_de_sante.id ||
              !form.num_dossier ||
              !form.assurance_maladie ||
              !form.date_naissance
            }
            style={{ marginBottom: 10 }}>
            Soumettre
          </Button>

          <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'column', marginBottom: 5 }}>
              <Text>Centre de santé</Text>
              <Dropdown
                data={centreStore.dropDownData}
                placeholder="Choisir un centre de santé"
                labelField="label"
                valueField="value"
                value={form.centre_de_sante.id}
                renderItem={item => (
                  <Text style={{ fontSize: 16 }}>{item.label}</Text>
                )}
                onChange={item => {
                  setForm({
                    ...form,
                    centre_de_sante: {
                      ...form.centre_de_sante,
                      id: item.value,
                    },
                  });
                }}
                style={[styles.dropdownCentres]}
              />
            </View>

            {Object.keys(formLabels)?.map((key: string) => {
              return (
                <View
                  key={key}
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    minHeight: 66,
                    marginBottom: 5,
                  }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput
                      label={formLabels[key as PatientField]}
                      value={form[key]}
                      onChangeText={v => {
                        setForm({
                          ...form,
                          [key]: v,
                        });
                      }}
                      mode={'outlined'}
                      disabled={false}
                      autoComplete="off"
                      style={[styles.textInput, { marginRight: 5 }]}
                    />

                    <View
                      style={{
                        flex: 2,
                        flexDirection: 'column',
                        paddingTop: 6,
                        paddingBottom: 1,
                      }}>
                      <Dropdown
                        data={resultLines.map(e => ({ label: e, value: e }))}
                        placeholder="Lignes reconnues"
                        labelField="label"
                        valueField="value"
                        value={form[key]}
                        renderItem={item => <Text> {item.label} </Text>}
                        onChange={item => {
                          setForm({
                            ...form,
                            [key]: item.value,
                          });
                        }}
                        style={styles.dropdown}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={styles.containerError}>
        <Text>Aucun résultat pour la reconnaissance de texte.</Text>
      </View>
    );
  }
};

export default PatientOcrResultPreview;

const styles = StyleSheet.create({
  containerError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSuccess: {
    flex: 1,
    alignItems: 'center',
  },
  imageStyle: {
    marginTop: -75,
    width: '100%',
    height: 400,
    transform: [{ rotate: '90deg' }],
  },
  buttonsView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  scroll: {
    flex: 1,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 2,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: 10,
  },
  textInput: {
    flex: 3,
    backgroundColor: 'white',
    borderColor: 'black',
    fontSize: 10,
  },
  dropdown: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownCentres: {
    flex: 1,
    borderColor: 'gray',
    minHeight: 50,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

const submitPatientForm = async (form: PatientForm, navigation: any) => {
  //On teste si le patient existe.
  console.log(form);

  let date_naissance_complete: number[] = form.date_naissance
    .split('-')
    .map(e => parseInt(e, 10));

  // Creation du patient si il n"existe pas
  let patient = await PatientService.create({
    ...form,
    date_naissance: new Date(
      date_naissance_complete[0],
      date_naissance_complete[1],
      date_naissance_complete[2],
    ),
  });

  const saved = await PatientService.save(patient);

  navigation.navigate('Patients', {
    screen: 'PatientDetails',
    params: {
      navStack: 'Patients',
      patientId: saved.id,
    },
  });
};
