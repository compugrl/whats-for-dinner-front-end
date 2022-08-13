import React, { useReducer, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const kBaseUrl = `https://wfd-back-end.herokuapp.com/shopping_list`;
let completed = false;

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
  const [, forceUpdate] = useState(0);

  const performDelete = async (id, uid) => {
    try {
      const response = await axios.delete(`${kBaseUrl}/${id}`);
      forceUpdate((n) => !n);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = () => {
    performDelete(id, uid).then((deleted) => {
      console.log(id, "deletion success");
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