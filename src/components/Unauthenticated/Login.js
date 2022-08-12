import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { styles } from "../../../assets/styles";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { DismissKeyboard } from "../../helperFunctions/DismissKeyboard";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSignIn = async () => {
    if (email && password) {
      setIsLoading(true);
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } catch (error) {
        setIsLoading(false);
        switch (error.code) {
          case "auth/user-not-found":
            alert("A user with that email does not exist. Try signing Up");
            break;
          case "auth/invalid-email":
            alert("Please enter a valid email address");
            break;
          case "auth/wrong-password":
            alert("Incorrect password");
            break;
          default:
            alert(JSON.stringify(error.message));
        }
      }
    } else {
      alert("Please enter email and password.");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <View style={styles.container}>
            <SafeAreaView />
            <View style={{ padding: 20, marginTop: 50 }}>
              <Text>Log In</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder={"enter email"}
                keyboardType="email-address"
                onChangeText={(emailInput) => setEmail(emailInput)}
              />
              <TextInput
                placeholder="enter password"
                secureTextEntry
                onChangeText={(passwordInput) => setPassword(passwordInput)}
              />
              <Button onPress={onSignIn} title="Log in" />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Button
                title="Not registered yet? Start here"
                onPress={() => navigation.navigate("SignUp")}
              ></Button>
            </View>
          </View>
        </View>
      </DismissKeyboard>
    );
  }
};

export default Login;
