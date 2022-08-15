import { Component, useEffect, useState, useContext } from "react";
import { StyleSheet, StatusBar } from "react-native";
import axios from "axios";
import { styles } from "../../../assets/styles";
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

export default GetIngr;
