import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../../assets/styles";

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
      setId(newId);
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
    <View style={styles.item}>
      <Text style={styles.faveLabel}>Add {label} to favorites?</Text>
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.faveButton}
          onPress={() => navigation.navigate("Home")}
          title="Favorite"
        >
          <Text style={styles.title}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.faveButton}
          onPress={onSetFave}
          title="Favorite"
        >
          <Text style={styles.title}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SetFavorite;
