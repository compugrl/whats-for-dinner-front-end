import * as React from "react";
import { SafeAreaView } from "react-native";
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
