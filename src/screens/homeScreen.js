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
import Home from "../components/home";

function HomeScreen({ navigation }) {
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
