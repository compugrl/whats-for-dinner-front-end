import { Ionicons } from "@expo/vector-icons";
import { getAuth, signOut, updateEmail, updateProfile } from "firebase/auth";
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

const Settings = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const displayName = user.displayName;
  const email = user.email;
  const [uName, setName] = useState(null);
  const [uEmail, setEmail] = useState(null);
  const size = 48;
  const [updated, setUpdated] = useState(false);
  let iconName;

  iconName = updated ? "checkmark" : "";

  const onSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Welcome");
    } catch (error) {
      alert("Unable to sign out right now");
    }
  };

  updateProfile(auth.currentUser, {
    displayName: uName,
  })
    .then(() => {
      setNameUpdated(true);
      console.log("Name updated");
    })
    .catch((error) => {
      // An error occurred
      // ...
    });

  updateEmail(auth.currentUser, { email })
    .then(() => {
      console.log("Email updated");
    })
    .catch((error) => {
      // An error occurred
      // ...
    });

  const updateInfo = () => {
    if (uName !== displayName) {
      updateProfile();
      setUpdated(true);
    }

    if (uEmail !== email) {
      updateEmail();
      setUpdated(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Hello {displayName}</Text>
      </View>
      <View style={styles.login}>
        <TextInput
          style={styles.input}
          type="TextInput"
          value={uName}
          placeholder={displayName}
          onChangeText={setName}
        />
      </View>
      <View style={styles.login}>
        <TextInput
          style={styles.input}
          type="TextInput"
          value={uEmail}
          placeholder={email}
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={updateInfo}>
        <Text style={styles.title}>Update</Text>
        <Ionicons name={iconName} size={size} />
      </TouchableOpacity>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onSignOut}>
          <Text style={styles.title}>Logout</Text>
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
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#246A73",
    width: 400,
    margin: 20,
    padding: 5,
  },
  input: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    textAlign: "center",
    color: "#246A73",
    width: 350,
    height: 50,
    margin: 10,
    fontSize: 20,
  },
  title: {
    color: "#160F29",
    fontSize: 30,
    textAlign: "center",
  },
});

export default Settings;
