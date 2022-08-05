import * as React from "react";
import PropTypes from "prop-types";
import { Button, SafeAreaView, StyleSheet } from "react-native";

const Recipe = ({ rhash, shareAs, label, imageUrl, onSelectRecipe }) => {
  const onRecipePress = () => {
    onSelectRecipe(rhash, shareAs, label, imageUrl);
  };

  return (
    <SafeAreaView>
      <Button onPress={onRecipePress} title={label} color="#246A73"></Button>
    </SafeAreaView>
  );
};

Recipe.propTypes = {
  rhash: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  shareAs: PropTypes.string.isRequired,
  onSelectRecipe: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  textStyle: {
    color: "#F3DFC1",
    fontWeight: "bold",
  },
});

export default Recipe;
