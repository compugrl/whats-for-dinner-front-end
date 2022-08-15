import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Linking, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ViewRecipe({ id, label, rhash, shareAs }) {
  const navigation = useNavigation();
  const [share, setShare] = useState(shareAs);
  const [hash, setRhash] = useState(rhash);
  const [rId, setId] = useState(id);
  const [rLabel, setLabel] = useState(label);

  return (
    <SafeAreaView>
      <View>
        {async () => {
          await Linking.openURL(url);
        }}
      </View>
    </SafeAreaView>
  );
}

export default ViewRecipe;
