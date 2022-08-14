import { Component, useEffect, useState, useContext } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import SelectList from "./SelectList";

const kBaseUrl = "https://wfd-back-end.herokuapp.com/search";

const foodListToJson = (ingredient) => {
  const { id, food } = ingredient;
  return { id, food };
};

function GetIngr({ rhash }) {
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const [ingredientData, setIngredientData] = useState([]);

  useEffect(() => {
    const loadRecipe = async () => {
      const result = await axios(`${kBaseUrl}/${rhash}/ingr`);
      const ingredients = result.data.map(foodListToJson);
      setIngredientData(ingredients);
    };
    loadRecipe();
  }, []);

  return <SelectList items={ingredientData} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  rList: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    justifyContent: "flex-start",
  },
  item: {
    padding: 5,
    marginVertical: 5,
    width: "90%",
    alignSelf: "center",
  },
  label: {
    textAlignVertical: "top",
    fontSize: 20,
    marginHorizontal: 5,
    width: 175,
  },
});

export default GetIngr;
