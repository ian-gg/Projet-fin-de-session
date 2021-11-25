import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";

import { Camera, useCameraDevices } from "react-native-vision-camera";
import Reanimated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from "react-native-paper";

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

      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          width: '75%',
          height: 175,
          borderWidth: 2,
          borderColor: 'rgba(255, 255, 255, 0.75)',
        }}
      />

      <IconButton
        icon="camera"
        color="white"
        size={40}
        animated={true}
        style={[styles.captureButton, { bottom: insets.bottom + 15 }]}
        onPress={async () => {
          const photo = await camera.current?.takePhoto();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: 'white',
  }
});

export default CameraView;
