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

const rhash = "527dfeadacd4ceb0c31d7d7d7ac8e983";
const kBaseUrl = "https://wfd-back-end.herokuapp.com/search";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <View style={styles.rList}>
      <Text style={styles.label}>{item.food}</Text>
    </View>
  </TouchableOpacity>
);

const AddIngredient = () => {
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const [ingredientData, setIngredientData] = useState([]);

  useEffect(() => {
    const loadRecipe = async () => {
      const result = await axios(`${kBaseUrl}/${rhash}&field=ingredients`);
      const ingredients = result.data.recipe.ingredients;
      setIngredientData(ingredients);
    };
    loadRecipe();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Item item={item} />
      </View>
    );
  };
  return (
    <FlatList
      data={ingredientData}
      renderItem={renderItem}
      keyExtractor={(item) => item.foodId}
    />
  );
};

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

export default AddIngredient;
