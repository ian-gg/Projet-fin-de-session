import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, useColorScheme, View, Button, StyleSheet, Text, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TextInput } from "react-native-paper";
//import ImagePicker from 'react-native-image-picker';
var ImagePicker = require('react-native-image-picker');

import MlkitOcr, { MlkitOcrResult } from '../../react-native-mlkit-ocr/src/index';

import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

import { PatientNavigationProps } from '~models/types';

import { observer } from 'mobx-react';

import { DossierNavigationProps } from '~models/types';
import { DossierService, CentreDeSanteService, PatientService } from '~services';

export default function GestionDossier(){

  const [loading, setLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<MlkitOcrResult | undefined>();
  const [image, setImage] = React.useState<ImagePickerResponse | undefined>();

  const [dataInfo, setDataInfo] = React.useState();

  const [text, setText] = React.useState('');

  async function sendInfo(){
    const centreDeSante = await CentreDeSanteService.get(1);
    
    //On teste si le patient existe.
    try{
      let patientExist = await DossierService.getPatientByName(dataInfo[1].value);
    }
    catch(e){
      
      let date_naissance_complete = (dataInfo[0].value).split("-");

      //Creation du patient si il n'existe pas
      let patient = await PatientService.create(
        {
          centre_de_sante: centreDeSante,
          num_dossier: dataInfo[3].value,
          nom: dataInfo[1].value,
          assurance_maladie: dataInfo[5].value,
          assurance_maladie_exp_m: (dataInfo[6].value).slice(2, 4),
          assurance_maladie_exp_a: (dataInfo[6].value).slice(0, 2),
          date_naissance: new Date(date_naissance_complete[0], date_naissance_complete[1], date_naissance_complete[2]),
          sexe: dataInfo[2].value,
          cellulaire: dataInfo[4].value
        }
      )
    }

  }


  function takePhoto(
    setResult: (result: MlkitOcrResult) => void,
    setImage: (result: ImagePickerResponse) => void,
    setLoading: (value: boolean) => void
  ){
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response: any) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        console.log(source);
      }
    });
  };


  function upload(
    setResult: (result: MlkitOcrResult) => void,
    setImage: (result: ImagePickerResponse) => void,
    setLoading: (value: boolean) => void,
  ){

    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async (response: ImagePickerResponse) => {
        if (!response.assets[0].uri) {
          throw new Error('oh!');
        }
        try {
          setImage(response);
          const result = await MlkitOcr.detectFromUri(response.assets[0].uri);
          setResult(result);
          
          const nas_complete = (result[0].lines[6].text).replace(" ", "").trim();

          const json = [
            {"value": result[0].lines[0].text,"txt": "date"}, 
            {"value":result[0].lines[1].text, "txt":"name"}, 
            {"value":result[1].text, "txt": "sexe"},
            {"value":result[2].text, "txt": "numero patient"},
            {"value":result[3].text, "txt": "telephone"},
            {"value":nas_complete.slice(0, 12), "txt": "nas"},
            {"value":nas_complete.slice(12, nas_complete.length).trim(), "txt": "nas exp"}
          ];
          
          setDataInfo(json);


        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    );

  };


if (loading) {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator />
    </SafeAreaView>
  );
}
return (
  <SafeAreaView style={styles.container}>
    {!!result?.length && (
      <ScrollView
        contentContainerStyle={{
          alignItems: 'stretch',
          padding: 10,
          height: Dimensions.get('window').height,
        }}
        showsVerticalScrollIndicator
        style={styles.scroll}
      >

        <Button
          onPress={() => {
            sendInfo();
          }}
          title="Send"
        />

        {dataInfo.map((item: any, index: any) => {
            
            return(
              <View
                style={styles.rowContainer}
                key={index}
              >
                <TextInput
                  label={dataInfo[index].txt}
                  style={styles.textInput}
                  value={dataInfo[index].value}
                  onChangeText = { (value) => {
                    dataInfo[index].value = value
                    setDataInfo([...dataInfo], dataInfo);
                  } }
                />
              </View>
            )

          })
        }
        
        
      </ScrollView>
    )}
    <View style={styles.buttonsView}>
      <Button
        onPress={() => {
          setLoading(true);
          upload(setResult, setImage, setLoading);
        }}
        title="Upload"
      />
      <Button
        onPress={() => {
          setLoading(true);
          takePhoto(setResult, setImage, setLoading);
        }}
        title="Take Photo"
      />
    </View>

  </SafeAreaView>
);



}


const styles = StyleSheet.create({
  buttonsView : {
    flexDirection:"row", 
    flex:1,
    alignItems:"flex-start", 
    justifyContent:"space-between",
    padding: 20
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width:300,
    marginTop:16
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 2,
  },
  rowContainer: {
    flex: 1, 
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
  }
});



//export default GestionDossier;