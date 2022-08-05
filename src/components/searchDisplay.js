import React, { useState } from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Sharing from "./sharing";
import SetFavorite from "./setFavorite";

const recipes = require("../../data/searchData.json");

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <ImageBackground source={{ uri: item.imageUrl }} style={styles.img} />
    <Text style={[styles.label, textColor]}>{item.label}</Text>
    <View style={styles.container}>
      <Sharing url={item.shareAs} title={item.label} />
      <SetFavorite id={item.id} />
    </View>
  </TouchableOpacity>
);

const SearchDisplay = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#368F8B" : "#246A73";
    const color = item.id === selectedId ? "#246A73" : "#F3DFC1";

    return (
      <View style={styles.container}>
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
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
    width: 350,
    alignSelf: "center",
  },
  label: {
    fontSize: 20,
    margin: 10,
  },
});

export default SearchDisplay;
