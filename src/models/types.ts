import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type DrawerParamList = {
  Accueil: undefined;
  Patients: NavigatorScreenParams<PatientStackParamList>;
  Centres: NavigatorScreenParams<CentreDeSanteStackParamList>;
  Dossier: undefined;
  Diagnostics: NavigatorScreenParams<DiagnosticStackParamList>;
  Procedures: NavigatorScreenParams<ProcedureStackParamList>;
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

type ProcedureStackParamList = {
  Procedures: undefined;
  ProcedureList: undefined;
};

type DrawerNavigationProps = NativeStackScreenProps<DrawerParamList>;

type PatientNavigationProps = NativeStackScreenProps<PatientStackParamList, 'Patients'>;
type CentreDeSanteNavigationProps = NativeStackScreenProps<CentreDeSanteStackParamList, 'Centres'>;
type DiagnosticNavigationProps = NativeStackScreenProps<DiagnosticStackParamList, 'Diagnostics'>;
type ProcedureNavigationProps = NativeStackScreenProps<ProcedureStackParamList, 'Procedures'>;

export type {
  DrawerParamList,
  DrawerNavigationProps,
  PatientNavigationProps,
  CentreDeSanteNavigationProps,
  DiagnosticNavigationProps,
  ProcedureNavigationProps,
};
