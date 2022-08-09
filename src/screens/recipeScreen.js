import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import React, { Component } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { navigation } from "@react-navigation/native-stack";

class RecipeView extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView source={{ uri: shareAs }} />
      </SafeAreaView>
    );
  }
}

function RecipeScreen({ route, navigation }) {
  const { shareAs } = route.params;
  return (
    <View>
      <RecipeView shareAs={shareAs} />
    </View>
  );
}
export default RecipeScreen;
