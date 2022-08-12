import "react-native-gesture-handler";
import React, { useContext } from "react";
import { styles } from "./assets/styles";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigator from "./src/screens/Navigator";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AuthProvider } from "./src/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <AuthProvider style={styles.container}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
