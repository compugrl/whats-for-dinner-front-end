import { useEffect, useState, useContext } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";
import moment from "moment";
import Sharing from "./Sharing";
import ViewRecipe from "./ViewRecipe";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import CalendarStrip from "react-native-calendar-strip";
import { AuthContext } from "../../context/AuthContext";

const kBaseUrl = "https://wfd-back-end.herokuapp.com/ur";
const markedDatesArray = [];

const recipeApiToJson = (recipe) => {
  const {
    rhash,
    label,
    image_url: imageUrl,
    shareAs,
    id,
    menu_date: menuDate,
  } = recipe;
  return { rhash, label, imageUrl, shareAs, id, menuDate };
};

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]} type="SECONDARY">
    <View style={styles.rList}>
      <Text style={styles.mDate}>{item.menuDate}</Text>
      <Text style={[styles.label]}>{item.label}</Text>
    </View>
  </TouchableOpacity>
);

const Home = () => {
  const today = moment().format("MMM DD yyyy");
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const [dateVal, setDate] = useState(new Date());
  const [recipeData, setRecipeData] = useState([]);
  const [selectedSA, setSelectedSA] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const getMenuItems = async (newVal) => {
    const result = await axios(
      `${kBaseUrl}/user/${uid}/date?start_date=${newVal}`
    );
    const res = result.data.map(recipeApiToJson);
    setRecipeData(res);
    return res;
  };

  useEffect(() => {
    const loadRecipes = async () => {
      setDate(today);
      const result = await axios(
        `${kBaseUrl}/user/${uid}/date?start_date=${today}`
      );
      const res = result.data.map(recipeApiToJson);
      setRecipeData(res);
    };
    loadRecipes();
  }, []);

  const handleDateChange = (val) => {
    val = val.toString();
    const newVal = val.slice(4, 16).trim();
    console.log(`newVal: ${newVal}`);
    const newRecipes = getMenuItems(newVal);
    setDate(newVal);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.datePicker}>
        <CalendarStrip
          scrollable
          startingDate={moment().format("MMM DD yyyy")}
          style={{ height: 150, paddingTop: 20, paddingBottom: 20 }}
          calendarColor={"#246A73"}
          calendarHeaderStyle={{ color: "#F3DFC1" }}
          markedDates={markedDatesArray}
          dateNumberStyle={{ color: "#F3DFC1" }}
          dateNameStyle={{ color: "#F3DFC1" }}
          highlightDateNumberStyle={{ color: "#F3DFC1" }}
          highlightDateNameStyle={{ color: "#F3DFC1" }}
          daySelectionAnimation={{
            type: "background",
            duration: 200,
            highlightColor: "#160F29",
          }}
          onDateSelected={(val) => handleDateChange(val)}
          selectedDate={dateVal}
        />
      </View>
      <View style={styles.rList}>
        <FlatList
          data={recipeData}
          renderItem={({ item }) => {
            if (item.label === "No menu item") {
              return (
                <View style={styles.container}>
                  <Item
                    item={item}
                    onPress={() => Alert.alert("No menu item")}
                  />
                </View>
              );
            } else {
              markedDatesArray.push({
                date: item.menuDate,
                dots: [
                  {
                    color: "#160F29",
                    selectedColor: "#160F29",
                  },
                ],
              });
              return (
                <View style={styles.container}>
                  <Item
                    item={item}
                    onPress={async () => {
                      await Linking.openURL(item.shareAs);
                    }}
                  />
                </View>
              );
            }
          }}
          keyExtractor={(item) => item.rhash}
          extraData={selectedSA}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  datePicker: {
    flex: 1,
    width: 375,
  },
  rList: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
    justifyContent: "flex-start",
  },
  img: {
    width: 100,
    height: 100,
    margin: 20,
    resizeMode: "contain",
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
  mDate: {
    marginRight: 10,
    fontSize: 20,
  },
});

export default Home;
