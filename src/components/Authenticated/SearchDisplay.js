import React, { useContext, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../../../assets/styles";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.label}>{item.label}</Text>
  </TouchableOpacity>
);

const SearchDisplay = (searchResults) => {
  const [selectedId, setSelectedId] = useState(null);
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const [recipeData, setRecipeData] = useState([]);
  const [shareAs, setShareAs] = useState("");

  const renderItem = ({ item }) => {
    console.log("Data to render: ", JSON.stringify(searchResults));
    return (
      <View style={styles.container}>
        <Item
          item={item}
          onPress={function () {
            console.log(
              "Recipe sent from search: ",
              item.shareAs,
              item.label,
              item.rhash
            );
            navigation.dispatch(
              StackActions.push("RecipeTabs", {
                shareAs: item.shareAs,
                label: item.label,
                rhash: item.rhash,
              })
            );
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.rList}>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.rhash}
      />
    </SafeAreaView>
  );
};

export default SearchDisplay;
