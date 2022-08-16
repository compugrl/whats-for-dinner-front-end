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
  Share,
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

import SettingsScreen from "../screens/SettingsScreen";
import GetIngr from "../components/Authenticated/GetIngr";
import SetFavorite from "../components/Authenticated/SetFavorite";
import GetFaves from "../components/Authenticated/GetFaves";
import SetMenu from "../components/Authenticated/SetMenu";
import Sharing from "../components/Authenticated/Sharing";

function Navigator() {
  const { currentUser } = useContext(AuthContext);
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

  function ShareScreen({ route }) {
    let { shareAs, label } = route.params;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Sharing shareAs={shareAs} label={label} />
        </View>
      </SafeAreaView>
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
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>
            <Ionicons name="eye" size={size} color="#246A73" />
            To View Recipe
          </Text>
          <Text style={styles.title}>
            <Ionicons name="cart" size={size} color="#246A73" />
            To Add Ingredients to Your Shopping List
          </Text>
          <Text style={styles.title}>
            <Ionicons name="share" size={size} color="#246A73" />
            To Share Recipe
          </Text>
          <Text style={styles.title}>
            <Ionicons name="heart" size={size} color="#246A73" />
            To Add Recipe to Your Favorites
          </Text>
          <Text style={styles.title}>
            <Ionicons name="add-circle-outline" size={size} color="#246A73" />
            To Add Recipe to Your Menu
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  function GetIngrScr({ route }) {
    let { rhash } = route.params;
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

  function SetFave({ route }) {
    let { rhash, label, shareAs } = route.params;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <SetFavorite rhash={rhash} label={label} shareAs={shareAs} />
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
        style={styles.bar}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;
            const iconSize = 48;

            if (route.name === "Home") {
              iconName = "ios-home";
            } else if (route.name === "View") {
              iconName = "eye";
            } else if (route.name === "Shop") {
              iconName = "cart";
            } else if (route.name === "SetFave") {
              iconName = "heart";
            } else if (route.name === "Menu") {
              iconName = "add-circle-outline";
            } else if (route.name === "Share") iconName = "share";

            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
          tabBarActiveTintColor: "#246A73",
          tabBarInactiveTintColor: "#CDC2AE",
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <BtmTab.Screen
          style={styles.title}
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
                onPress={() =>
                  navigation.navigate("GetIngrScr", { rhash: rhash })
                }
              />
            ),
          }}
        />
        <BtmTab.Screen
          name="Share"
          component={ShareScreen}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={async () =>
                  await Share.share({ message: label + "\n" + shareAs })
                }
              />
            ),
          }}
        />
        <BtmTab.Screen
          name="SetFave"
          component={SetFave}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() =>
                  navigation.navigate("SetFave", {
                    rhash: rhash,
                    shareAs: shareAs,
                    label: label,
                  })
                }
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
          <Stack.Screen name="SetFave" component={SetFave} />
          <Stack.Screen name="Share" component={ShareScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Settings" component={SettingsScreen} />
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
    flex: 0.25,
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
  title: {
    textAlign: "left",
    fontSize: 20,
    color: "#160F29",
  },
  icons: {
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 20,
    padding: 50,
  },
});

export default Navigator;
