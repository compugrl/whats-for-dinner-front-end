import "react-native-gesture-handler";
import React, { createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "../../screens/Profile";

const AuthContext = createContext();

function AuthenticatedApp({ navigation }) {
  const { user } = useAuth();

  return (
    <AuthContext.Provider style={styles.container}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <>
              <Stack.Screen name=" " component={HomeTabs} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </>
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
});

export { AuthenticatedApp };
