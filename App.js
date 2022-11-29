import  { Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from "./components/Login";
import Signup from "./components/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebase-setup";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// import Map from "./components/Map";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });
  });
  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  };

  const AppStack = () => {
    return (
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
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="AddReview"
        component={AddReview}
        options={{
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
    );
  };
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  return (
    <NavigationContainer>
      {isUserAuthenticated ? AppStack() : AuthStack()}
    </NavigationContainer>
  );
}


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
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="image-plus" size={size} color={color} />
          )
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
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant" size={size} color={color} />
          )
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
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="fire" size={size} color={color} />
          )
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

