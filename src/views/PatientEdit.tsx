import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';

import { PatientNavigationProps } from '~models/types';

import { Patient } from '~models';
import { PatientService } from '~services';

const PatientEdit = observer(({ route, navigation }: PatientNavigationProps) => {
  const { patientId } = route.params;
  
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [noAssuranceMaladie, setNoAssuranceMaladie] = useState<string | undefined>("");
  const [expirationAnneeAssuranceMaladie, setExpirationAnneeAssuranceMaladie] = useState<number | undefined>();
  const [expirationMoisAssuranceMaladie, setExpirationMoisAssuranceMaladie] = useState<number | undefined>();
  const [dateNaissance, setDateNaissance] = useState<string | undefined>();
  const [sexe, setSexe] = useState<string | undefined>("");
  const [cellulaire, setCellulaire] = useState<string | undefined>("");
  
    useEffect(() => {
    const getPatient = async () => {
        let patient = await PatientService.get(patientId);
        setPatient(patient);
        setNoAssuranceMaladie(patient?.assurance_maladie);
        setExpirationAnneeAssuranceMaladie(patient?.assurance_maladie_exp_a);
        setExpirationMoisAssuranceMaladie(patient?.assurance_maladie_exp_m);
        setSexe(patient?.sexe);
        setDateNaissance(patient?.date_naissance.toString());
        setCellulaire(patient?.cellulaire);
    };
    getPatient();    
    }, [patientId]);

    function getPatientAge(birthdate : string|undefined){
        if(birthdate !== undefined){
            return (new Date().getFullYear() - new Date(birthdate).getFullYear()).toString();
        }
        else {
            return "";
        }
    }
  
    const noAssuranceMaladieHasErrors = () => {
        if(noAssuranceMaladie === undefined || noAssuranceMaladie.length != 12 || !isNaN(noAssuranceMaladie?.substring(0,4) as any))
        {
            return true
        }
        return false;
    };
    const expirationAnneeAssuranceMaladieHasErrors = () => {
        if(expirationAnneeAssuranceMaladie === undefined || isNaN(expirationAnneeAssuranceMaladie) || expirationAnneeAssuranceMaladie < 0)
        {
            return true
        }
        return false;
    };
    const expirationMoisAssuranceMaladieHasErrors = () => {
        if(expirationMoisAssuranceMaladie === undefined || isNaN(expirationMoisAssuranceMaladie) || 
           expirationMoisAssuranceMaladie > 12 || expirationMoisAssuranceMaladie < 1)
        {
            return true
        }
        return false;
    };
    const dateNaissanceHasErrors = () => {
        if(dateNaissance === undefined || isNaN(new Date(dateNaissance).getDate()))
        {
            return true
        }
        return false;
    };
    const sexeHasErrors = () => {
        if(sexe === undefined || sexe.length != 1 || !isNaN(parseInt(sexe)))
        {
            return true
        }
        return false;
    };
    const cellulaireHasErrors = () => {
        if(cellulaire === undefined || cellulaire.length != 12)
        {
            return true
        }
        return false;
    };
    const hasErrors = () => {
        if( noAssuranceMaladieHasErrors() || expirationAnneeAssuranceMaladieHasErrors() || expirationMoisAssuranceMaladieHasErrors() ||
            sexeHasErrors() || dateNaissanceHasErrors() || cellulaireHasErrors() )
        {
            return true;
        }
        return false;
    }

    async function saveModifications(){
        if(hasErrors()){
            Alert.alert("Erreur","Un ou plusieurs champs sont invalides. Vérifier qu'il n'y ait aucun champ en rouge."); 
        }
        else{        
            if(patient !== undefined){
                let patientModifie = patient;
                try {
                    patientModifie.assurance_maladie = noAssuranceMaladie ?? patientModifie.assurance_maladie;
                    patientModifie.assurance_maladie_exp_a = expirationAnneeAssuranceMaladie ?? patientModifie.assurance_maladie_exp_a;
                    patientModifie.assurance_maladie_exp_m = expirationMoisAssuranceMaladie ?? patientModifie.assurance_maladie_exp_m;
                    patientModifie.sexe = sexe ?? patientModifie.sexe;
                    if(dateNaissance !== undefined){
                        let date = new Date(Date.parse(dateNaissance))
                        patientModifie.date_naissance = date;
                    }
                    patientModifie.cellulaire = cellulaire ?? patientModifie.cellulaire;
                    console.log(patientModifie)
                    await PatientService.save(patientModifie);
                    Alert.alert("Succès","Les informations du patient ont été modifiées avec succès.");
                    navigation.goBack();
                }
                catch(e){
                    console.log(e);
                    Alert.alert("Erreur","Erreur lors de la modification des détails patient.");
                }
            }
        }
    }

  return (
    <SafeAreaView style={{ padding: 5 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ height: "100%" }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text>Patient Id : { patient?.id } | Centre de santé Id : { patient?.centre_de_sante.id }</Text>
          </View>
          <View style={{ flex: 11 }}>
            <View style={{ flexDirection: "row" }}>
                <TextInput
                    label={"Centre de santé :"}
                    value={patient?.centre_de_sante.nom}
                    mode={"outlined"}
                    disabled={true}
                    autoComplete="off"
                    style={[styles.textInput, {flex:1}]}
                />
            </View>
            <View style={{ flexDirection: "row" }}>
                <TextInput
                    label={"No. assurance maladie :"}
                    value={ noAssuranceMaladie }
                    onChangeText={text => setNoAssuranceMaladie(text)}
                    error={noAssuranceMaladieHasErrors()}
                    mode={"outlined"}
                    disabled={false}
                    autoComplete="off"
                    style={[styles.textInput, {flex:1}]}
                />
            </View>
            <View style={{flexDirection: "row"}}>
                <TextInput
                    label={"Annee d'expiration:"}
                    value={expirationAnneeAssuranceMaladie?.toString()}
                    onChangeText={text => setExpirationAnneeAssuranceMaladie( isNaN(parseInt(text)) ? 0 : parseInt(text) ) }
                    error={expirationAnneeAssuranceMaladieHasErrors()}
                    mode={"outlined"}
                    disabled={false}
                    autoComplete="off"
                    style={[styles.textInput, {flex:1}]}
                />
                <TextInput
                    label={"Mois d'expiration : "}
                    value={expirationMoisAssuranceMaladie?.toString()}
                    onChangeText={text => setExpirationMoisAssuranceMaladie( isNaN(parseInt(text)) ? 0 : parseInt(text) ) }
                    error={expirationMoisAssuranceMaladieHasErrors()}
                    mode={"outlined"}
                    disabled={false}
                    autoComplete="off"
                    style={[styles.textInput, {flex:1}]}
                /> 
            </View>
            <View style={{flexDirection: "row"}}>
                <TextInput
                    label={"Âge :"}
                    value={ getPatientAge(dateNaissance)}
                    mode={"outlined"}
                    disabled={true}
                    autoComplete="off"
                    style={[styles.textInput, {flex:1}]}
                />  
                <TextInput
                    label={"Sexe :"}
                    value={ sexe }
                    onChangeText={text => setSexe(text)}
                    error={sexeHasErrors()}
                    mode={"outlined"}
                    disabled={false}
                    autoComplete="off"
                    style={[styles.textInput, {flex:1}]}
                />  
            </View>
            <View style={{flexDirection: "row"}}>
                <TextInput
                    label={"Date de naissance (aaaa-mm-jj) :"}
                    value={ dateNaissance }
                    onChangeText={text => setDateNaissance(text)}
                    error={dateNaissanceHasErrors()}
                    mode={"outlined"}
                    disabled={false}
                    autoComplete="off"
                    style={[styles.textInput, {flex: 1}]}
                />  
            </View>
            <View style={{flexDirection: "row"}}>
                <TextInput
                    label={"Téléphone (###-###-####) :"}
                    value={ cellulaire }
                    onChangeText={text => setCellulaire(text)}
                    error={cellulaireHasErrors()}
                    mode={"outlined"}
                    disabled={false}
                    autoComplete="off"
                    style={[styles.textInput, {flex: 1}]}
                />  
            </View>
          </View>
          <View style={{flexDirection: "column", flex: 2}}>
            <Button
                mode="text"
                icon="content-save"
                onPress={() => saveModifications()}
                style={[styles.button, {flex: 1}]}
                contentStyle={{flexDirection: 'row-reverse'}}
                >
                <Text style={{fontSize: 10}}> Sauvegarder les modifications </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  patientEntry : {
    padding : 15
  },
  textInput : {
    textAlign: "center"
  },
  button : {
    textAlign: "center",
    justifyContent: "center"
  }
});

export default PatientEdit;
