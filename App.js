import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Discover from "./components/Discover";
import Top10BestSeller from "./components/Top10BestSeller";
import AddNew from "./components/AddNew";
import MyProfile from "./components/MyProfile";
import AddReview from "./components/AddReview";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
      <Tab.Screen
        name="Top10BestSeller"
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
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Back"
          component={HomeTabs}
          options={({ route }) => ({
            headerShown: false,
            headerRight: () => (
              <Button
                onPress={() => {
                }}
                title="Exit"
                color="#000"
              />
            ),
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
