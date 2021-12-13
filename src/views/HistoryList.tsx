import { observer } from 'mobx-react';
import React, { ClassAttributes, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DataTable } from 'react-native-paper';

import { PatientNavigationProps } from '~models/types';


import { Patient, Intervention, Diagnostic } from '~models';
import { InterventionProcedureService, PatientService } from '~services';

class History {
    name: string;
    commentaire: string;
    diagnostic: Diagnostic;
    dateDebut: Date;
    dateFin: Date;
    procedures: string;
    nomsFichier: string
}

const HistoryList = observer(
  ({ route, navigation }: PatientNavigationProps) => {
    const { patientId } = route.params;
    const [patient, setPatient] = useState<Patient | undefined>(undefined);
    const [interventions, setInterventions] = useState<Intervention[] | undefined>(undefined);

    let data = new Array<History>();

    const getPatient = async () => {
        setPatient(await PatientService.get(patientId));
    };

    const initVariables = async () => {
        let folders = [];

        if (patient !== undefined) {
            setInterventions(patient.interventions);
        }
    };

    const setData = async () => {

        if (interventions !== undefined) {
            for (let intervention of interventions) {
                let fichiers = '';

                intervention.fichiers.map(d => {
                    if (!fichiers.includes(d.id.toString()))
                        fichiers += d.id + '\n';
                })

                let interventionsProcedures = await InterventionProcedureService.forIntervention(intervention);

                let procedures = '';
                interventionsProcedures.map(p => {
                    procedures += p.procedure.id + ' - ' + p.procedure.description ? p.procedure.description : '' + '\n';
                })

                data.push({
                    name: 'intervention ' + intervention.id,
                    commentaire: intervention.commentaire ? intervention.commentaire : '',
                    diagnostic: intervention.diagnostic,
                    dateDebut: intervention.date_debut,
                    dateFin: intervention.date_fin,
                    procedures: procedures,
                    nomsFichier: fichiers

                })
            }
        }

    }

    // first we take all the ressources of the patient's folders and we also get the ids of these folders
    useEffect(() => {

        getPatient;
        initVariables;
        setData;

    }, [patientId]);

    function renderDataTable() {
        return (
            <DataTable>

            <DataTable.Header>
                <DataTable.Title>Numero Intervention</DataTable.Title>
                <DataTable.Title>Diagnotics</DataTable.Title>
                <DataTable.Title>Procédures liées</DataTable.Title>
                <DataTable.Title>Date Debut</DataTable.Title>
                <DataTable.Title>Date Fin</DataTable.Title>
                <DataTable.Title>Commentaire</DataTable.Title>
            </DataTable.Header>


            {data?.map(d => (
                <DataTable.Row>
                    <DataTable.Cell>{d.name}</DataTable.Cell>
                    <DataTable.Cell>{d.diagnostic.id + ' - ' + d.diagnostic.description}</DataTable.Cell>
                    <DataTable.Cell>{d.procedures}</DataTable.Cell>
                    <DataTable.Cell>{d.dateDebut}</DataTable.Cell>
                    <DataTable.Cell>{d.dateFin}</DataTable.Cell>
                    <DataTable.Cell>{d.commentaire}</DataTable.Cell>
                </DataTable.Row>
            ))}


        </DataTable>
        )
    }

    return (
      <SafeAreaView style={{ padding: 5 }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>{renderDataTable()}</View>
        </ScrollView>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  patientEntry: {
    padding: 15,
  },
});

export default HistoryList;
