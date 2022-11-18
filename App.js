import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import AddNew from './components/AddNew';



export default function App() {
  const Stack = createNativeStackNavigator();

  function rightButton () {
    return (
      <Button
        title=""
        onPress={() => {}}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#995099" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerShown: false
        }}
      >
        <Stack.Screen
          name="AddNew"
          component={AddNew}
          options={({ route, navigation }) => {
            return { 
              headerRight: rightButton
            }
          }}
        />
        {/* <Stack.Screen name="ExpenseItem Details" component={ExpenseItemDetails} />
        <Stack.Screen name="AddExpense" component={AddExpense} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
