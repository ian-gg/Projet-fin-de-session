import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, TextInput, useColorScheme, View, Button, StyleSheet, Text, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
//import ImagePicker from 'react-native-image-picker';
var ImagePicker = require('react-native-image-picker');

import MlkitOcr, { MlkitOcrResult } from '../../react-native-mlkit-ocr/src/index';

import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

import { PatientNavigationProps } from '~models/types';

import { observer } from 'mobx-react';

export default function GestionDossier(){

  const [loading, setLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<MlkitOcrResult | undefined>();
  const [image, setImage] = React.useState<ImagePickerResponse | undefined>();

  const [dataInfo, setDataInfo] = React.useState();

  function sendInfo(){
    //Envoyer les info axu routes
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

  
  function fitWidth(value: number, imageWidth: number) {
    const fullWidth = Dimensions.get('window').width;
    return (value / imageWidth) * fullWidth;
  }

  function fitHeight(value: number, imageHeight: number) {
    const fullHeight = Dimensions.get('window').height;
    return (value / imageHeight) * fullHeight;
  }

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
          padding: 20,
          height: Dimensions.get('window').height,
        }}
        showsVerticalScrollIndicator
        style={styles.scroll}
      >
        {result?.map((block) => {
          return block.lines.map((line) => {
            return (
              <View
                key={line.text}
              >
                <Text style={{ fontSize: 10 }}>{line.text}</Text>
              </View>
            );
          });
        })}
      </ScrollView>
    )}
    {!!result?.length && (
      <ScrollView
        contentContainerStyle={{
          alignItems: 'stretch',
          padding: 20,
          height: Dimensions.get('window').height,
        }}
        showsVerticalScrollIndicator
        style={styles.scroll}
      >
        {dataInfo.map((item: any) => {
            
            return(
              <View
                key={item.txt}
              >
                <Text style={{ fontSize: 10 }}>{item.txt}</Text>
                <TextInput
                  style={styles.input}
                  value={item.value}
                />
              </View>
            )

          })
        }
        
        <Button
          onPress={() => {
            sendInfo();
          }}
          title="Send"
        />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 10,
  },
});



//export default GestionDossier;