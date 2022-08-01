import * as React from "react";
import PropTypes from "prop-types";
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const Recipe = ({ recipeId, label, imageTnail, imageSm, onSelectRecipe }) => {
  const onRecipeClick = () => {
    onSelectRecipe(recipeId, label, imageTnail, imageSm);
  };

  return (
    <SafeAreaView>
      <Button onPress={onSelectRecipe} title={label} color="#354259"></Button>
    </SafeAreaView>
  );
};

Recipe.propTypes = {
  recipeId: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  imageTnail: PropTypes.Image,
  imageSm: PropTypes.Image,
  onSelectRecipe: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  textStyle: {
    color: "#ECE5C7",
    fontWeight: "bold",
  },
  buttonStyle: {
    borderColor: "#C2DED1",
    backgroundColor: "#354259",
    borderWidth: 2,
    borderRadius: 10,
    width: 500,
  },
});

export default Recipe;
