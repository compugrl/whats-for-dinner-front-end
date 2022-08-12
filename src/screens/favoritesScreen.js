import { SafeAreaView } from "react-native-safe-area-context";
import * as React from "react";
import GetFaves from "../components/Authenticated/GetFaves";

function FavoritesScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <GetFaves />
    </SafeAreaView>
  );
}

export default FavoritesScreen;
