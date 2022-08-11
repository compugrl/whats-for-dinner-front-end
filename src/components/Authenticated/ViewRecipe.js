import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const shareAs =
  "http://www.edamam.com/recipe/creamy-and-healthy-chicken-enchiladas-la-b73f462b24815d573c12d8543c078a28/chicken";

class RecipeView extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView source={{ uri: shareAs }} />
      </SafeAreaView>
    );
  }
}

function ViewRecipe({ shareAs }) {
  const shareStr = JSON.stringify(shareAs);
  const [share, setShare] = useState(shareStr);
  const size = 48;
  const onView = async () => {
    try {
      <RecipeView shareAs={shareAs} />;
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.buttonStyle}>
      <TouchableOpacity onPress={onView} title="View">
        <Ionicons
          name="ios-information-circle-outline"
          size={size}
          color="#160F29"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: 50,
    height: 50,
    margin: 5,
  },
});

export default ViewRecipe;
