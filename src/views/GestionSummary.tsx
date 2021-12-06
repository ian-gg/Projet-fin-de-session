import React, { useEffect, useState } from 'react';

import { SafeAreaView, View } from 'react-native';
import { Text } from 'react-native-paper';

import { PatientNavigationProps } from '~models/types';

import {
  CentreDeSanteService,
  PatientService,
  DiagnosticService,
  InterventionService,
  ProcedureService,
} from '~services';

const GestionSummary = ({ route, navigation }: PatientNavigationProps) => {
  const [centresCount, setCentresCount] = useState<number>(0);
  const [patientsCount, setPatientsCount] = useState<number>(0);
  const [diagnosticsCount, setDiagnosticsCount] = useState<number>(0);
  const [interventionsCount, setInterventionsCount] = useState<number>(0);
  const [proceduresCount, setProceduresCount] = useState<number>(0);

  useEffect(() => {
    const setCounts = navigation.addListener('focus', async () => {
      setCentresCount(await CentreDeSanteService.count());
      setPatientsCount(await PatientService.count());
      setDiagnosticsCount(await DiagnosticService.count());
      setInterventionsCount(await InterventionService.count());
      setProceduresCount(await ProcedureService.count());
    });

    return setCounts;
  }, [navigation]);

  return (
    <SafeAreaView style={[{ flex: 1, padding: 5 }]}>
      <View>
        <Text>Centres de Santé: {centresCount}</Text>
        <Text>Nombre de patients: {patientsCount}</Text>
        <Text>Nombre de diagnostics: {diagnosticsCount}</Text>
        <Text>Nombre d'interventions: {interventionsCount}</Text>
        <Text>Nombre de procédures: {proceduresCount}</Text>
      </View>
    </SafeAreaView>
  );
};

export default GestionSummary;
