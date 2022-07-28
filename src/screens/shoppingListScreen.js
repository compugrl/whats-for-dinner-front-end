import { SafeAreaView } from "react-native-safe-area-context";
import * as React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function ShoppingListScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>ShoppingList</Text>
    </SafeAreaView>
  );
}

export default ShoppingListScreen;
