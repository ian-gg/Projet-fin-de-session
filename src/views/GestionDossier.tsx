import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, TextInput, useColorScheme, View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
//import ImagePicker from 'react-native-image-picker';
var ImagePicker = require('react-native-image-picker');


import { PatientNavigationProps } from '~models/types';

import { observer } from 'mobx-react';

//const GestionDossier = observer(({ route, navigation }: PatientNavigationProps) => {
export default class GestionDossier extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      resourcePath: {},
    };
  }

    takePhoto = () => {
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
          this.setState({
            filePath: source,
          });
        }
      });
    };


    upload = () => {
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
    };

    render(){
      return(        
        <View style={this.styles.buttonsView}>
            <Button
            title="prendre une photo"
            onPress={this.takePhoto.bind(this)}
            ></Button>

          <Button
            title="gallerie"
            onPress={this.upload.bind(this)}
            >
            </Button>
        </View>
    );
    }
    
    styles = StyleSheet.create({
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
    });

}



//export default GestionDossier;