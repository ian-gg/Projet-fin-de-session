import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import { DiagnosticNavigationProps } from '~models/types';

import { DiagnosticStore } from '~stores';
import { DiagnosticListEntry } from '~components';
import { observer } from 'mobx-react';

const diagnosticStore = new DiagnosticStore();

const updateStore = async () => {
  await diagnosticStore.load();
};

const DiagnosticList = observer(({ route, navigation }: DiagnosticNavigationProps) => {
  return (
    <SafeAreaView style={[{ flex: 1, padding: 5 }]}>
      <View style={styles.flatListView}>
        <FlatList
          data={diagnosticStore?.diagnostics}
          renderItem={(item) => {
            return (
              <DiagnosticListEntry
                index={item.index}
                diagnostic={item.item}
                navigation={navigation}
              />
            );
          }}
        />
      </View>
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

export default DiagnosticList;
