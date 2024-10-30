import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import MyRecipesScreen from "../screens/MyRecipesScreen";
import AddRecipeScreen from "../screens/AddRecipeScreen";
import MyRecipeDetailsScreen from "../screens/MyRecipeDetailsScreen";
import FavoritesScreen from "../screens/FavouriteScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
        <Stack.Screen name="MyRecipes" component={MyRecipesScreen} />
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        <Stack.Screen name="MyRecipeDetails" component={MyRecipeDetailsScreen} />
        <Stack.Screen name="FavouriteScreen" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}