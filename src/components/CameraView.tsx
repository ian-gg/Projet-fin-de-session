import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";

import { Camera, useCameraDevices } from "react-native-vision-camera";
import Reanimated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from "react-native-paper";

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const CameraView = (props: {
  isActive: boolean,
}) => {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {device != null && (
        <ReanimatedCamera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={props.isActive}
          photo={true}
          audio={false}
        />
      )}

      <Button
        icon="camera"
        mode="outlined"
        children={null}
        style={[
          styles.captureButton,
          {
            bottom: insets.bottom + 15,
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
  }
});

export default CameraView;
