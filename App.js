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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Sharing from "expo-sharing";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SplashScreen from "./src/screens/splashScreen";
import SignUpScreen from "./src/screens/signUpScreen";
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

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-information-circle-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "ios-document" : "ios-search";
          } else if (route.name == "Favorites") {
            iconName = focused ? "ios-infinite" : "ios-heart";
          } else if (route.name == "Shopping") {
            iconName = focused ? "ios-list" : "ios-card";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#354259",
        tabBarInactiveTintColor: "#CDC2AE",
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
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading screen will be unmounted and thrown away.
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
      <SafeAreaView>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
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
          <Stack.Navigator>
            {state.isLoading ? (
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : state.userToken == null ? (
              <Stack.Screen
                name="SignIn"
                component={LoginScreen}
                options={{
                  title: "Sign in",
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
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
    justifyContent: "space-between",
  },
  login: {
    flex: 0.75,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#354259",
    width: 500,
    margin: 20,
    padding: 5,
  },
  uName: {
    flex: 0.25,
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    color: "#354259",
    width: 400,
    height: 25,
    margin: 10,
  },
  pWord: {
    flex: 0.25,
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    color: "#354259",
    width: 400,
    height: 25,
    margin: 10,
  },
  img: {
    alignSelf: "center",
    width: 150,
    height: 150,
    margin: 20,
  },
});

export default App;
