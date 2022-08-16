import { useEffect, useState, useContext } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { StackActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

const kBaseUrl = "https://wfd-back-end.herokuapp.com/ur";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <View style={styles.rList}>
      <Text style={[styles.item]}>{item.label}</Text>
    </View>
  </TouchableOpacity>
);

const GetFaves = () => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const navigation = useNavigation();
  const [faveData, setFaveData] = useState([]);

  const getFavorites = async () => {
    const result = await axios(`${kBaseUrl}/user/${uid}/fave`);
    if (result === []) {
      return "No favorites found", result;
    } else {
      console.log(result.data);
      setFaveData(result.data);
    }
  };

  useEffect(() => {
    const loadFavorites = async () => {
      const result = await axios(`${kBaseUrl}/user/${uid}/fave`);
      if (result === []) {
        return "No favorites found", result;
      } else {
        setFaveData(result.data);
      }
    };
    loadFavorites();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Item
          item={item}
          onPress={function () {
            // console.log(
            //   "Recipe sent from fave: ",
            //   item.shareAs,
            //   item.label,
            //   item.id,
            //   item.rhash,
            //   item.menuDate
            // );
            navigation.dispatch(
              StackActions.push("RecipeTabs", {
                shareAs: item.shareAs,
                label: item.label,
                rhash: item.rhash,
                id: item.id,
                menuDate: item.menuDate,
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
        data={faveData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  rList: {
    flex: 2,
    width: "100%",
  },
  img: {
    alignSelf: "center",
    width: 150,
    height: 150,
    margin: 20,
  },
  item: {
    backgroundColor: "#246A73",
    color: "#F3DFC1",
    fontSize: 20,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    width: "95%",
    alignSelf: "center",
  },
  label: {
    textAlignVertical: "top",
    fontSize: 20,
    marginHorizontal: 5,
    width: 175,
  },
});

export default GetFaves;
