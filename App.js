import "react-native-gesture-handler";
import * as React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Sharing from "expo-sharing";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import HomeScreen from "./src/screens/homeScreen";
import SearchScreen from "./src/screens/searchScreen";
import ProfileScreen from "./src/screens/profileScreen";
import RecipeScreen from "./src/screens/recipeScreen";
import FavoritesScreen from "./src/screens/favoritesScreen";
import ShoppingListScreen from "./src/screens/shoppingListScreen";

const AuthContext = React.createContext();
const Tab = createMaterialTopTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          const iconSize = 24;

          if (route.name === "Home") {
            iconName = "ios-home";
          } else if (route.name === "Search") {
            iconName = "ios-search";
          } else if (route.name == "Favorites") {
            iconName = "ios-heart";
          } else if (route.name == "Shopping") {
            iconName = "ios-card";
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

const Stack = createStackNavigator();

function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  function LoginScreen({ navigation }) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { signIn } = React.useContext(AuthContext);
    const { signOut } = React.useContext(AuthContext);

    <Button title="Sign out" onPress={signOut} />;

    return (
      <SafeAreaView style={styles.login}>
        <Image source={require("./assets/splash.png")} style={styles.img} />
        <TextInput
          style={styles.uName}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.pWord}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          color="#160F29"
          title="Sign in"
          onPress={() => signIn({ username, password })}
        />
      </SafeAreaView>
    );
  }

  return (
    <AuthContext.Provider value={authContext} style={styles.container}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {state.userToken == null ? (
              <>
                <Stack.Screen
                  name="SignIn"
                  component={LoginScreen}
                  options={{
                    title: "Sign in",
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                  }}
                />
              </>
            ) : (
              // User is signed in
              <>
                <Stack.Screen name=" " component={HomeTabs} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    fontSize: 20,
  },
  login: {
    flex: 0.75,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#246A73",
    width: 400,
    margin: 20,
    padding: 5,
  },
  uName: {
    flex: 0.25,
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "whitesmoke",
    color: "#246A73",
    width: 350,
    height: 35,
    margin: 10,
    fontSize: 20,
  },
  pWord: {
    flex: 0.25,
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "whitesmoke",
    color: "#246A73",
    width: 350,
    height: 35,
    margin: 10,
    fontSize: 20,
  },
  img: {
    alignSelf: "center",
    width: 200,
    height: 200,
    margin: 20,
  },
});

export default App;
