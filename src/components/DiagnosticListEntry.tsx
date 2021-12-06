import React from 'react';
import { StyleSheet } from 'react-native';
import { Diagnostic } from '~models';

import { List } from 'react-native-paper';

const DiagnosticListEntry = (props: {
  index: number;
  diagnostic: Diagnostic;
  navigation: any;
}) => {
  const { diagnostic } = props;

  return (
    <List.Item
      title={`${diagnostic.etiquette} - ${diagnostic.description}`}
      description={`Nombre d'interventions: ${diagnostic.interventions?.length}`}
      style={[styles.diagnosticEntry]}
    />
  );
};

const styles = StyleSheet.create({
  diagnosticEntry: {},
});

export default DiagnosticListEntry;
