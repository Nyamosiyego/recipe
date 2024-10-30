import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { CachedImage } from "../../utils/index";
import { useNavigation } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon, BookmarkIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import Loading from "../components/Loading";
import axios from "axios";
import Animated, { FadeInDown } from "react-native-reanimated";
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';

const STORAGE_KEY = '@my_recipes';

export default function RecipeScreen({ route, isDetails = false }) {
  const navigation = useNavigation();
  const [myRecipes, setMyRecipes] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(true);
  const item = route?.params?.recipe;

  // Load saved recipes when component mounts
  useEffect(() => {
    loadSavedRecipes();
  }, []);

  // Get new recipe from route params and save it
  useEffect(() => {
    if (route.params?.newRecipe) {
      saveNewRecipe(route.params.newRecipe);
    }
  }, [route.params?.newRecipe]);

  const loadSavedRecipes = async () => {
    try {
      const savedRecipes = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedRecipes) {
        setMyRecipes(JSON.parse(savedRecipes));
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
      Alert.alert('Error', 'Failed to load saved recipes');
    } finally {
      setLoading(false);
    }
  };

  const saveNewRecipe = async (newRecipe) => {
    try {
      const updatedRecipes = [...myRecipes, newRecipe];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
      setMyRecipes(updatedRecipes);
      Alert.alert('Success', 'Recipe saved successfully!');
    } catch (error) {
      console.error('Error saving recipe:', error);
      Alert.alert('Error', 'Failed to save recipe');
    }
  };

  const deleteRecipe = async (recipeIndex) => {
    try {
      const updatedRecipes = myRecipes.filter((_, index) => index !== recipeIndex);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
      setMyRecipes(updatedRecipes);
      Alert.alert('Success', 'Recipe deleted successfully!');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      Alert.alert('Error', 'Failed to delete recipe');
    }
  };

  const toggleFavorite = () => {
    setIsFavourite(!isFavourite);
    // Add your favorite toggling logic here
  };

  const renderRecipeItem = ({ item, index }) => (
    <TouchableOpacity
      style={tw`p-4 border-b border-gray-200`}
      onPress={() => navigation.navigate('MyRecipeDetails', { recipe: item })}
    >
      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center flex-1`}>
          <Image
            source={item.imageUri ? { uri: item.imageUri } : require('../../assets/images/welcome.png')}
            style={tw`w-20 h-20 rounded-lg mr-4`}
          />
          <Text style={tw`font-bold text-lg text-gray-800 flex-1`}>{item.name}</Text>
        </View>
        <TouchableOpacity 
          style={tw`p-2`}
          onPress={() => {
            Alert.alert(
              'Delete Recipe',
              'Are you sure you want to delete this recipe?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => deleteRecipe(index), style: 'destructive' }
              ]
            );
          }}
        >
          <Text style={tw`text-red-500`}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={tw`w-full flex-row justify-between items-center pt-10`}>
      <View style={tw`p-2 rounded-full bg-white ml-5 shadow-lg`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon
            size={hp(3.5)}
            color="#f64e32"
            strokeWidth={4.5}
          />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row items-center`}>
        <View style={tw`p-2 rounded-full bg-white mr-3 shadow-lg`}>
          <TouchableOpacity onPress={() => navigation.navigate('FavouriteScreen')}>
            <BookmarkIcon
              size={hp(3.5)}
              color="#f64e32"
              strokeWidth={4.5}
            />
          </TouchableOpacity>
        </View>
        {isDetails && (
          <View style={tw`p-2 rounded-full bg-white mr-5 shadow-lg`}>
            <TouchableOpacity onPress={toggleFavorite}>
              <HeartIcon
                size={hp(3.5)}
                color={isFavourite ? "#f64e32" : "gray"}
                strokeWidth={4.5}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  if (loading) {
    return <Loading />;
  }

  if (isDetails) {
    return (
      <ScrollView
        style={tw`flex-1 bg-white`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-8`}
      >
        <StatusBar style="light" />
        <View style={tw`flex-row justify-center`}>
          <CachedImage
            uri={item.strMealThumb}
            sharedTransitionTag={item.strMeal}
            style={{
              width: wp(100),
              height: hp(45),
            }}
          />
        </View>
        {renderHeader()}
        {/* Add your recipe details content here */}
      </ScrollView>
    );
  }

  return (
    <View style={tw`flex-1 bg-white pt-10 mb-6`}>
      {renderHeader()}
      <FlatList
        data={myRecipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRecipeItem}
        contentContainerStyle={tw`p-4`}
        ListEmptyComponent={
          <Text style={tw`text-center text-gray-500 mt-4`}>
            No recipes added yet
          </Text>
        }
      />
      <TouchableOpacity
        style={tw`bg-[#f64e32] p-4 rounded-full mx-4 mt-4 items-center`}
        onPress={() => navigation.navigate("AddRecipe")}
      >
        <Text style={tw`text-white font-bold`}>Add New Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}