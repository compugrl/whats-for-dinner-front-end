import { useEffect, useState, useContext } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import moment from "moment";
import { styles } from "../../../assets/styles";
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
  const [dateVal, setDate] = useState(moment().format("MMM DD yyyy"));
  const [recipeData, setRecipeData] = useState([]);
  const [shareAs, setShareAs] = useState("");
  const [label, setLabel] = useState("");

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
                    onPress={() => navigation.navigate("Search")}
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
                    onPress={function () {
                      console.log(
                        "Recipe sent from Home: ",
                        item.shareAs,
                        item.label,
                        item.id,
                        item.rhash,
                        item.menuDate
                      );
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
            }
          }}
          keyExtractor={(item) => item.rhash}
          extraData={{ shareAs }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
