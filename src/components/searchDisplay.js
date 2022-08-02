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
import Sharing from "./sharing";
import "../../data/response.json";

const recipes = require("../../data/response.json");

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.label, textColor]}>{item.label}</Text>
  </TouchableOpacity>
);

const SearchDisplay = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#C2DED1" : "#354259";
    const color = item.id === selectedId ? "#354259" : "#ECE5C7";

    return (
      <View style={styles.container}>
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
        <Sharing url={item.shareAs} title={item.label} />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    flexDirection: "row",
  },
  item: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    width: 250,
  },
  label: {
    fontSize: 18,
  },
});

export default SearchDisplay;
