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
import ShoppingList from "../components/Authenticated/ShoppingList";

function ShoppingListScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ShoppingList />
    </SafeAreaView>
  );
}

export default ShoppingListScreen;
