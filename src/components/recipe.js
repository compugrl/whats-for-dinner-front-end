import * as React from "react";
import PropTypes from "prop-types";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Button from "apsl-react-native-button";

const Recipe = ({ recipeId, label }) => {
  const onRecipeClick = () => {
    onSelectRecipe(recipeId, label);
  };

  return (
    <SafeAreaView>
      <Button
        textStyle={styles.textStyle}
        onClick={onRecipeClick}
        style={styles.buttonStyle}
      >
        {label}
      </Button>
    </SafeAreaView>
  );
};

Recipe.propTypes = {
  recipeId: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
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
