import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import RNPermissions, {
  Permission,
  PERMISSIONS,
  PermissionStatus,
} from 'react-native-permissions';

import { MlkitOcrResult } from 'react-native-mlkit-ocr/src';

import { RootNavigationProps } from '~models/types';
import { CameraView, PatientOcrResultPreview } from '~components';

const { SIRI, ...PERMISSIONS_IOS } = PERMISSIONS.IOS;

const cameraPermission = Platform.select<Permission>({
  android: PERMISSIONS.ANDROID.CAMERA,
  ios: PERMISSIONS_IOS.CAMERA,
});

const CameraHome = ({ route, navigation }: RootNavigationProps) => {
  const isActive = useIsFocused();

  const [image, setImage] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<MlkitOcrResult | undefined>(undefined);

  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<PermissionStatus>('unavailable');

  useEffect(() => {
    const onFocus = navigation.addListener('focus', async () => {
      if (result) {
        setResult(undefined);
      }
      if (image) {
        setImage(undefined);
      }

      if (cameraPermission) {
        RNPermissions.check(cameraPermission).then(setCameraPermissionStatus);
      }
    });

    return onFocus;
  }, [navigation, image, result]);

  if (cameraPermissionStatus === 'unavailable') {
    return null;
  }

  const cameraAuthorized = cameraPermissionStatus === 'granted';

  if (cameraAuthorized) {
    if (result && result.length > 0) {
      return <PatientOcrResultPreview image={image} result={result} />;
    } else {
      return (
        <CameraView
          isActive={isActive}
          resultCallback={(res: { image: string; result: MlkitOcrResult }) => {
            setImage(res.image);
            setResult(res.result);
          }}
        />
      );
    }
  } else {
    return (
      <View style={styles.container}>
        <Text>L'application n'est pas autorisée à utiliser la caméra.</Text>
        <Button onPress={() => navigation.navigate('PermissionsManager')}>
          Modifier les permissions
        </Button>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraHome;
