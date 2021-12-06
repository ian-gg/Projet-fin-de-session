import React from 'react';
import { StyleSheet } from 'react-native';
import { Procedure } from '~models';

import { List } from 'react-native-paper';

const ProcedureListEntry = (props: {
  index: number;
  procedure: Procedure;
  navigation: any;
}) => {
  const { procedure } = props;

  return (
    <List.Item
      title={`${procedure.code} - ${procedure.description}`}
      description={`Occurence dans les interventions: ${procedure.intervention_procedures?.length}`}
      style={[styles.procedureEntry]}
    />
  );
};

const styles = StyleSheet.create({
  procedureEntry: {},
});

export default ProcedureListEntry;
