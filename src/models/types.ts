import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type DrawerParamList = {
  Accueil: undefined;
  Patients: NavigatorScreenParams<PatientStackParamList>;
  Centres: NavigatorScreenParams<CentreDeSanteStackParamList>;
  Dossier: undefined;
  Diagnostics: NavigatorScreenParams<DiagnosticStackParamList>;
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

type DiagnosticStackParamList = {
  Diagnostics: undefined;
  DiagnosticList: undefined;
};

type DrawerNavigationProps = NativeStackScreenProps<DrawerParamList>;

type PatientNavigationProps = NativeStackScreenProps<PatientStackParamList, 'PatientDetails'>;
type CentreDeSanteNavigationProps = NativeStackScreenProps<CentreDeSanteStackParamList, 'CentreDeSanteDetails'>;
type DiagnosticNavigationProps = NativeStackScreenProps<DiagnosticStackParamList, 'Diagnostics'>;

export type {
  DrawerParamList,
  DrawerNavigationProps,
  PatientNavigationProps,
  CentreDeSanteNavigationProps,
  DiagnosticNavigationProps,
};
