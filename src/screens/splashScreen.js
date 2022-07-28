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

function SplashScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Loading...</Text>
    </SafeAreaView>
  );
}

export default SplashScreen;
