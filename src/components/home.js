import * as React from "react";
import {
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
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import RecipeList from "./recipeList";

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
  const [dateVal, setDate] = React.useState(new Date());
  const [dayVal, setDayVal] = React.useState(1);
  const days = [1, 2, 3, 4, 5, 6, 7];

  const [recipeData, setRecipeData] = React.useState([]);

  const loadRecipes = () => {
    getRecipeData().then((recipes) => {
      setRecipeData(recipes);
    });
  };

  const handleRecipe = (recipeId) => {
    const newNum = recipeId;
    setRecipeId(newNum);
  };

  React.useEffect(() => {
    loadRecipes();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <DateTimePicker
          style={styles.datePicker}
          value={dateVal}
          mode="date"
          onChange={onChange}
          display="inline"
        />
        <SelectDropdown
          data={days}
          defaultButtonText="Select # of days to display"
          onSelect={(selectedItem, index) => {
            setDayVal(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
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
    flexDirection: "row",
    justifyContent: "space-around",
  },
  datePicker: {
    flex: 1,
    justifyContent: "space-around",
    width: 500,
    textColor: "#354259",
  },
  rList: {
    flex: 1,
    justifyContent: "space-around",
    width: 500,
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
