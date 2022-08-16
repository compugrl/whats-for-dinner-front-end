import React from "react";
import { View, Share, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Sharing = ({ shareAs, label }) => {
  const nameStr = JSON.stringify(label);
  const size = 48;
  async () => {
    try {
      const result = await Share.share({
        message: nameStr + "\n" + shareAs,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return console.log("Item Shared");
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    margin: 5,
  },
});

export default Sharing;
