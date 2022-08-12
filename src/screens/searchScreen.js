import React from "react";
import { SafeAreaView } from "react-native";
import Search from "../components/Authenticated/Search";

function SearchScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 2,
        justifyContent: "space-around",
        alignItems: "flex-start",
      }}
    >
      <Search />
    </SafeAreaView>
  );
}

export default SearchScreen;
