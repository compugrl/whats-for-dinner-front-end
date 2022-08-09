import { useEffect, useState, useContext } from "react";
import {
  Alert,
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { format } from "date-fns";
import RecipeList from "./RecipeList";
import RecipeScreen from "../../screens/RecipeScreen";
import CalendarStrip from "react-native-calendar-strip";
import { AuthContext } from "../../context/AuthContext";

const kBaseUrl = "http://wfd-back-end.herokuapp.com";

const recipeApiToJson = (recipe) => {
  const { rhash, label, image_url: imageUrl, shareAs } = recipe;
  return { rhash, label, imageUrl, shareAs };
};

const getMenuItems = (dateVal) => {
  return axios
    .get(`${kBaseUrl}/ur/user/${uid}/date?menu_date=${dateVal}`)
    .then((response) => {
      return response.data.map(recipeApiToJson);
    })
    .catch((err) => {
      console.log(err);
    });
};

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const [dateVal, setDate] = useState(new Date());
  const [recipeData, setRecipeData] = useState([]);

  const handleRecipe = (shareAs) => {
    Alert.alert(shareAs);
  };

  useEffect(() => {
    const loadRecipes = async () => {
      const today = format(new Date(), "MMM dd yyyy");
      const result = await axios(
        `https://wfd-back-end.herokuapp.com/ur/user/${uid}/date?start_date=${today}`
      );
      console.log(result);
      setRecipeData(result.data);
    };
    loadRecipes();
  }, []);

  const handleDateChange = (event, date) => {
    const currentDate = date;
    setDate(currentDate);
    const newRecipes = getMenuItems(dateVal);
    setRecipeData(newRecipes);
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
        <RecipeList recipes={recipeData} onSelectRecipe={handleRecipe} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  datePicker: {
    flex: 1,
    width: 375,
  },
  rList: {
    flex: 2,
    justifyContent: "space-evenly",
    width: 400,
    justifyContent: "flex-start",
  },
  img: {
    alignSelf: "center",
    width: 150,
    height: 150,
    margin: 20,
  },
});

export default Home;
