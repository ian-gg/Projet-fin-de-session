import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  MKLBlock,
  MlkitOcrResult,
  MLKTextLine,
} from 'react-native-mlkit-ocr/src';
import { Button, Text, TextInput } from 'react-native-paper';
import {
  CentreDeSanteService,
  DossierService,
  PatientService,
} from '~services';

const PatientOcrResultPreview = (props: {
  image: string | undefined;
  result: MlkitOcrResult;
}) => {
  const { image, result } = props;

  const [dataInfo, setDataInfo] = useState<any[]>([]);

  useEffect(() => {
    if (result) {
      const nas_complete = result[0].lines[6].text.replace(' ', '').trim();

      const json = [
        { value: result[0].lines[0].text, txt: 'date' },
        { value: result[0].lines[1].text, txt: 'name' },
        { value: result[1].text, txt: 'sexe' },
        { value: result[2].text, txt: 'numero patient' },
        { value: result[3].text, txt: 'telephone' },
        { value: nas_complete.slice(0, 12), txt: 'nas' },
        {
          value: nas_complete.slice(12, nas_complete.length).trim(),
          txt: 'nas exp',
        },
      ];

      console.log(json);

      setDataInfo(json);
    }
  }, [image, result]);

  if (result) {
    console.log(image, result);

    return (
      <SafeAreaView style={styles.containerSuccess}>
        <Image
          source={{ uri: `file://${image}` }}
          style={styles.imageStyle}
          resizeMode="contain"
          onLoadEnd={() => console.log('loaded image')}
        />

        <ScrollView
          contentContainerStyle={{
            alignItems: 'stretch',
            padding: 10,
            height: Dimensions.get('window').height,
          }}
          showsVerticalScrollIndicator
          style={styles.scroll}>
          <Button
            onPress={async () => {
              await sendInfo(dataInfo);
            }}>
            Soumettre
          </Button>

          {dataInfo?.map((item: any, index: any) => {
            return (
              <View style={styles.rowContainer} key={index}>
                <TextInput
                  label={dataInfo[index].txt}
                  style={styles.textInput}
                  value={dataInfo[index].value}
                  onChangeText={value => {
                    dataInfo[index].value = value;
                    setDataInfo(dataInfo);
                  }}
                  autoComplete="off"
                />
              </View>
            );
          })}
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
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    fontSize: 10,
  },
});

const sendInfo = async (dataInfo: any[]) => {
  const centreDeSante = await CentreDeSanteService.get(1);

  //On teste si le patient existe.
  try {
    await DossierService.getPatientByName(dataInfo[1].value);
  } catch (e) {
    let date_naissance_complete = dataInfo[0].value.split('-');

    //Creation du patient si il n"existe pas
    let patient = await PatientService.create({
      centre_de_sante: centreDeSante,
      num_dossier: dataInfo[3].value,
      nom: dataInfo[1].value,
      assurance_maladie: dataInfo[5].value,
      assurance_maladie_exp_m: dataInfo[6].value.slice(2, 4),
      assurance_maladie_exp_a: dataInfo[6].value.slice(0, 2),
      date_naissance: new Date(
        date_naissance_complete[0],
        date_naissance_complete[1],
        date_naissance_complete[2],
      ),
      sexe: dataInfo[2].value,
      cellulaire: dataInfo[4].value,
    });

    await PatientService.save(patient);
  }
};
