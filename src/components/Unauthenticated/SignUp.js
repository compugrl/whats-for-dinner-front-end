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
import { styles } from "../../../assets/styles";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addUser = async () => {
    const uid = user.uid;
    try {
      const requestBody = {
        uid: uid,
        name: name,
        email: email,
      };
      const res = await axios.post(
        `https://wfd-back-end.herokuapp.com/users`,
        requestBody
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  };

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
            addUser();
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
    <View style={styles.container}>
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

      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView />
        <View style={{ padding: 20, marginTop: 50 }}>
          <Text>Sign Up</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"enter email"}
            keyboardType="email-address"
            onChangeText={(emailInput) => setEmail(emailInput)}
            value={email}
          />
          <Text>Name</Text>
          <TextInput
            placeholder="enter name"
            onChangeText={(nameInput) => setName(nameInput)}
            value={name}
          />
          <Text>Password</Text>
          <TextInput
            placeholder="enter password"
            secureTextEntry
            onChangeText={(passwordInput) => setPassword(passwordInput)}
            value={password}
          />
          <TextInput
            placeholder="confirm password"
            secureTextEntry
            onChangeText={(confirmPassInput) => {
              setConfirmPass(confirmPassInput);
            }}
            value={confirmPass}
          />
          <Button onPress={onSignUp} title="Sign Up"></Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
