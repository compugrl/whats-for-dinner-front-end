import * as React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Recipe from "./recipe";

const RecipeList = ({ recipes, onSelectRecipe }) => {
  const recipeComponents = recipes.map((recipe) => {
    return (
      <Recipe
        key={recipe.id}
        id={recipe.id}
        userId={recipe.userId}
        hash={recipe.hash}
        label={recipe.label}
        imageUrl={recipe.imageUrl}
        shareAs={recipe.shareAs}
        menuDate={recipe.menuDate}
        favorite={recipe.favorite}
        onSelectRecipe={onSelectRecipe}
      />
    );
  });

  return <View>{recipeComponents}</View>;
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectRecipe: PropTypes.func.isRequired,
};

export default RecipeList;
