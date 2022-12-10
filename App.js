import  { Button, Linking } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  Link
} from "@react-navigation/native";
import AddNew from "./components/AddNew";
import Discover from "./components/Discover";
import MyProfile from "./components/MyProfile";
import Top10BestSeller from "./components/Top10BestSeller";
import AddReview from "./components/AddReview";
import ReviewScreen from "./components/ReviewScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from "./components/Login";
import Signup from "./components/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebase-setup";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Notifications from "expo-notifications";

// import Map from "./components/Map";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    };
  },
});

export default function App() {

  const verifyPermission = async () => {
    const permissionStatus = await Notifications.getPermissionsAsync();
    if (permissionStatus.granted) {
      return true;
    }
    const requestedPermission = await Notifications.requestPermissionsAsync({
      ios: {
        allowBadge: true,
      },
    });
    return requestedPermission.granted;
  };

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notificaftion) => {
        // console.log("notification received ", notificaftion);
      }
    );
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      async (notificationResponse) => {
        // console.log(
        //   "notification interacted ",
        //   notificationResponse.notification.request.content.data
        // );
        if (notificationResponse.notification.request.content.data.url) {
          try {
            await Linking.openURL(
              notificationResponse.notification.request.content.data.url
            );
          } catch (err) {
            console.log(err);
          }
        }
      }
    );
    return () => {
      subscription.remove();
      subscription2.remove();
    };
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });
  });

  useEffect(() => {
    const getPushToken = async () => {
      const hasPermission = verifyPermission();
      if (!hasPermission) {
        return;
      }
      try {
        const token = await Notifications.getExpoPushTokenAsync();
        // console.log(token);
      } catch (err) {
        console.log("push token ", err);
      }
    };
    getPushToken();
  }, []);

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

      <Stack.Screen
        name="ReviewScreen"
        component={ReviewScreen}
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

