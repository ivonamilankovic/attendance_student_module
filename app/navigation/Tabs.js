import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import AttendanceListScreen from "../screens/AttendanceListScreen";
import ScanQrCodeScreen from "../screens/ScanQrCodeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          height: 55,
        },
        tabBarItemStyle: {
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        },
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#bfd7ea",
        tabBarInactiveBackgroundColor: "transparent",
        tabBarActiveTintColor: "#0b3954",
        tabBarActiveBackgroundColor: "#bfd7ea",
      }}
    >
      <Tab.Screen
        name="home"
        component={AttendanceListScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={require("../assets/graph.png")}
                style={{
                  width: focused ? 30 : 25,
                  height: focused ? 30 : 25,
                  tintColor: focused ? "#0b3954" : "#bfd7ea",
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="scan"
        component={ScanQrCodeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={require("../assets/scan.png")}
                style={{
                  width: focused ? 30 : 25,
                  height: focused ? 30 : 25,
                  tintColor: focused ? "#0b3954" : "#bfd7ea",
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={require("../assets/user.png")}
                style={{
                  width: focused ? 30 : 25,
                  height: focused ? 30 : 25,
                  tintColor: focused ? "#0b3954" : "#bfd7ea",
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
