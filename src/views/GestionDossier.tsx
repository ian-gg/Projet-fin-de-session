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


  function takePhoto(){
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
    setLoading: (value: boolean) => void
  ){
    /*
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let source = response;
        console.log(source);
        this.setState({
          filePath: source,
        });
      }
    });
    */

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
          setResult(await MlkitOcr.detectFromUri(response.assets[0].uri));
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

/*
  return(        
      <View style={styles.buttonsView}>
          <Button
          title="prendre une photo"
          onPress={takePhoto}
          ></Button>

        <Button
          title="gallerie"
          onPress={upload}
          >
          </Button>
      </View>
  );
*/

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
                style={{
                  backgroundColor: '#ccccccaf',
                  position: 'absolute',
                  top: fitHeight(line.bounding.top, image?.height ?? 0),
                  height: fitHeight(line.bounding.height, image?.height ?? 0),
                  left: fitWidth(line.bounding.left, image?.width ?? 0),
                  width: fitWidth(line.bounding.width, image?.width ?? 0),
                }}
              >
                <Text style={{ fontSize: 10 }}>{line.text}</Text>
              </View>
            );
          });
        })}
      </ScrollView>
    )}

    <Button
      onPress={() => {
        setLoading(true);
        upload(setResult, setImage, setLoading);
      }}
      title="Start"
    />
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
});



//export default GestionDossier;