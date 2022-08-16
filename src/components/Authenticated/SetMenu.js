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

const SetMenu = ({ id, label }) => {
  console.log("Recipe sent to SetMenu", label);
  const today = moment().format("MMM DD yyyy");
  const navigation = useNavigation();
  const [dateVal, setDate] = useState(moment().format("MMM DD yyyy"));

  const setMenuItem = async (id, newVal) => {
    const result = await axios.patch(`${kBaseUrl}/${id}`, {
      menu_date: newVal,
    });
    return console.log(`Menu date ${newVal} set for recipe ${label}`);
  };

  const handleSetDate = (val) => {
    val = val.toString();
    const newVal = val.slice(4, 16).trim();
    const newDate = setMenuItem(id, newVal);
    setDate(newVal);
    return (
      <Text>
        Menu date {newVal} set for {label}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.datePicker}>
        <Text style={styles.item}>Select date for {label}</Text>
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
          onDateSelected={(val) => handleSetDate(val)}
          selectedDate={dateVal}
        />
      </View>
    </SafeAreaView>
  );
};

export default SetMenu;
