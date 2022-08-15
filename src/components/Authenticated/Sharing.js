import React from "react";
import { View, Share, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Sharing = ({ url, title }) => {
  const nameStr = JSON.stringify(title);
  const size = 48;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: nameStr + "\n" + url,
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
  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={onShare} title="Share">
        <Ionicons name="ios-share" size={size} color="#160F29" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    margin: 5,
  },
});

export default Sharing;
