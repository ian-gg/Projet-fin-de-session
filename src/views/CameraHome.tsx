import React, { useEffect, useState } from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";
import { useIsFocused } from "@react-navigation/core";

import { DrawerNavigationProps } from "~models/types";

import { CameraView } from "~components";

const CameraHome = ({ route, navigation }: DrawerNavigationProps) => {
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  if (cameraPermission == null) {
    return null;
  }

  const cameraAuthorized = cameraPermission === 'authorized';

  if (cameraAuthorized) {
    const isActive = useIsFocused();

    return (
      <CameraView
        isActive={isActive}
      />
    );
  } else {
    navigation.navigate('Patients', {
      screen: 'CameraPermissions'
    });

    return null;
  }
};

export default CameraHome;
