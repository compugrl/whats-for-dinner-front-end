import { useEffect, useState, useContext } from "react";
import {
  Alert,
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const kBaseUrl = "https://wfd-back-end.herokuapp.com/ur";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <View style={styles.rList}>
      <Text style={[styles.label]}>{item.label}</Text>
    </View>
  </TouchableOpacity>
);

const GetFaves = () => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
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
        console.log("Start :", result.data);
        setFaveData(result.data);
      }
    };
    loadFavorites();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Item item={item} onPress={() => Alert.alert(item.label)} />
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
  },
  rList: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
    justifyContent: "flex-start",
  },
  img: {
    alignSelf: "center",
    width: 150,
    height: 150,
    margin: 20,
  },
  item: {
    padding: 5,
    marginVertical: 5,
    width: 350,
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
