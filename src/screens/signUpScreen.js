import React, { useState } from "react";
import {
  Button,
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSignUp = async () => {
    if (email && password) {
      if (confirmPass !== password) {
        alert("Passwords do not match, please try again.");
        setPassword("");
        setConfirmPass("");
      } else {
        setIsLoading(true);
        try {
          const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          if (response) {
            const user = auth.currentUser;
            await updateProfile(user, {
              displayName: name,
            });
          }
        } catch (error) {
          if (error.code == "auth/email-already-in-use") {
            alert("User already exists. Try logging in.");
          }
          console.log(error);
        }
      }
    } else {
      alert("Please enter email and password.");
    }
  };

  return (
    <NavigationContainer>
      <View>
        {isLoading ? (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                elevation: 1000,
              },
            ]}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : null}
        <ScrollView>
          <SafeAreaView />
          <View></View>
          <View style={styles.login}>
            <Text style={styles.screenTxt}>Email</Text>
            <TextInput
              style={styles.eMail}
              placeholder={"enter email"}
              keyboardType="email-address"
              onChangeText={(emailInput) => setEmail(emailInput)}
              value={email}
            />
            <Text style={styles.screenTxt}>Name</Text>
            <TextInput
              style={styles.eMail}
              placeholder="enter name"
              onChangeText={(nameInput) => setName(nameInput)}
              value={name}
            />
            <Text style={styles.screenTxt}>Password</Text>
            <TextInput
              style={styles.pWord}
              placeholder="enter password"
              secureTextEntry
              onChangeText={(passwordInput) => setPassword(passwordInput)}
              value={password}
            />
            <TextInput
              style={styles.pWord}
              placeholder="confirm password"
              secureTextEntry
              onChangeText={(confirmPassInput) => {
                setConfirmPass(confirmPassInput);
              }}
              value={confirmPass}
            />
            <Button title="Sign Up" onPress={onSignUp} />
          </View>
        </ScrollView>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  login: {
    flex: 0.75,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#246A73",
    width: 400,
    margin: 20,
    padding: 5,
    fontSize: 20,
  },
  eMail: {
    flex: 0.25,
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    color: "#246A73",
    width: 350,
    height: 35,
    margin: 10,
    fontSize: 20,
  },
  pWord: {
    flex: 0.25,
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    color: "#246A73",
    width: 350,
    height: 35,
    margin: 10,
    fontSize: 20,
  },
  screenTxt: {
    color: "#F3DFC1",
    padding: 10,
    paddingLeft: 20,
    fontSize: 20,
  },
});

export default SignUp;
