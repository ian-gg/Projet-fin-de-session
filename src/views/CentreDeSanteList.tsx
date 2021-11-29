import React from 'react';
import { FlatList, SafeAreaView, useColorScheme, StyleSheet, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { CentreDeSanteNavigationProps } from '~models/types';

import { CentreDeSanteStore } from '~stores';
import { CentreDeSanteListEntry } from '~components';
import { observer } from 'mobx-react';

const centreStore = new CentreDeSanteStore();

const updateStore = async () => {
  await centreStore.load();
};

const CentreDeSanteList = observer(({ route, navigation }: CentreDeSanteNavigationProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <View style={styles.flatListView}>
        <FlatList
          data={centreStore?.centres}
          renderItem={(item) => {
            return (
              <CentreDeSanteListEntry
                key={`centre-${item.item.id}`}
                index={item.index}
                centre={item.item}
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

export default CentreDeSanteList;
