import * as React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  FlatList,
} from "react-native";
import Recipe from "./recipe";

const RecipeList = ({ recipes, onSelectRecipe }) => {
  const recipeComponents = recipes.map((recipe) => {
    return (
      <Recipe
        key={recipe.recipeId}
        recipeId={recipe.recipeId}
        hash={recipe.hash}
        label={recipe.label}
        imageTnail={recipe.imageTnail}
        imageSm={recipe.imageSm}
        onSelectRecipe={onSelectRecipe}
      />
    );
  });

  return (
    <View>
      <Text>{recipeComponents}</Text>
    </View>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  onSelectRecipe: PropTypes.func.isRequired,
};

export default RecipeList;
