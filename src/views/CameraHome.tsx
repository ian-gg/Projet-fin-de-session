import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";
import { Button } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

import { RootNavigationProps } from "~models/types";
import { CameraView } from "~components";

const CameraHome = ({ route, navigation }: RootNavigationProps) => {
  const isActive = useIsFocused();

  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();

  useEffect(() => {
    const onFocus = navigation.addListener('focus', async () => {
      Camera.getCameraPermissionStatus().then(setCameraPermission);
    });

    return onFocus;
  }, [navigation]);

  if (cameraPermission == null) {
    return null;
  }

  const cameraAuthorized = cameraPermission === 'authorized';

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
