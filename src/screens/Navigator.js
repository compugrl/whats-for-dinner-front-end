import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Welcome from "../components/Unauthenticated/Welcome";
import Login from "../components/Unauthenticated/Login";
import SignUp from "../components/Unauthenticated/SignUp";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";

import ProfileScreen from "../screens/ProfileScreen";
import ViewRecipe from "../components/Authenticated/ViewRecipe";
import AddIngredient from "../components/Authenticated/AddIngredient";
import IngredientList from "../components/Authenticated/IngredientList";

const Navigator = () => {
  const { currentUser } = useContext(AuthContext);
  const Separator = () => <View style={styles.separator} />;
  const Tab = createMaterialTopTabNavigator();
  const Stack = createNativeStackNavigator();

  function MyBackButton() {
    const navigation = useNavigation();
    const size = 48;
    return (
      <Pressable style={styles.icons} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={size} />
      </Pressable>
    );
  }

  function MyShopButton() {
    const navigation = useNavigation();
    const size = 48;
    return (
      <Pressable
        style={styles.icons}
        onPress={() => navigation.navigate("AddScreen")}
      >
        <Ionicons name="cart" size={size} />
      </Pressable>
    );
  }

  function RecipeScreen({ route }) {
    return (
      <SafeAreaView
        style={{
          flex: 2,
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        <View style={styles.topBar}>
          <MyBackButton />
          <MyShopButton />
          <Separator />
        </View>
        <View style={styles.recipeScr}>
          <ViewRecipe recipe={route.params} />
        </View>
      </SafeAreaView>
    );
  }

  function AddScreen({ route }) {
    return (
      <SafeAreaView
        style={{
          flex: 2,
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        <View style={styles.topBar}>
          <MyBackButton />
          <Separator />
        </View>
        <View style={styles.recipeScr}>
          <AddIngredient rhash={route.params} />
        </View>
      </SafeAreaView>
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
            } else if (route.name == "Recipe") {
              iconName = "ios-information-circle-outline";
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
        <Tab.Screen name="AddScreen" component={AddScreen} />
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
      <Stack.Navigator
        screenOptions={{
          headerTitle: "What's For Dinner?",
          headerTintColor: "#F3DFC1",
          orientation: "portrait",
          headerStyle: { backgroundColor: "#160F29" },
        }}
      >
        <Stack.Group>
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }
  return currentUser ? <AppStack /> : <AuthStack />;
};

const styles = StyleSheet.create({
  topBar: {
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  recipeScr: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
  },
  separator: {
    marginVertical: 20,
    width: "100%",
    alignSelf: "center",
    borderBottomColor: "#246A73",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleText: {
    textAlign: "left",
    fontSize: 20,
  },
  icons: {
    marginLeft: 20,
  },
});

export default Navigator;
