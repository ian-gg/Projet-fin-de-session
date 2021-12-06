import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import { ProcedureNavigationProps } from '~models/types';

import { ProcedureStore } from '~stores';
import { ProcedureListEntry } from '~components';
import { observer } from 'mobx-react';

const procedureStore = new ProcedureStore();

const updateStore = async () => {
  await procedureStore.load();
};

const ProcedureList = observer(
  ({ route, navigation }: ProcedureNavigationProps) => {
    return (
      <SafeAreaView style={[{ flex: 1, padding: 5 }]}>
        <View style={styles.flatListView}>
          <FlatList
            data={procedureStore?.procedures}
            renderItem={item => {
              return (
                <ProcedureListEntry
                  index={item.index}
                  procedure={item.item}
                  navigation={navigation}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flatListView: {
    flexDirection: 'row',
    flex: 4,
  },
});

export default ProcedureList;
