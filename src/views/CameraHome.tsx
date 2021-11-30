import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { Platform, StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper';

import RNPermissions, {
  Permission,
  PERMISSIONS,
  PermissionStatus,
} from 'react-native-permissions';

import { RootNavigationProps } from "~models/types";
import { CameraView } from "~components";

const {SIRI, ...PERMISSIONS_IOS} = PERMISSIONS.IOS;

const cameraPermission = Platform.select<Permission>({
  android: PERMISSIONS.ANDROID.CAMERA,
  ios: PERMISSIONS_IOS.CAMERA,
});

const CameraHome = ({ route, navigation }: RootNavigationProps) => {
  const isActive = useIsFocused();

  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<PermissionStatus>('unavailable');

  useEffect(() => {
    const onFocus = navigation.addListener('focus', async () => {
      if (cameraPermission) {
        RNPermissions.check(cameraPermission).then(setCameraPermissionStatus);
      }
    });

    return onFocus;
  }, [navigation]);

  if (cameraPermissionStatus == 'unavailable') {
    return null;
  }

  const cameraAuthorized = cameraPermissionStatus === 'granted';

  if (cameraAuthorized) {
    return (
      <CameraView
        isActive={isActive}
      />
    );
  } else {
    return (
      <View style={styles.permissionsContainer}>
        <Text>L'application n'est pas autorisée à utiliser la caméra.</Text>
        <Button
          onPress={() => navigation.navigate('PermissionsManager')}
        >
          Modifier les permissions
        </Button>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  permissionsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default CameraHome;
