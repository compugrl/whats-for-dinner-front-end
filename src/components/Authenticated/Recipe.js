import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import Sharing from "./Sharing";
import SetFavorite from "./SetFavorite";

const Stack = createStackNavigator();
const Separator = () => <View style={styles.separator} />;

const Recipe = ({ navigation, rhash, shareAs, label, onSelectRecipe }) => {
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
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.titleText} onPress={onRecipePress}>
            {label}
          </Text>
        </View>
        <View style={styles.icons}>
          <Sharing url={shareAs} title={label} />
          <SetFavorite rhash={rhash} shareAs={shareAs} label={label} />
          <Separator />
        </View>
      </SafeAreaView>
    );
  }
};

Recipe.propTypes = {
  rhash: PropTypes.string,
  label: PropTypes.string,
  shareAs: PropTypes.string,
  onSelectRecipe: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "center",
  },
  icons: {
    flex: 0.25,
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-around",
    width: "100%",
    alignItems: "baseline",
  },
  separator: {
    marginVertical: 20,
    width: "80%",
    borderBottomColor: "#246A73",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleText: {
    alignSelf: "center",
    textAlign: "left",
    fontSize: 20,
  },
});

export default Recipe;
