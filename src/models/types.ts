import { NativeStackScreenProps } from '@react-navigation/native-stack';

type PatientStackParamList = {
  PatientList: undefined;
  PatientDetails: { patientId: number };
};

type PatientNavigationProps = NativeStackScreenProps<PatientStackParamList, 'PatientDetails'>;

export type {
  PatientNavigationProps,
};