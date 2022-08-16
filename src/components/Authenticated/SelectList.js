import React, { useState, useContext } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { styles } from "../../../assets/styles";
import { AuthContext } from "../../context/AuthContext";

const SelectList = ({ items }) => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const size = 48;
  const [selectedId, setSelectedId] = useState(null);
  let list = [];
  let foodObj = {};
  const Separator = () => <View style={styles.separator} />;
  const kBaseUrl = `https://wfd-back-end.herokuapp.com/shopping_list`;

  function onAdd(list) {
    // //temp demo data
    // const foodList = [
    //   {
    //     food: "4 calamari tubes",
    //     id: "a4r2vakasocf1ramqxxzobdz3gir",
    //   },
    //   {
    //     food: "150 g rice vermicelli",
    //     id: "bkwbi4gbu7k75ha7ad8eralgwvlk",
    //   },
    // ];

    list.forEach(async (element) => {
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
      <View>
        <FlatList
          data={items}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemList}>
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
        <View>
          <TouchableOpacity onPress={onAdd(list)} style={styles.shopButton}>
            <Text style={styles.title}>Add to Shopping List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectList;
