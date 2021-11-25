import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";
import { Button } from "react-native-paper";
import { Text, View } from "react-native";

import { CameraNavigationProps } from "~models/types";
import { CameraView } from "~components";

const CameraHome = ({ route, navigation }: CameraNavigationProps) => {
  const isActive = useIsFocused();

  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  if (cameraPermission == null) {
    return null;
  }

  const cameraAuthorized = cameraPermission === 'authorized';
  console.log(cameraAuthorized);

  if (cameraAuthorized) {
    return (
      <CameraView
        isActive={isActive}
      />
    );
  } else {
    return (
      <View>
        <Text>L'application n'est pas autorisée à utiliser la caméra.</Text>
        <Button
          onPress={() => navigation.navigate('CameraPermissions')}
        >
          Modifier les permissions
        </Button>
      </View>
    );
  }
};

export default CameraHome;
