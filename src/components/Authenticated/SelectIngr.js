import { Component, useEffect, useState, useContext } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

const kBaseUrl = "https://wfd-back-end.herokuapp.com/search";

function SelectIngr({ rhash }) {
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const [ingredientData, setIngredientData] = useState([]);

  const mapData = ({ ingredientData }) => {
    const foodList = ingredientData.data.map((food) => {
      return (
        <View style={styles.container}>
          <Text style={styles.item}>item={food}</Text>
        </View>
      );
    });

    return (
      <SafeAreaView style={styles.container}>
        <View>{foodList}</View>
      </SafeAreaView>
    );
  };

  useEffect(() => {
    const loadRecipe = async () => {
      const result = await axios(`${kBaseUrl}/${rhash}/ingr`);
      setIngredientData(result.data);
      const ingredients = mapData();
      console.log("Ingredients: ", ingredients);
    };
    loadRecipe();
  }, []);

  return <Text>{ingredientData}</Text>;
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
    width: 400,
    justifyContent: "flex-start",
  },
  item: {
    padding: 5,
    marginVertical: 5,
    width: 350,
    alignSelf: "center",
  },
  label: {
    textAlignVertical: "top",
    fontSize: 20,
    marginHorizontal: 5,
    width: 175,
  },
});

export default SelectIngr;
