import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import {
  SetComplete,
  DeleteIngredient,
} from "../../helperFunctions/HandleShopping";
import { AuthContext } from "../../context/AuthContext";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <View style={styles.container}>
      <Text style={[styles.label, textColor]}>{item.ingredient}</Text>
      <SetComplete id={item.id} uid={item.uid} completed={item.completed} />
      <DeleteIngredient id={item.id} uid={item.uid} />
    </View>
  </TouchableOpacity>
);

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ShoppingList = () => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  let iconName;
  const size = 48;
  const [shoppingData, setShoppingData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const loadShoppingList = async () => {
      const result = await axios(
        `https://wfd-back-end.herokuapp.com/shopping_list/${uid}/ingredients`
      );
      setShoppingData(result.data);
    };
    loadShoppingList();
  }, []);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#368F8B" : "#246A73";
    const color = item.id === selectedId ? "#246A73" : "#F3DFC1";
    iconName = item.completed ? "ios-checkmark" : "ios-basket";

    return (
      <View style={styles.container}>
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Text style={styles.refresh}>Pull down to Refresh</Text>
      <FlatList
        data={shoppingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["256A73", "#160F29"]}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 10,
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
  input: {
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    textAlign: "center",
    color: "#246A73",
    width: "90%",
    height: 35,
    margin: 10,
    fontSize: 20,
  },
  refresh: {
    marginVertical: 10,
    flex: 0.15,
    paddingTop: 2,
    backgroundColor: "#160F29",
    color: "#F3DFC1",
    fontSize: 20,
    width: "100%",
    height: "80%",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default ShoppingList;
