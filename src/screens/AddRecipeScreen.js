import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from 'twrnc';
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const STORAGE_KEY = '@my_recipes';

export default function AddRecipeScreen() {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const validateInputs = () => {
    if (!recipeName.trim()) {
      Alert.alert("Error", "Please enter a recipe name");
      return false;
    }
    if (!description.trim()) {
      Alert.alert("Error", "Please enter a description");
      return false;
    }
    if (!ingredients.trim()) {
      Alert.alert("Error", "Please enter ingredients");
      return false;
    }
    if (!instructions.trim()) {
      Alert.alert("Error", "Please enter instructions");
      return false;
    }
    return true;
  };

  const handleSaveRecipe = async () => {
    if (!validateInputs()) return;
    
    setLoading(true);
    try {
      // Format ingredients as an array, removing empty items
      const ingredientsList = ingredients
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      const newRecipe = {
        id: Date.now().toString(),
        name: recipeName.trim(),
        description: description.trim(),
        ingredients: ingredientsList,
        instructions: instructions.trim(),
        createdAt: new Date().toISOString(),
        imageUri: null, // You can add image support later
      };

      // Load existing recipes
      const existingRecipesJson = await AsyncStorage.getItem(STORAGE_KEY);
      const existingRecipes = existingRecipesJson ? JSON.parse(existingRecipesJson) : [];
      
      // Add new recipe
      const updatedRecipes = [...existingRecipes, newRecipe];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));

      Alert.alert(
        "Success",
        "Recipe saved successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("MyRecipes", { newRecipe })
          }
        ]
      );
    } catch (error) {
      console.error("Error saving recipe:", error);
      Alert.alert("Error", "Failed to save recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1`}
    >
      <ScrollView style={tw`flex-1 bg-white`}>
        <View style={tw`p-4 pt-10`}>
          {/* Back Button */}
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={tw`p-2 rounded-full bg-white mb-4`}
          >
            <ChevronLeftIcon size={28} color="#f64e32" strokeWidth={2.5} />
          </TouchableOpacity>
          
          <Text style={tw`text-2xl font-bold mb-6`}>Add New Recipe</Text>
          
          <View style={tw`space-y-4`}>
            <View>
              <Text style={tw`text-gray-600 mb-1`}>Recipe Name</Text>
              <TextInput
                placeholder="Enter recipe name"
                style={tw`border border-gray-300 rounded-lg p-3`}
                value={recipeName}
                onChangeText={setRecipeName}
                maxLength={50}
              />
            </View>

            <View>
              <Text style={tw`text-gray-600 mb-1`}>Description</Text>
              <TextInput
                placeholder="Brief description of your recipe"
                style={tw`border border-gray-300 rounded-lg p-3`}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                maxLength={200}
              />
            </View>

            <View>
              <Text style={tw`text-gray-600 mb-1`}>Ingredients</Text>
              <TextInput
                placeholder="Enter ingredients, separated by commas"
                style={tw`border border-gray-300 rounded-lg p-3`}
                value={ingredients}
                onChangeText={setIngredients}
                multiline
                numberOfLines={4}
              />
              <Text style={tw`text-gray-500 text-xs mt-1`}>
                Example: 2 cups flour, 1 tsp salt, 3 eggs
              </Text>
            </View>

            <View>
              <Text style={tw`text-gray-600 mb-1`}>Instructions</Text>
              <TextInput
                placeholder="Step by step instructions"
                style={tw`border border-gray-300 rounded-lg p-3`}
                value={instructions}
                onChangeText={setInstructions}
                multiline
                numberOfLines={6}
              />
            </View>
          </View>

          <TouchableOpacity
            style={tw`bg-[#f64e32] p-4 rounded-full mt-6 items-center ${loading ? 'opacity-50' : ''}`}
            onPress={handleSaveRecipe}
            disabled={loading}
          >
            <Text style={tw`text-white font-bold`}>
              {loading ? 'Saving...' : 'Save Recipe'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}