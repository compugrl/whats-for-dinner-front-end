import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const kBaseUrl = `https://wfd-back-end.herokuapp.com`;

function SetFavorite({ rhash, label, shareAs }) {
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const [favorite, SetFavoriteStatus] = useState(false);
  const [id, setId] = useState(null);

  const getRecipe = async (rhash, shareAs, label) => {
    try {
      const res = await axios.get(`${kBaseUrl}/recipes/${rhash}`);
      console.log(res.data);
      if (res.data === `Recipe ${rhash} not found`) {
        addRecipe(rhash, shareAs, label);
      } else {
        await getUR(uid, rhash);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addRecipe = async (rhash, shareAs, label) => {
    try {
      let requestBody = {
        rhash: rhash,
        label: label,
        shareAs: shareAs,
      };
      const res1 = await axios.post(`${kBaseUrl}/recipes`, requestBody);
      await getUR(uid, rhash);
      return res1;
    } catch (err) {
      console.log(err);
    }
  };

  const getUR = async (uid, rhash) => {
    try {
      const res2 = await axios.get(
        `${kBaseUrl}/ur/user/${uid}/recipe/${rhash}`
      );
      if (res2.data.id === 0) {
        addUR(rhash, uid);
      } else {
        const newId = res2.data.id;
        setFave(newId);
      }
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
      const res3 = await axios.post(`${kBaseUrl}/ur`, requestBody);
      const newId = res3.data.user_recipe.id;
      setFave(newId);
      return res3;
    } catch (err) {
      console.log(err);
    }
  };

  const setFave = async (newId) => {
    try {
      const requestBody = {
        favorite: true,
      };
      const res3 = await axios.patch(`${kBaseUrl}/ur/${newId}`, requestBody);
      console.log("SetFave: ", res3.data.id);
      return res3.data.id;
    } catch (err) {
      console.log(err);
    }
  };

  const setNewFave = async (rhash, shareAs, label, uid) => {
    await getRecipe(rhash, shareAs, label);
  };

  const onSetFave = () => {
    setNewFave(rhash, shareAs, label, uid).then((newFave) => {
      SetFavoriteStatus(!favorite);
    });
  };

  return (
    <View style={styles.button}>
      <Text style={styles.title}>Add {label} to favorites?</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        title="Favorite"
      >
        <Text>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSetFave} title="Favorite">
        <Text>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    margin: 5,
    alignSelf: "auto",
  },
});

export default SetFavorite;
