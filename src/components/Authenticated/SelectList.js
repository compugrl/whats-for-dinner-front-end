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
import { AuthContext } from "../../context/AuthContext";
import { AddToList } from "../../helperFunctions/HandleShopping";

const SelectList = ({ items }) => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  let list = [];
  const size = 48;
  const [selected, setSelected] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const Separator = () => <View style={styles.separator} />;

  const onAdd = () => {
    setFoodList(list);
    console.log("Final List: ", list);
  };

  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <View style={styles.container}>
        <Text style={[styles.label]}>{item.food}</Text>
      </View>
    </TouchableOpacity>
  );

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
                    if (list.includes(item.food)) {
                      console.log("Item already in list");
                    } else {
                      list.push(item.food);
                    }
                  }}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          extraData={selected}
        />
        <View style={styles.item}>
          <TouchableOpacity onPress={onAdd} style={styles.button}>
            <Text style={styles.label}>Add to Shopping List</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Separator />
      <Text style={styles.item}>Items to Add</Text>
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
