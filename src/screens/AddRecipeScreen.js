// AddRecipeScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from 'twrnc';
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

export default function AddRecipeScreen() {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const navigation = useNavigation();

  const handleSaveRecipe = async () => {
    if (!recipeName || !description || !ingredients || !instructions) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name: recipeName,
      description,
      ingredients: ingredients.split(",").map(ingredient => ingredient.trim()),
      instructions,
    };

    try {
      const existingRecipes = await AsyncStorage.getItem("customRecipes");
      const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];
      recipes.push(newRecipe);
      await AsyncStorage.setItem("customRecipes", JSON.stringify(recipes));
      Alert.alert("Success", "Recipe added successfully!");

      // Pass the new recipe as a parameter when navigating back
      navigation.navigate("MyRecipes", { newRecipe });
    } catch (error) {
      console.log("Error saving recipe:", error);
    }
  };

  return (
    <View style={tw`flex-1 bg-white p-4 pt-10`}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 rounded-full bg-white mb-4`}>
        <ChevronLeftIcon size={28} color="#f64e32" strokeWidth={2.5} />
      </TouchableOpacity>
      <Text style={tw`text-2xl font-bold mb-4`}>Add New Recipe</Text>
      <TextInput
        placeholder="Recipe Name"
        style={tw`border-b border-gray-300 mb-4 p-2`}
        value={recipeName}
        onChangeText={setRecipeName}
      />
      <TextInput
        placeholder="Description"
        style={tw`border-b border-gray-300 mb-4 p-2`}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Ingredients (comma-separated)"
        style={tw`border-b border-gray-300 mb-4 p-2`}
        value={ingredients}
        onChangeText={setIngredients}
      />
      <TextInput
        placeholder="Instructions"
        style={tw`border-b border-gray-300 mb-4 p-2`}
        value={instructions}
        onChangeText={setInstructions}
      />
      <TouchableOpacity
        style={tw`bg-[#f64e32] p-4 rounded-full mt-4 items-center`}
        onPress={handleSaveRecipe}
      >
        <Text style={tw`text-white font-bold`}>Save Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}
