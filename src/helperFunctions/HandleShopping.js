import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const kBaseUrl = `https://wfd-back-end.herokuapp.com/shopping_list`;
let completed = false;

const loadShoppingList = async (uid) => {
  const result = await axios(
    `https://wfd-back-end.herokuapp.com/shopping_list/${uid}/ingredients`
  );
  console.log(result);
  setShoppingData(result.data);

  return shoppingData;
};

function SetComplete({ id, uid, completed }) {
  const [toggle, SetToggle] = useState(completed);
  let iconName;
  const size = 48;
  iconName = toggle ? "ios-checkmark" : "ios-basket";

  const updateComplete = async (id) => {
    try {
      const response = await axios.patch(
        `${kBaseUrl}/${uid}/ingredient/${id}`,
        { completed: toggle }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const callSetComplete = () => {
    SetToggle(!toggle);
    updateComplete(id).then((complete) => {
      console.log(toggle);
    });
  };

  return (
    <View style={styles.buttonStyle}>
      <TouchableOpacity onPress={callSetComplete} title="Complete">
        <Ionicons name={iconName} size={size} color="#160F29" />
      </TouchableOpacity>
    </View>
  );
}

function DeleteIngredient({ id, uid }) {
  const [shoppingData, setShoppingData] = useState([]);
  let iconName;
  const size = 48;
  iconName = "ios-trash";

  const performDelete = async (id) => {
    try {
      const response = await axios.delete(`${kBaseUrl}/${id}`);
      loadShoppingList(uid);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = () => {
    performDelete(id).then((deleted) => {
      console.log(deleted);
    });
  };

  return (
    <View style={styles.buttonStyle}>
      <TouchableOpacity onPress={onDelete} title="Delete">
        <Ionicons name={iconName} size={size} color="#160F29" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: 50,
    height: 50,
    margin: 5,
    alignSelf: "auto",
  },
});

export { SetComplete, DeleteIngredient };
