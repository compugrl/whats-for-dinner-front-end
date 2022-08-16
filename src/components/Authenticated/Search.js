import React, { useContext, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import Collapsible from "react-native-collapsible";
import { styles } from "../../../assets/styles";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { DismissKeyboard } from "../../helperFunctions/DismissKeyboard";

const cuisineItems = require("./data/cuisineItems.json");
const kBaseUrl = "https://wfd-back-end.herokuapp.com/search";
let res = [];
const Separator = () => <View style={styles.separator} />;

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.item}>{item.label}</Text>
  </TouchableOpacity>
);

const Search = () => {
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
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
    res = result.data;
    setSearchResults(res);
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

    res = getRecipes(queryStr);
  };

  const showSearch = () => {
    setIsResultCollapsed(true);
    setIsSearchCollapsed(false);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Item
          style={styles.item}
          item={item}
          onPress={function () {
            navigation.dispatch(
              StackActions.push("RecipeTabs", {
                shareAs: item.shareAs,
                label: item.label,
                rhash: item.rhash,
              })
            );
          }}
        />
        <Separator />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboard>
        <Collapsible collapsed={isSearchCollapsed}>
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
          <View style={styles.filter}>
            <Text style={styles.title}>Filters (optional)</Text>
          </View>
          <View style={styles.item}>
            <TextInput
              style={styles.input}
              type="TextInput"
              name="excluded"
              placeholder="Exclude Ingredient"
              cuisine={excluded}
              onChangeText={updateExcluded}
            />
          </View>
          <View style={styles.item}>
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
          <View style={styles.item}>
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
          <View style={styles.item}>
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
            <TouchableOpacity style={styles.button} onPress={buildQuery}>
              <Text style={styles.title}>Search</Text>
            </TouchableOpacity>
          </View>
        </Collapsible>
      </DismissKeyboard>
      <Collapsible collapsed={isResultCollapsed} style={styles.container}>
        <View>
          <TouchableOpacity onPress={showSearch} style={styles.button}>
            <Text style={styles.title}>Back to Search</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            style={styles.rList}
            data={res}
            renderItem={renderItem}
            keyExtractor={(item) => item.rhash}
          />
        </View>
      </Collapsible>
    </SafeAreaView>
  );
};

export default Search;
