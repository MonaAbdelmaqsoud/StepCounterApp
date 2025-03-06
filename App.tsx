import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Activity from "./screens/Activity";
import History from "./screens/History";
import Profile from "./screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/styles";
import { useEffect, useState } from "react";
import SplashScreen from "./screens/SplashScreen";
import { Provider } from "react-redux";
import store from "./store/store";
import * as Notifications from "expo-notifications";

const BottomTabs = createBottomTabNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }, []);

  useEffect(() => {
    async function prepare() {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(true);
    }

    prepare();
  }, []);

  if (!isLoading) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <BottomTabs.Navigator
          screenOptions={{
            headerTintColor: GlobalStyles.colors.primary500,
            tabBarActiveTintColor: GlobalStyles.colors.primary500,
            tabBarStyle: { backgroundColor: GlobalStyles.colors.primary100 },
            tabBarInactiveTintColor: GlobalStyles.colors.background200,
          }}
        >
          <BottomTabs.Screen
            name="Dashboard"
            component={Home}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          />
          <BottomTabs.Screen
            name="Activity"
            component={Activity}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="pulse" size={size} color={color} />
              ),
            }}
          />
          <BottomTabs.Screen
            name="History"
            component={History}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="calendar-clear-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <BottomTabs.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
        </BottomTabs.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
