import * as React from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import Home from "../components/Authenticated/Home";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

function HomeScreen({ navigation: { navigate } }) {
  function MyProfileButton() {
    const navigation = useNavigation();
    const size = 48;
    return (
      <Pressable onPress={() => navigate("Profile")}>
        <Ionicons name="options" size={size} />
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pView}>
        <MyProfileButton />
      </View>
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pView: {
    flex: 0.1,
    justifyContent: "flex-start",
    alignSelf: "flex-end",
    marginRight: 10,
  },
});

export default HomeScreen;
