import { useEffect, useState, useContext } from "react";
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { styles } from "../../../assets/styles";
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

export default GetFaves;
