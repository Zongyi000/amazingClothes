import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { useColorScheme, AppearanceProvider } from 'react-native-appearance';
import Discover from "./components/Discover";
import Top10BestSeller from "./components/Top10BestSeller";
import AddNew from "./components/AddNew";
import MyProfile from "./components/MyProfile";
import AddReview from "./components/AddReview";

// const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs({ navigation}) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Add New"
        component={AddNew}
        options={{
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate("MyProfile");
              }}
              title="MyProfile"
              color="#000"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Top10 Best Seller"
        component={Top10BestSeller}
        options={{
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate("MyProfile");
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
                navigation.navigate("MyProfile");
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Back to Home" component={HomeTabs} />

        <Stack.Screen name="MyProfile" component={MyProfile} />

        <Stack.Screen name="AddReview" component={AddReview} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
