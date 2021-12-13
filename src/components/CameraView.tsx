import React, { useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Reanimated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, IconButton, Text } from 'react-native-paper';

import MlkitOcr from 'react-native-mlkit-ocr';
import RNPhotoManipulator from 'react-native-photo-manipulator';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const CameraView = (props: { isActive: boolean; resultCallback: Function }) => {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const insets = useSafeAreaInsets();

  const { height: winH, width: winW } = useWindowDimensions();

  const [processing, setProcessing] = useState<boolean>(false);

  const { resultCallback } = props;

  if (processing) {
    return (
      <View style={styles.processingContainer}>
        <ActivityIndicator style={{ marginRight: 5 }} />
        <Text>Traitement de la photo...</Text>
      </View>
    );
  }

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

      <View style={styles.cameraOverlay} />

      <IconButton
        icon="camera"
        color="white"
        size={40}
        animated={true}
        style={[styles.captureButton, { bottom: insets.bottom + 15 }]}
        disabled={processing}
        onPress={async () => {
          setProcessing(true);

          const photo = await camera.current?.takePhoto();

          if (photo && photo.path) {
            const imgW = photo.width;
            const imgH = photo.height;

            // Inverted because non rotated
            const scaledW = Math.round(0.85 * imgH);
            const scaledH = Math.round((175 / winH) * imgW);

            const origPath = `file://${photo.path}`;

            const cropRegion = {
              x: Math.round(imgW / 2) - Math.round(scaledW / 4),
              y: Math.round(imgH / 2) - scaledH,
              width: scaledH,
              height: scaledW,
            };

            const croppedImagePath = await RNPhotoManipulator.crop(
              origPath,
              cropRegion,
            );

            resultCallback({
              image: croppedImagePath,
              result: await MlkitOcr.detectFromUri(croppedImagePath),
            });
          }

          setProcessing(false);
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
  },
  cameraOverlay: {
    position: 'absolute',
    alignSelf: 'center',
    width: '85%',
    height: 175,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
  processingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default CameraView;
