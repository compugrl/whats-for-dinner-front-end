import { useEffect, useState, useContext } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { styles } from "../../../assets/styles";
import { useNavigation } from "@react-navigation/native";
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

export default AddIngredient;
