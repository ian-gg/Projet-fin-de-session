import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

import { CentreDeSanteNavigationProps } from '~models/types';

import { CentreDeSante } from '~models';
import { CentreDeSanteService } from '~services';

import PatientListAccordion from '~components/PatientListAccordion';

const CentreDeSanteDetails = observer(
  ({ route, navigation }: CentreDeSanteNavigationProps) => {
    const { centreDeSanteId } = route.params;

    const [centreDeSante, setCentreDeSante] = useState<
      CentreDeSante | undefined
    >(undefined);

    useEffect(() => {
      const getCentreDeSante = async () => {
        setCentreDeSante(await CentreDeSanteService.get(centreDeSanteId));
      };

      getCentreDeSante();
    }, [centreDeSanteId]);

    return (
      <SafeAreaView style={{ padding: 5 }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text>CentreDeSante {centreDeSante?.id}</Text>
            <Text>Nom: {centreDeSante?.nom}</Text>

            <View
              style={{
                marginTop: 10,
              }}>
              <Text style={{ marginBottom: 5 }}>
                Nombre de patients: {centreDeSante?.patients.length || 0}
              </Text>
              <PatientListAccordion
                patients={centreDeSante?.patients}
                navigation={navigation}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  },
);

export default CentreDeSanteDetails;
