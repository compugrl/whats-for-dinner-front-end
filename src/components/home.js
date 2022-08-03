import * as React from "react";
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
import RecipeList from "./recipeList";
import RecipeScreen from "../screens/recipeScreen";
import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";

const kBaseUrl = "https://whats-for-dinner-back-end.herokuapp.com";

const recipeApiToJson = (recipe) => {
  const {
    hash,
    label,
    recipe_id: recipeId,
    image_tnail: imageTnail,
    image_sm: imageSm,
  } = recipe;
  return { hash, label, imageTnail, imageSm, recipeId };
};

// Change later to retrieve user id from DB
const userId = 1;

const getRecipeData = () => {
  return axios
    .get(`${kBaseUrl}/users/${userId}/recipes`)
    .then((response) => {
      return response.data.map(recipeApiToJson);
    })
    .catch((err) => {
      console.log(err);
    });
};

const Home = (props) => {
  let iconName;
  const [dateVal, setDate] = React.useState(new Date());
  const [recipeData, setRecipeData] = React.useState([]);

  const loadRecipes = () => {
    getRecipeData().then((recipes) => {
      if (isMounted) setRecipeData(recipes);
    });
  };

  const handleRecipe = () => {
    Alert.alert("Recipe button pressed");
    <RecipeScreen />;
  };

  React.useEffect(() => {
    let isMounted = true;
    getRecipeData().then((recipes) => {
      if (isMounted) setRecipeData(recipes);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDateChange = (event, date) => {
    const currentDate = date;
    setDate(currentDate);
  };

  const markedDatesArray = [
    {
      date: new Date(),
      dots: [
        {
          color: "#C2DED1",
          selectedColor: "#ECE5C7",
        },
      ],
    },
  ];

  return (
    <SafeAreaView>
      <View style={styles.datePicker}>
        <CalendarStrip
          scrollable
          style={{ height: 200, paddingTop: 20, paddingBottom: 10 }}
          calendarColor={"#354259"}
          calendarHeaderStyle={{ color: "#ECE5C7" }}
          markedDates={markedDatesArray}
          dateNumberStyle={{ color: "#ECE5C7" }}
          dateNameStyle={{ color: "#ECE5C7" }}
          highlightDateNumberStyle={{ color: "#354259" }}
          highlightDateNameStyle={{ color: "#354259" }}
          daySelectionAnimation={{
            type: "background",
            duration: 200,
            highlightColor: "#C2DED1",
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
    justifyContent: "space-between",
  },
  datePicker: {
    flex: 1,
  },
  rList: {
    flex: 1,
    justifyContent: "space-between",
    width: 400,
  },
  img: {
    alignSelf: "center",
    width: 150,
    height: 150,
    margin: 20,
  },
  textStyle: {
    color: "#ECE5C7",
    fontWeight: "bold",
  },
  buttonStyle: {
    borderColor: "#C2DED1",
    backgroundColor: "#354259",
    borderWidth: 2,
    borderRadius: 10,
    width: 450,
    alignSelf: "center",
    margin: 20,
  },
});

export default Home;
