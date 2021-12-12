import { observer } from 'mobx-react';
import React, { ClassAttributes, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DataTable } from 'react-native-paper';
import RNPhotoManipulator from 'react-native-photo-manipulator';

import { FileNavigationProps, PatientNavigationProps } from '~models/types';

import { Patient, Fichier } from '~models';
import {
  PatientService,
  FichierService,
} from '~services';

import { PatientStore, FichierStore } from '~stores';

import {
    ImagePickerResponse,
    launchImageLibrary,
} from 'react-native-image-picker';

const FileList = observer(
  ({ route, navigation }: PatientNavigationProps) => {
    const { patientId } = route.params;
    const [patient, setPatient] = useState<Patient | undefined>(undefined);

    const { height: winH, width: winW } = useWindowDimensions();

    useEffect(() => {
      const getPatient = async () => {
        setPatient(await PatientService.get(patientId));
      };
      getPatient();
    }, [patientId]);

       
  
    function upload() {
        launchImageLibrary(
          {
            mediaType: 'photo',
          },
          async (response: ImagePickerResponse) => {
            if (response && response.assets && response.assets.length > 0) {
                const url = response.assets[0].uri;
                console.log(url);
                let fichier = await FichierService.create({
                  patient: patient,
                  lien_ressource: url,
                });

                await FichierService.save(fichier);

            }
          },
        );
    }

    function renderImage(){
      
      const imageView = [0, 1].map(data => (
        <Image
          style={styles.images}
          source={{uri: "file:///storage/emulated/0/Download/img8.jpg"}}
        />
      )); 
      return imageView;

    }
    
    return (
      <SafeAreaView style={{ padding: 5, margin: 5 }}>
        <Button
          onPress={() => {
            upload();
          }}
          title="Ajout d'un fichier"
          style={styles.button}>
        </Button>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View>{renderImage()}</View>
        </ScrollView>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  patientEntry: {
    padding: 15,
  },
  images: {
    width: 150,
    height: 150,
    resizeMode: "contain"
  },
  scrollView: {
    margin: 10,
  }
});

export default FileList;