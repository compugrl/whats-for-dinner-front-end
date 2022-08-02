import * as React from "react";
import PropTypes from "prop-types";
import { Button, SafeAreaView, StyleSheet } from "react-native";

const Recipe = ({
  id,
  userId,
  hash,
  shareAs,
  label,
  imageUrl,
  menuDate,
  favorite,
  onSelectRecipe,
}) => {
  const onRecipePress = () => {
    onSelectRecipe(
      id,
      userId,
      hash,
      shareAs,
      label,
      imageUrl,
      menuDate,
      favorite
    );
  };

  return (
    <SafeAreaView>
      <Button onPress={onRecipePress} title={label} color="#354259"></Button>
    </SafeAreaView>
  );
};

Recipe.propTypes = {
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  hash: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  shareAs: PropTypes.string.isRequired,
  menuDate: PropTypes.string,
  favorite: PropTypes.string,
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
