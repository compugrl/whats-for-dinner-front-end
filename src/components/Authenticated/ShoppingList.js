import React, { useState, useEffect, useContext } from "react";
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
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import {
  SetComplete,
  DeleteIngredient,
} from "../../helperFunctions/HandleShopping";
import { AuthContext } from "../../context/AuthContext";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <View style={styles.container}>
      <ImageBackground source={{ uri: item.imageUrl }} style={styles.img} />
      <Text style={[styles.label, textColor]}>{item.ingredient}</Text>
      <SetComplete id={item.id} uid={item.uid} completed={item.completed} />
      <DeleteIngredient id={item.id} />
    </View>
  </TouchableOpacity>
);

const ShoppingList = () => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  let iconName;
  const size = 48;
  const [shoppingData, setShoppingData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const loadShoppingList = async () => {
      const result = await axios(
        `https://wfd-back-end.herokuapp.com/shopping_list/${uid}/ingredients`
      );
      console.log(result);
      setShoppingData(result.data);
    };
    loadShoppingList();
  }, []);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#368F8B" : "#246A73";
    const color = item.id === selectedId ? "#246A73" : "#F3DFC1";
    iconName = item.completed ? "ios-checkmark" : "ios-basket";

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
        data={shoppingData}
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
    width: 175,
  },
  addView: {
    flex: "0.25",
    flexDirection: "row",
    backgroundColor: "#160F29",
    color: "#F3DFC1",
    width: 350,
    alignSelf: "center",
  },
  input: {
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    textAlign: "center",
    color: "#246A73",
    width: 250,
    height: 35,
    margin: 10,
    fontSize: 20,
  },
});

export default ShoppingList;
