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
import Slider from "@react-native-community/slider";

const Home = () => {
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(true);
  const [sliderVal, setSliderVal] = React.useState(1);

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
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={1}
        maximumValue={7}
        step={2}
        minimumTrackTintColor="#C2DED1"
        maximumTrackTintColor="#354259"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#F5FCFF",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    width: "100%",
    marginVertical: 20,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    fontSize: 20,
  },
  sliderWidget: {
    marginVertical: 30,
  },
});

export default Home;
