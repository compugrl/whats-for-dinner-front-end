import * as React from "react";
import { SafeAreaView } from "react-native";
import SearchDisplay from "../components/searchDisplay";

function SearchScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "auto",
      }}
    >
      <SearchDisplay></SearchDisplay>
    </SafeAreaView>
  );
}

export default SearchScreen;
