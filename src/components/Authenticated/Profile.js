import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const displayName = user.displayName;
  const email = user.email;
  const [uName, setName] = useState(displayName);
  const [uEmail, setEmail] = useState(email);

  console.log("Name: ", displayName);
  console.log("Email: ", email);

  updateProfile(auth.currentUser, {
    displayName: uName,
  })
    .then(() => {
      Alert.alert(`Name updated to ${uName}!`);
    })
    .catch((error) => {
      // An error occurred
      // ...
    });

  updateEmail(auth.currentUser, { email })
    .then(() => {
      Alert.alert(`Email updated to ${uEmail}!`);
    })
    .catch((error) => {
      // An error occurred
      // ...
    });

  const updateInfo = () => {
    if (uName !== displayName) {
      updateProfile();
    }

    if (uEmail !== email) {
      updateEmail();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.textStyle}>Hello {displayName}</Text>
      </View>
      <View style={styles.login}>
        <TextInput
          style={styles.input}
          type="TextInput"
          value={uName}
          placeholder={displayName}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          type="TextInput"
          value={uEmail}
          placeholder={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={updateInfo}>
          <Text style={styles.textStyle}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: "#160F29",
    backgroundColor: "#368F8B",
    color: "#160F29",
    borderWidth: 2,
    borderRadius: 10,
    width: 250,
    height: 40,
    alignSelf: "center",
    margin: 20,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    fontSize: 20,
    paddingTop: 30,
  },
  login: {
    flex: 0.75,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#246A73",
    width: 500,
    margin: 20,
    padding: 5,
  },
  input: {
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    textAlign: "center",
    color: "#246A73",
    width: 275,
    height: 40,
    margin: 10,
    fontSize: 25,
  },
  textStyle: {
    color: "#160F29",
    fontSize: 30,
    textAlign: "center",
  },
});

export default Profile;
