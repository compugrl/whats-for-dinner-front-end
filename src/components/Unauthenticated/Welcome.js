import React from "react";
import { Button, Image, View } from "react-native";
import { styles } from "../../../assets/styles";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={require("../../../assets/splash.png")}
        />
      </View>
      <View style={[styles.container, { justifyContent: "flex-start" }]}>
        <Button
          title="Log in"
          onPress={() => navigation.navigate("Login")}
        ></Button>
      </View>
    </View>
  );
};

export default Welcome;
