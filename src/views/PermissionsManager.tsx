import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { Button, Text } from "react-native-paper";

import RNPermissions, {
  Permission,
  PERMISSIONS,
  PermissionStatus,
} from 'react-native-permissions';

import { PatientNavigationProps } from "~models/types";

/// Source: https://github.com/zoontek/react-native-permissions/blob/master/example/App.tsx
const {SIRI, ...PERMISSIONS_IOS} = PERMISSIONS.IOS;

const cameraPermission = Platform.select<Permission>({
  android: PERMISSIONS.ANDROID.CAMERA,
  ios: PERMISSIONS_IOS.CAMERA,
});

const readStoragePermission = Platform.select({
  android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  ios: PERMISSIONS_IOS.PHOTO_LIBRARY,
});

const writeStoragePermission = Platform.select({
  android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ios: PERMISSIONS_IOS.PHOTO_LIBRARY_ADD_ONLY,
});

const PermissionsString = {
  unavailable: 'Non disponible',
  blocked: 'Bloqué',
  denied: 'Refusé',
  granted: 'Accordé',
  limited: 'Limité'
}

const PermissionsManager = ({ route, navigation }: PatientNavigationProps) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<PermissionStatus>('unavailable');
  const [readPermissionStatus, setReadPermissionStatus] = useState<PermissionStatus>('unavailable');
  const [writePermissionStatus, setWritePermissionStatus] = useState<PermissionStatus>('unavailable');

  useEffect(() => {
    const setCurrentStatuses = async () => {
      if (cameraPermission) {
        RNPermissions.check(cameraPermission).then(setCameraPermissionStatus);
      }

      if (readStoragePermission) {
        RNPermissions.check(readStoragePermission).then(setReadPermissionStatus);
      }

      if (writeStoragePermission) {
        RNPermissions.check(writeStoragePermission).then(setWritePermissionStatus);
      }
    }

    const onFocus = navigation.addListener('focus', () => {
      setCurrentStatuses();
    });
    
    return onFocus;
  }, [navigation]);

  return (
    <View style={{ flex: 1, flexDirection: 'column', margin: 10 } }>
      <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 15 }}>Permission Caméra:</Text>
        {cameraPermission && cameraPermissionStatus !== 'granted' && (
          <Button
            icon='check-circle'
            mode='contained'
            color='green'
            onPress={() => RNPermissions.request(cameraPermission).then(setCameraPermissionStatus)}
          >
            Accorder
          </Button>
        )}
        {cameraPermissionStatus === 'granted' && (
          <Text>{ PermissionsString[cameraPermissionStatus] }</Text>
        )}
      </View>
      <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 15 }}>Permission lecture fichiers:</Text>
        {readStoragePermission && readPermissionStatus !== 'granted' && (
          <Button
            icon='check-circle'
            mode='contained'
            color='green'
            onPress={() => RNPermissions.request(readStoragePermission).then(setReadPermissionStatus)}
          >
            Accorder
          </Button>
        )}
        {readPermissionStatus === 'granted' && (
          <Text>{ PermissionsString[readPermissionStatus] }</Text>
        )}
      </View>
      <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 15 }}>Permission écriture fichiers:</Text>
        {writeStoragePermission && writePermissionStatus !== 'granted' && (
          <Button
            icon='check-circle'
            mode='contained'
            color='green'
            onPress={() => RNPermissions.request(writeStoragePermission).then(setWritePermissionStatus)}
          >
            Accorder
          </Button>
        )}
        {writePermissionStatus === 'granted' && (
          <Text>{ PermissionsString[writePermissionStatus] }</Text>
        )}
      </View>
    </View>
  );
};

export default PermissionsManager;
