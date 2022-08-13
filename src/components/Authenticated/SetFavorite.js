import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const kBaseUrl = `https://wfd-back-end.herokuapp.com`;

let newFave = "";

function SetFavorite({ rhash, shareAs, label, imageUrl }) {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const [favorite, SetFavoriteStatus] = useState(false);
  const [id, setId] = useState(null);
  let iconName;
  const size = 48;
  iconName = favorite ? "star" : "star-outline";

  const addRecipe = async (rhash, shareAs, label, imageUrl) => {
    try {
      let requestBody = {
        rhash: rhash,
        label: label,
        shareAs: shareAs,
        image_url: imageUrl,
      };

      const res1 = await axios.post(`${kBaseUrl}/recipes`, requestBody);
      return res1;
    } catch (err) {
      console.log(err);
    }
  };

  const addUR = async (rhash, uid) => {
    try {
      const requestBody = {
        rhash: rhash,
        uid: uid,
      };
      const res2 = await axios.post(`${kBaseUrl}/ur`, requestBody);
      console.log("Res 2: ", res2);
      setId(res2.data.user_recipe.id);
      console.log(id);
      return res2;
    } catch (err) {
      console.log(err);
    }
  };

  const setNewFave = async (rhash, shareAs, label, imageUrl, uid) => {
    addRecipe(rhash, shareAs, label, imageUrl);
    addUR(rhash, uid);

    try {
      const res3 = await axios.get(`${kBaseUrl}/ur/${id}`);
      return res3;
    } catch (err) {
      console.log(err);
    }
  };

  const onSetFave = () => {
    setNewFave(rhash, shareAs, label, imageUrl, uid).then((newFave) => {
      SetFavoriteStatus(!favorite);
    });
  };

  return (
    <View style={styles.buttonStyle}>
      <TouchableOpacity onPress={onSetFave} title="Favorite">
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
