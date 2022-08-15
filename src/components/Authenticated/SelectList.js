import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { AddToList } from "../../helperFunctions/HandleShopping";
import ShoppingList from "./ShoppingList";

const SelectList = ({ items }) => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const size = 48;
  const [selectedId, setSelectedId] = useState(null);
  let list = [];
  let foodObj = {};
  const Separator = () => <View style={styles.separator} />;

  function onAdd() {
    //temp demo data
    const kBaseUrl = `https://wfd-back-end.herokuapp.com/shopping_list`;
    const uid = "plfIcS8oVTPc83GfMWg6qlbcOAj1";
    const foodList = [
      {
        food: "4 calamari tubes",
        id: "a4r2vakasocf1ramqxxzobdz3gir",
      },
      {
        food: "150 g rice vermicelli",
        id: "bkwbi4gbu7k75ha7ad8eralgwvlk",
      },
    ];

    foodList.forEach(async (element) => {
      const requestBody = {
        ingredient: element.food,
        completed: false,
      };

      try {
        const response = await axios.post(`${kBaseUrl}/${uid}`, requestBody);
        return Alert.alert("Items added!");
      } catch (err) {
        console.log(err);
      }
    });
  }

  function Item({ item, onPress }) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <View style={styles.container}>
          <Text style={styles.label}>{item.food}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flist}>
        <FlatList
          data={items}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <Item
                  item={item}
                  onPress={function () {
                    foodObj = {
                      id: item.id,
                      food: item.food,
                    };
                    if (list.includes(foodObj)) {
                      console.log("Item already in list");
                    } else {
                      list.push(foodObj);
                    }
                  }}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.item}>
          <TouchableOpacity onPress={onAdd} style={styles.button}>
            <Text style={styles.label}>Add to Shopping List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  flist: {
    flex: 1,
    justifyContent: "space-around",
    alignContent: "space-around",
    alignItems: "flex-start",
  },
  alist: {
    flex: 0.2,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#246A73",
    width: "80%",
  },
  item: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#246A73",
  },
  label: {
    fontSize: 20,
    width: "80%",
    alignSelf: "center",
    color: "#F3DFC1",
  },
  separator: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
    width: "80%",
    borderBottomColor: "#246A73",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "center",
    color: "#160F29",
    backgroundColor: "#160F29",
  },
});

export default SelectList;
