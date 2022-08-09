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
