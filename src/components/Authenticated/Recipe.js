import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Stack = createStackNavigator();
const Separator = () => <View style={styles.separator} />;

const Recipe = ({
  navigation,
  rhash,
  shareAs,
  label,
  imageUrl,
  onSelectRecipe,
}) => {
  const [share, setShare] = useState("");

  const onRecipePress = () => {
    setShare(shareAs);
    onSelectRecipe(shareAs);
  };

  if (Recipe === {}) {
    return (
      <SafeAreaView>
        <Text>No recipe for this date</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <View>
          <Text style={styles.titleText} onPress={onRecipePress}>
            {label}
          </Text>
          <Separator />
        </View>
      </SafeAreaView>
    );
  }
};

Recipe.propTypes = {
  rhash: PropTypes.string,
  label: PropTypes.string,
  imageUrl: PropTypes.string,
  shareAs: PropTypes.string,
  onSelectRecipe: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 20,
    width: 400,
    borderBottomColor: "#246A73",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleText: {
    textAlign: "left",
    fontSize: 20,
  },
});

export default Recipe;
