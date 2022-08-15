import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import RecipeList from "./RecipeList";
import Collapsible from "react-native-collapsible";

const cuisineItems = require("./data/cuisineItems.json");
const kBaseUrl = "https://wfd-back-end.herokuapp.com/search";

const Search = () => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(false);
  const [isResultCollapsed, setIsResultCollapsed] = useState(true);

  const [searchResults, setSearchResults] = useState([]);

  const [items, setItems] = useState(cuisineItems);
  const [open, setOpen] = useState(false);

  const [q, setQ] = useState("");
  const [excluded, setExcluded] = useState("");
  const [ingr, setIngrLimit] = useState(1);
  const [maxTime, setMaxTime] = useState(60);
  const [cuisine, setCuisine] = useState([]);

  const getRecipes = async (query) => {
    const result = await axios.get(`${kBaseUrl}?${query}`);
    setSearchResults(result);
    console.log("Search result state: ", searchResults);
    setIsSearchCollapsed(true);
    setIsResultCollapsed(false);
    return res;
  };

  const updateQ = (q) => {
    setQ(q);
  };

  const updateExcluded = (excluded) => {
    setExcluded(excluded);
  };

  const updateIngrLimit = (ingrlimit) => {
    setIngrLimit(ingrlimit);
  };

  const updateMaxTime = (maxTime) => {
    setMaxTime(maxTime);
  };

  const buildQuery = () => {
    let queryStr = "";

    queryStr = `q=${q}`;

    if (excluded.length > 0) {
      queryStr = queryStr + `&excluded=${excluded}`;
    }
    if (ingr.length > 0) {
      queryStr = queryStr + `&ingr=${ingr}`;
    }
    if (maxTime.length > 0) {
      queryStr = queryStr + `&time=${maxTime}`;
    }
    if (cuisine.length > 0) {
      queryStr = queryStr + `&cuisine=${cuisine}`;
    }

    getRecipes(queryStr);
  };

  const showSearch = () => {
    setIsResultCollapsed(true);
    setIsSearchCollapsed(false);
  };

  const handleRecipe = (rhash) => {
    console.log(`Recipe: ${rhash}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Collapsible collapsed={isSearchCollapsed} style={styles.container}>
        <View style={styles.addView}>
          <TextInput
            style={styles.input}
            type="TextInput"
            name="q"
            placeholder="Search Ingredient"
            cuisine={q}
            onChangeText={updateQ}
          />
        </View>

        <Text style={styles.label}>Filter</Text>

        <View style={styles.filter}>
          <TextInput
            style={styles.input}
            type="TextInput"
            name="excluded"
            placeholder="Exclude Ingredient"
            cuisine={excluded}
            onChangeText={updateExcluded}
          />
        </View>
        <View style={styles.filter}>
          <TextInput
            style={styles.input}
            type="Input"
            name="ingr"
            placeholder="Max # of Ingredients"
            keyboardType="numeric"
            cuisine={ingr}
            onChangeText={updateIngrLimit}
          />
        </View>
        <View style={styles.filter}>
          <TextInput
            style={styles.input}
            type="Input"
            name="maxTime"
            placeholder="Max minutes to prepare"
            keyboardType="numeric"
            cuisine={maxTime}
            onChangeText={updateMaxTime}
          />
        </View>
        <View style={styles.filter}>
          <DropDownPicker
            open={open}
            value={cuisine}
            items={items}
            setOpen={setOpen}
            setValue={setCuisine}
            setItems={setItems}
            multiple={true}
            mode="BADGE"
            placeholder="Filter by Cuisine"
            badgeDotColors={[
              "#160F29",
              "#246A73",
              "#368F8B",
              "#F3DFC1",
              "#DDBEA8",
            ]}
          />
        </View>
        <View>
          <TouchableOpacity onPress={buildQuery}>
            <Text style={styles.label}>Search</Text>
          </TouchableOpacity>
        </View>
      </Collapsible>

      <Collapsible collapsed={isResultCollapsed} style={styles.container}>
        <View>
          <TouchableOpacity onPress={showSearch}>
            <Text style={styles.label}>Open Search</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.rList}>
          <RecipeList
            style={styles.rList}
            recipes={searchResults}
            onSelectRecipe={handleRecipe}
          />
        </ScrollView>
      </Collapsible>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
  },
  item: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    width: 350,
    alignSelf: "center",
  },
  label: {
    fontSize: 25,
    margin: 10,
    width: 175,
    textAlign: "center",
  },
  addView: {
    flex: 0.25,
    margin: 10,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#160F29",
    color: "#F3DFC1",
    width: 350,
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
  filter: {
    backgroundColor: "#246A73",
    flex: 0.25,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    margin: 5,
  },
  rList: {
    flex: 2,
    width: 400,
  },
  button: {
    flex: 0.2,
    borderColor: "#160F29",
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#F3DFC1",
  },
  scroll: {
    flex: 2,
    width: 400,
  },
});

export default Search;
