import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Welcome from "../components/Unauthenticated/Welcome";
import Login from "../components/Unauthenticated/Login";
import SignUp from "../components/Unauthenticated/SignUp";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "./SearchScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";

import ProfileScreen from "../screens/ProfileScreen";
import GetIngr from "../components/Authenticated/GetIngr";
import SetFavorite from "../components/Authenticated/SetFavorite";
import SelectList from "../components/Authenticated/GetIngr";
import Search from "../components/Authenticated/Search";
import GetFaves from "../components/Authenticated/GetFaves";
import SetMenu from "../components/Authenticated/SetMenu";

function Navigator() {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;

  const navigation = useNavigation();
  const Separator = () => <View style={styles.separator} />;
  const size = 48;
  const TopTab = createMaterialTopTabNavigator();
  const BtmTab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function MyBackButton() {
    return (
      <Pressable
        style={styles.icons}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="arrow-back" size={size} />
      </Pressable>
    );
  }

  function FavoritesScreen() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <GetFaves />
        </View>
      </SafeAreaView>
    );
  }

  function RecipeScreen() {
    return null;
  }

  function GetIngrScr() {
    //temp demo data
    const rhash = "07baa24e5b67f52e3642b79c34c0fe19";
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bar}>
          <MyBackButton />
          <Separator />
        </View>
        <View style={styles.recipeScr}>
          <GetIngr rhash={rhash} />
        </View>
      </SafeAreaView>
    );
  }

  function AddToMenu({ route }) {
    let { id, label } = route.params;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bar}>
          <SetMenu id={id} label={label} />
        </View>
      </SafeAreaView>
    );
  }

  function HomeTabs() {
    return (
      <TopTab.Navigator
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
        <TopTab.Screen name="Home" component={HomeScreen} />
        <TopTab.Screen name="Search" component={SearchScreen} />
        <TopTab.Screen name="Favorites" component={FavoritesScreen} />
        <TopTab.Screen name="Shopping" component={ShoppingListScreen} />
      </TopTab.Navigator>
    );
  }

  function RecipeTabs({ route }) {
    let { shareAs, menuDate, label, id, rhash } = route.params;
    return (
      <BtmTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;
            const iconSize = 48;

            if (route.name === "View") {
              iconName = "open";
            } else if (route.name === "Shop") {
              iconName = "cart";
            } else if (route.name === "SetFave") {
              iconName = "heart";
            } else if (route.name === "Menu") iconName = "add-circle-outline";
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
          tabBarActiveTintColor: "#246A73",
          tabBarInactiveTintColor: "#CDC2AE",
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <BtmTab.Screen
          name="View"
          component={RecipeScreen}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => WebBrowser.openBrowserAsync(shareAs)}
              />
            ),
          }}
        />
        <BtmTab.Screen
          name="Shop"
          component={GetIngrScr}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => navigation.navigate("GetIngrScr")}
              />
            ),
          }}
        />
        <BtmTab.Screen
          name="Menu"
          component={AddToMenu}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() =>
                  navigation.navigate("AddToMenu", {
                    menuDate: menuDate,
                    id: id,
                    label: label,
                  })
                }
              />
            ),
          }}
        />
      </BtmTab.Navigator>
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
        style={styles.icons}
        screenOptions={{
          headerTitle: "What's For Dinner?",
          headerTintColor: "#F3DFC1",
          orientation: "portrait",
          headerStyle: { backgroundColor: "#160F29" },
          initialRouteName: "HomeTabs",
        }}
      >
        <Stack.Group>
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
        </Stack.Group>
        <Stack.Group style={styles.icons}>
          <Stack.Screen name="RecipeTabs" component={RecipeTabs} />
          <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
          <Stack.Screen name="GetIngrScr" component={GetIngrScr} />
          <Stack.Screen name="AddToMenu" component={AddToMenu} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }
  return currentUser ? <AppStack /> : <AuthStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    fontSize: 20,
    marginTop: StatusBar.currentHeight || 0,
  },
  bar: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  recipeScr: {
    flex: 1,
    justifyContent: "space-around",
  },
  separator: {
    flex: 0.2,
    justifyContent: "flex-start",
    width: "80%",

    borderBottomColor: "#246A73",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleText: {
    textAlign: "left",
    fontSize: 20,
  },
  icons: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 20,
    padding: 50,
  },
});

export default Navigator;
