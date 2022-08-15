import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Sharing from "./Sharing";
import SetFavorite from "./SetFavorite";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.label, textColor]}>{item.label}</Text>
    <View style={styles.container}>
      <Sharing url={item.shareAs} title={item.label} />
      <SetFavorite rhash={item.rhash} />
    </View>
  </TouchableOpacity>
);

const SearchDisplay = (searchObj) => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    const backgroundColor = item.rhash === selectedId ? "#368F8B" : "#246A73";
    const color = item.rhash === selectedId ? "#246A73" : "#F3DFC1";

    return (
      <View style={styles.container}>
        <Item
          item={item}
          onPress={() => setSelectedId(item.rhash)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={searchObj}
        renderItem={renderItem}
        keyExtractor={(item) => item.rhash}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 10,
    marginVertical: 5,
    marginLeft: 10,
    width: 350,
    alignSelf: "center",
  },
  label: {
    fontSize: 20,
    margin: 10,
  },
});

export default SearchDisplay;
