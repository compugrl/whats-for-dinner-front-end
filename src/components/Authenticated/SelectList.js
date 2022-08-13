import { Component, useEffect, useState, useContext } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import SelectMultiple from "react-native-select-multiple";

class SelectFood extends Component {
  foods = [
    "bacon",
    "mushroom",
    "wild rice",
    "chicken bouillon",
    "green onions",
  ];
  state = { foods: [] };

  onSelectionsChange = (foods) => {
    this.setState({ foods });
  };

  render() {
    return (
      <View>
        <SelectMultiple
          items={foods}
          selectedItems={this.state.foodList}
          onSelectionsChange={this.onSelectionsChange}
        />
      </View>
    );
  }
}

const SelectList = ({ foods }) => {
  return (
    <View>
      <SelectFood foods={foods} />
    </View>
  );
};

export default SelectList;
