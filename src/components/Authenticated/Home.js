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
} from "react-native";
import axios from "axios";
import { format } from "date-fns";
import ViewRecipe from "./ViewRecipe";
import Sharing from "./Sharing";
import Collapsible from "react-native-collapsible";
import CalendarStrip from "react-native-calendar-strip";
import { AuthContext } from "../../context/AuthContext";

const kBaseUrl = "https://wfd-back-end.herokuapp.com/ur";

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
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <View style={styles.rList}>
      <Text style={styles.mDate}>{item.menuDate}</Text>
      <Text style={[styles.label]}>{item.label}</Text>
    </View>
  </TouchableOpacity>
);

const Home = ({ route, navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const [dateVal, setDate] = useState(new Date());
  const [recipeData, setRecipeData] = useState([]);
  const [selectedSA, setSelectedSA] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const getMenuItems = async () => {
    const result = await axios(
      `${kBaseUrl}/user/${uid}/date?start_date=${dateVal}`
    );

    return result.data.map(recipeApiToJson);
  };

  useEffect(() => {
    const loadRecipes = async () => {
      const today = format(new Date(), "MMM dd yyyy");
      setDate(today);
      const result = await axios(
        `${kBaseUrl}/user/${uid}/date?start_date=${today}`
      );
      const res = result.data.map(recipeApiToJson);
      setRecipeData(res);
      console.log("Recipes: " + JSON.stringify(recipeData));
    };
    loadRecipes();
  }, []);

  const handleRecipe = (item) => {
    setSelectedSA(item.shareAs);
    setSelectedLabel(item.label);
    console.log(`Label: ${selectedLabel}`);
  };

  const handleDateChange = (event, date) => {
    const currentDate = date;
    setDate(currentDate);
    const newRecipes = getMenuItems(uid, dateVal);
    setRecipeData(newRecipes);
  };

  const renderItem = ({ item }) => {
    if (item.label === "No menu item") {
      return (
        <View style={styles.container}>
          <Item
            item={item}
            onPress={() => Alert.alert("No menu item for this day")}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Item item={item} onPress={handleRecipe(item)} />
        </View>
      );
    }
  };

  const markedDatesArray = [
    {
      date: new Date(),
      dots: [
        {
          color: "#160F29",
          selectedColor: "#160F29",
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.datePicker}>
        <CalendarStrip
          scrollable
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
          onDateSelected={handleDateChange}
        />
      </View>
      <View style={styles.rList}>
        <FlatList
          data={recipeData}
          renderItem={renderItem}
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
  mDate: {
    marginRight: 10,
    fontSize: 20,
  },
});

export default Home;
