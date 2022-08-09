import React from "react";
import { SafeAreaView } from "react-native";
import Home from "../components/Authenticated/Home";

function HomeScreen({ route, navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 2,
        justifyContent: "space-around",
        alignItems: "flex-start",
      }}
    >
      <Home></Home>
    </SafeAreaView>
  );
}

export default HomeScreen;
