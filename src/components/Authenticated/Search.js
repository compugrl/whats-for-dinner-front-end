import React, { useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import SearchDisplay from "./SearchDisplay";

const kBaseUrl = "https://wfd-back-end.herokuapp.com";

const searchDataToJson = (recipe) => {
  const { shareAs, label, image_url: imageUrl, rhash } = recipe;
  return { shareAs, label, imageUrl, rhash };
};

const searchNewRecipes = async (searchData) => {
  try {
    const response = await axios.get(`${kBaseUrl}/search?q=${searchData}`);
    console.log("Results: " + JSON.stringify(response));
    return response.data.map(searchDataToJson);
  } catch (err) {
    console.log(err);
  }
};

const Search = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchIngredient, setSearchIngredient] = useState([]);

  const runNewSearch = () => {
    searchNewRecipes(searchIngredient).then((recipes) => {
      setSearchData(recipes);
    });
  };

  const handleRecipe = (q) => {
    runNewSearch(q);
  };

  return (
    <SafeAreaView style={styles.addView}>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(q) => setSearchIngredient(q)}
        ></TextInput>
        <Button onPress={handleRecipe} title="Search"></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.25,
    justifyContent: "flex-start",
    alignItems: "flex-start",
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

export default Search;
