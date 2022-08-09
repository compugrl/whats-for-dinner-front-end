import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

import Welcome from "../components/Unauthenticated/Welcome";
import Login from "../components/Unauthenticated/Login";
import SignUp from "../components/Unauthenticated/SignUp";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";

import ProfileScreen from "../screens/ProfileScreen";
import RecipeScreen from "../screens/RecipeScreen";

const Navigator = () => {
  const { currentUser } = useContext(AuthContext);
  const Tab = createMaterialTopTabNavigator();
  const Stack = createStackNavigator();

  function LogoTitle() {
    return (
      <Image
        style={{ width: 50, height: 50 }}
        source={require("../../assets/splash.png")}
      />
    );
  }

  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;
            const iconSize = 24;

            if (route.name === "Home") {
              iconName = "ios-home";
            } else if (route.name === "Search") {
              iconName = "ios-search";
            } else if (route.name == "Favorites") {
              iconName = "ios-heart";
            } else if (route.name == "Shopping") {
              iconName = "ios-cart";
            }
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
          tabBarActiveTintColor: "#246A73",
          tabBarInactiveTintColor: "#CDC2AE",
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Shopping" component={ShoppingListScreen} />
      </Tab.Navigator>
    );
  }

  function AuthStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    );
  }

  function AppStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
      </Stack.Navigator>
    );
  }
  return currentUser ? <AppStack /> : <AuthStack />;
};

export default Navigator;
