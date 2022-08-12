import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import React, { Component, useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

let shareAs = "";

class RecipeView extends Component {
  render() {
    console.log("Passed to webview: " + this.props.url);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView source={{ uri: this.props.url }} />
      </SafeAreaView>
    );
  }
}

function ViewRecipe({ recipe }) {
  const navigation = useNavigation();
  const [share, setShare] = useState(recipe.shareAs);
  const [rhash, setRhash] = useState(recipe.rhash);

  console.log("Url: ", share);
  console.log("Hash: ", rhash);
  return <RecipeView url={share} />;
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: 50,
    height: 50,
    margin: 5,
  },
});

export default ViewRecipe;
