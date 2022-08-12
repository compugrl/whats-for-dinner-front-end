import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import AddIngredient from "../Authenticated/AddIngredient";

const IngredientList = (ingredients) => {
  const [oldArr, setOldArr] = useState(ingredients);
  const [newArr, setNewArr] = useState([]);

  let obj = {};
  let arr = [];

  const fillArr = (oldArr) => {
    for (let i = 0; i < oldArr.length; i++) {
      obj.id = oldArr.index;
      obj.item = oldArr[i].food;
      arr.push(obj);
    }
    return arr;
  };
  const newList = fillArr(oldArr);
  setNewArr(newList);

  const Item = ({ item, index }) => (
    <View>
      <Text>id: {index}</Text>
      <Text>item: {item.food}</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Item item={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rList}>
        <FlatList
          data={newArr}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.key}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rList: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
    justifyContent: "flex-start",
  },
  item: {
    padding: 5,
    marginVertical: 5,
    width: 350,
    alignSelf: "center",
  },
  label: {
    textAlignVertical: "top",
    fontSize: 20,
    marginHorizontal: 5,
    width: 175,
  },
});

export default IngredientList;
