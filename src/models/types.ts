import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Patient } from '~models';

type RootStackParamList = {
  Root: NavigatorScreenParams<DrawerParamList>;
  Camera: NavigatorScreenParams<CameraNavigationProps>;
  PermissionsManager: undefined;
};

type DrawerParamList = {
  Accueil: undefined;
  Patients: NavigatorScreenParams<PatientStackParamList>;
  Centres: NavigatorScreenParams<CentreDeSanteStackParamList>;
  Dossier: DossierStackParamList;
  Diagnostics: NavigatorScreenParams<DiagnosticStackParamList>;
  Procedures: NavigatorScreenParams<ProcedureStackParamList>;

  Camera: NavigatorScreenParams<CameraStackParamList>;
};

type PatientDetailsProps = {
  patientId: number;
};

type PatientEditProps = {
  patient: Patient;
};

type PatientStackParamList = {
  Patients: undefined;
  PatientList: undefined;
  PatientDetails: PatientDetailsProps;
  PatientEdit: PatientEditProps;
  HistoryList: PatientDetailsProps;
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

type ProcedureStackParamList = {
  Procedures: undefined;
  ProcedureList: undefined;
};

type CameraStackParamList = {
  Camera: undefined;
  CameraHome: undefined;
};

type DossierStackParamList = {
  PatientDetails: PatientDetailsProps;
};

type RootNavigationProps = NativeStackScreenProps<RootStackParamList>;
type DrawerNavigationProps = NativeStackScreenProps<DrawerParamList>;

type PatientNavigationProps = NativeStackScreenProps<
  PatientStackParamList,
  'PatientDetails'
>;
type CentreDeSanteNavigationProps = NativeStackScreenProps<
  CentreDeSanteStackParamList,
  'CentreDeSanteDetails'
>;
type DiagnosticNavigationProps = NativeStackScreenProps<
  DiagnosticStackParamList,
  'Diagnostics'
>;
type ProcedureNavigationProps = NativeStackScreenProps<
  ProcedureStackParamList,
  'Procedures'
>;
type CameraNavigationProps = NativeStackScreenProps<
  CameraStackParamList,
  'CameraHome'
>;
type DossierNavigationProps = NativeStackScreenProps<
  DossierStackParamList,
  'PatientDetails'
>;

export type {
  RootNavigationProps,
  DrawerParamList,
  DrawerNavigationProps,
  PatientNavigationProps,
  CentreDeSanteNavigationProps,
  DiagnosticNavigationProps,
  ProcedureNavigationProps,
  CameraNavigationProps,
  DossierNavigationProps,
};
