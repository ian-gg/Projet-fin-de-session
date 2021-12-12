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
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DataTable } from 'react-native-paper';

import { FileNavigationProps, PatientNavigationProps } from '~models/types';

import { Patient, Intervention, Diagnostic } from '~models';
import {
  InterventionService,
  PatientService,
  DiagnosticService,
} from '~services';

import { PatientStore, InterventionStore } from '~stores';

import {
    ImagePickerResponse,
    launchImageLibrary,
} from 'react-native-image-picker';

const FileList = observer(
  ({ route, navigation }: PatientNavigationProps) => {
    const { patientId } = route.params;
    const [patient, setPatient] = useState<Patient | undefined>(undefined);

    const urlFake = [
        "file:///data/data/com.gestionpatients/cache/rn_image_picker_lib_temp_04a1c0c2-d378-4d48-8af2-854a1a3e6197.jpg",
        "file:///data/data/com.gestionpatients/cache/rn_image_picker_lib_temp_b8b0c398-7dad-407b-8279-340520a288eb.jpg",
        "file:///data/data/com.gestionpatients/cache/rn_image_picker_lib_temp_69649a6f-efc6-447f-a2b9-aa5ac05793f2.jpg",
    ]

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
            includeBase64: true,
          },
          async (response: ImagePickerResponse) => {
            if (response && response.assets && response.assets.length > 0) {
                const url = response.assets[0].uri;
                console.log(url);
                console.log(response.assets[0].fileName);
            }
          },
        );
    }
    
    function renderImageList() {
        
      return (
        <View>
          <Text>Yo</Text>
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
  logo: {
    width: 300,
    height: 300,
  },
});

export default FileList;