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
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DataTable } from 'react-native-paper';

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

                let fichier = await FichierService.create({
                  patient: patient,
                  lien_ressource: url,
                });

                await FichierService.save(fichier);

            }
          },
        );
    }

    function openImage(url: string){
      
    }
    
    function renderImageList() {
        
      return (
        <View>
          <TouchableOpacity onPress={()=>openImage("../resources/hospital.jpg")}>
            <Image
              style={styles.images}
              source={require("../resources/hospital.jpg")}
            />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <SafeAreaView style={{ padding: 5 }}>
        <Button
          onPress={() => {
            upload();
          }}
          title="Ajout d'un fichier">
        </Button>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>{renderImageList()}</View>
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
    width: 100,
    height: 100,
  },
});

export default FileList;