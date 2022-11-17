import  { Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import AddNew from "./components/AddNew";
import Discover from "./components/Discover";
import MyProfile from "./components/MyProfile";
import Top10BestSeller from "./components/Top10BestSeller";
import AddReview from "./components/AddReview";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs({ navigation, route }) {
  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Add New"
        component={AddNew}
        options={{
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate("MyProfile", { importance: 2 });
              }}
              title="MyProfile"
              color="#000"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate("MyProfile", { importance: 1 });
              }}
              title="MyProfile"
              color="#000"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Top10BestSeller"
        component={Top10BestSeller}
        options={{
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate("MyProfile", { importance: 1 });
              }}
              title="MyProfile"
              color="#000"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  switch (routeName) {
    case "Add New":
      return "Add New";
    case "Discover":
      return "Discover";
    case "Top10BestSeller":
        return "Top10BestSeller";  
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Back"
          component={HomeTabs}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerShown: false,
          })
        }
        />

        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
            headerStyle: { backgroundColor: "#995099" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen
          name="AddReview"
          component={AddReview}
          options={{
            headerStyle: { backgroundColor: "#995099" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
