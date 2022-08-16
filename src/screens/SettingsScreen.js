import * as React from "react";
import { Button, View } from "react-native";
import Settings from "../components/Authenticated/Settings";

function SettingsScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <Settings />
      <Button
        title="Return to Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}

export default SettingsScreen;
