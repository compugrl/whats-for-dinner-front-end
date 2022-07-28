import * as React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import RecipeList from "./recipeList";
import Recipe from "./recipe";

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
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(true);
  const [dayVal, setDayVal] = React.useState(1);
  const days = [1, 2, 3, 4, 5, 6, 7];

  const [recipeData, setRecipeData] = React.useState([]);
  const [recipeNum, setRecipeId] = React.useState(0);

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
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
    }
    <Button onPress={() => setShow(false)} title="Close calendar" />;
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setShow(true);
    showMode("date");
  };

  return (
    <View>
      <Button onPress={showDatepicker} title="Choose a date to see menu" />
      {show && <DateTimePicker value={date} mode={mode} onChange={onChange} />}
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
      <Text>Days selected: {dayVal}</Text>
      <RecipeList recipes={recipeData} onSelectRecipe={handleRecipe} />
    </View>
  );
};

export default Home;
