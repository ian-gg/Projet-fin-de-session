import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type DrawerParamList = {
  Accueil: undefined;
  Centres: NavigatorScreenParams<CentreDeSanteStackParamList>;
  Patients: NavigatorScreenParams<PatientStackParamList>;
  Dossier: undefined;
};

type PatientDetailsProps = {
  patientId: number;
};

type PatientStackParamList = {
  Patients: undefined;
  PatientList: undefined;
  PatientDetails: PatientDetailsProps;
};

type CentreDeSanteStackParamList = {
  Centres: undefined;
  CentreDeSanteList: undefined;
  CentreDeSanteDetails: { centreDeSanteId: number };
  PatientDetails: PatientDetailsProps;
};

type PatientNavigationProps = NativeStackScreenProps<PatientStackParamList, 'Patients'>;
type CentreDeSanteNavigationProps = NativeStackScreenProps<CentreDeSanteStackParamList, 'Centres'>;

export type {
  DrawerParamList,
  PatientNavigationProps,
  CentreDeSanteNavigationProps,
};
