import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, TextInput, useColorScheme, View, Button, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { PatientNavigationProps } from '~models/types';

import { CentreDeSanteStore } from '~stores';
import { CentreDeSanteListEntry } from '~components';
import { observer } from 'mobx-react';

const centreStore = new CentreDeSanteStore();

const updateStore = async () => {
  await centreStore.load();
};

const CentreDeSanteList = observer(({ route, navigation }: PatientNavigationProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <FlatList
        data={centreStore?.centres}
        renderItem={(item) => CentreDeSanteListEntry(item.index, item.item, navigation)}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonsView : {
    flexDirection: "row", 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "space-between"
  },
  flatListView : {
    flexDirection: "row", 
    flex: 4
  }
});

export default CentreDeSanteList;
