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
  ImageBackground,
} from "react-native";

const Recipe = ({ recipeId, label, imageTnail, imageSm }) => {
  const onRecipeClick = () => {
    onSelectRecipe(recipeId, label, imageTnail, imageSm);
  };

  return (
    <>
      <Text onClick={onRecipeClick}>{label}</Text>
    </>
  );
};

Recipe.propTypes = {
  recipeId: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  imageTnail: PropTypes.Image,
  imageSm: PropTypes.Image,
  onSelectRecipe: PropTypes.func.isRequired,
};

export default Recipe;
