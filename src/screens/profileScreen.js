import * as React from "react";
import { Button, View } from "react-native";
import Profile from "../components/Authenticated/Profile";

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Profile />
      <Button
        title="Return to Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}

export default ProfileScreen;
