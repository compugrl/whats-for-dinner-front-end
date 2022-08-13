import * as React from "react";
import PropTypes from "prop-types";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Recipe from "./Recipe";
import Sharing from "./Sharing";
import SetFavorite from "./SetFavorite";

const RecipeList = ({ recipes, index, onSelectRecipe }) => {
  const recipeComponents = recipes.map((recipe) => {
    return (
      <View style={styles.container}>
        <Recipe
          style={styles.item}
          key={recipe.index}
          rhash={recipe.rhash}
          label={recipe.label}
          imageUrl={recipe.imageUrl}
          shareAs={recipe.shareAs}
          onSelectRecipe={onSelectRecipe}
        />
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>{recipeComponents}</View>
    </SafeAreaView>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectRecipe: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
  },
});

export default RecipeList;
