import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function AddIngredient() {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const [addedIngredient, setAddedIngredient] = useState(null);
  let iconName;
  const size = 48;
  iconName = "ios-add";

  const kBaseUrl = `https://wfd-back-end.herokuapp.com/shopping_list`;

  const performAdd = async (uid) => {
    console.log(`Added ingredient: ${addedIngredient} for ${uid}`);
    const requestBody = {
      ingredient: { add },
      completed: false,
    };
    try {
      const response = await axios.post(`${kBaseUrl}/${uid}`, requestBody);
      loadShoppingList(uid);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const onAdd = () => {
    performAdd(uid).then((newIngredient) => {
      console.log(newIngredient);
    });
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.label}>Add an Ingredient</Text>
      </View>
      <View style={styles.addView}>
        <TextInput
          style={styles.input}
          onChangeText={(newIngredient) => setAddedIngredient(newIngredient)}
          onSubmitEditing={onAdd}
          value={addedIngredient}
        ></TextInput>
        <AddIngredient add={addedIngredient} uid={uid} />
      </View>
      <View style={styles.buttonStyle}>
        <TouchableOpacity onPress={onAdd} title="Add">
          <Ionicons name={iconName} size={size} color="#F3DFC1" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    flexDirection: "row",
  },
  item: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    width: 350,
    alignSelf: "center",
  },
  label: {
    fontSize: 20,
    margin: 10,
    width: 175,
  },
  addView: {
    flex: "0.25",
    flexDirection: "row",
    backgroundColor: "#160F29",
    color: "#F3DFC1",
    width: 350,
    alignSelf: "center",
  },
  input: {
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    textAlign: "center",
    color: "#246A73",
    width: 250,
    height: 35,
    margin: 10,
    fontSize: 20,
  },
});

export default AddIngredient;
