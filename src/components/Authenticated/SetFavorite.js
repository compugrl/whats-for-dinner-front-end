import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const kBaseUrl = `https://wfd-back-end.herokuapp.com/ur`;

let newFave = "";

const setNewFave = async (id) => {
  id = 1;
  try {
    const response = await axios.get(`${kBaseUrl}/${id}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

function SetFavorite({ id }) {
  const [favorite, SetFavoriteStatus] = useState(false);
  let iconName;
  const size = 48;
  iconName = favorite ? "ios-happy" : "ios-heart";

  const callSetFave = () => {
    setNewFave().then((newFave) => {
      SetFavoriteStatus(!favorite);
    });
  };

  return (
    <View style={styles.buttonStyle}>
      <TouchableOpacity onPress={callSetFave} title="Favorite">
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

export default SetFavorite;
