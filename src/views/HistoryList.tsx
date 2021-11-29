import React, {ClassAttributes, useEffect, useState} from 'react';
import { SafeAreaView, ScrollView, useColorScheme, View, StyleSheet, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DataTable } from 'react-native-paper';

import { PatientNavigationProps } from '~models/types';

import { Patient, Intervention, Diagnostic } from '~models';
import {InterventionService, PatientService, DiagnosticService} from '~services';

import { PatientStore, InterventionStore,  } from '~stores';


interface Props {
    patient : Patient
}

const HistoryList = (props : Props) : JSX.Element => {

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const {patient} = props;

    let diagnosticsList :  Diagnostic[];
    let interventions = patient;

    // get Diagnotic element from Intervention table
    const getDiagnosticFromInterventions = async  () => {

        for(let intervention of patient.interventions) {
            //search diagnotic from table
            let d = await DiagnosticService.get(intervention.diagnostic.id);

            if(d != undefined){
                diagnosticsList.push(d);
            }
        }
    }

    useEffect(() => {
        getDiagnosticFromInterventions();
    }, [props]);

    return (
        <SafeAreaView style={backgroundStyle}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Nom Intervention</DataTable.Title>
                            <DataTable.Title>Procédures liées</DataTable.Title>
                            <DataTable.Title>Date Debut</DataTable.Title>
                            <DataTable.Title>Date Fin</DataTable.Title>
                            <DataTable.Title>Commentaire</DataTable.Title>
                        </DataTable.Header>

                        {/*doesn't work*/}
                        for(let i = 0; i < interventions.length; i++) {

                        <DataTable.Row>
                        <DataTable.Cell>interventions[i].nom</DataTable.Cell>
                            <DataTable.Cell>diagnostics</DataTable.Cell>
                            <DataTable.Cell>interventions[i].date_debut</DataTable.Cell>
                        <DataTable.Cell>interventions[i].date_fin</DataTable.Cell>
                            <DataTable.Cell>interventions[i].commentaire</DataTable.Cell>
                        </DataTable.Row>
                    }

                    </DataTable>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    patientEntry : {
        padding : 15
    }
});

export default HistoryList;
