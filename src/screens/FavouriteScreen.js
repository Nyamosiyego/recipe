import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { StatusBar } from "expo-status-bar";
  import { useNavigation } from "@react-navigation/native";
  import {
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { ChevronLeftIcon } from "react-native-heroicons/outline";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { CachedImage } from "../../utils/index";
  import tw from 'twrnc';
  
  export default function FavoritesScreen() {
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      loadFavorites();
      
      // Refresh favorites when the screen is focused
      const unsubscribe = navigation.addListener('focus', () => {
        loadFavorites();
      });
  
      return unsubscribe;
    }, [navigation]);
  
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('favorites');
        if (savedFavorites !== null) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
  
    return (
      <View style={tw`flex-1 bg-white`}>
        <StatusBar style="dark" />

        <View style={tw`w-full absolute flex-row justify-between items-center pt-20`}>
        <View style={tw`p-2 rounded-full bg-white ml-5 shadow-lg`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon
              size={hp(3.5)}
              color="#f64e32"
              strokeWidth={4.5}
            />
          </TouchableOpacity>
        </View>
        </View>
        
        <View style={tw`mt-36 mb-4 px-4`}>
          <Text style={[tw`font-bold text-neutral-800`, { fontSize: hp(3) }]}>
            Favorite Recipes
          </Text>
        </View>
  
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-20`}
        >
          <View style={tw`px-4`}>
            {favorites.length === 0 ? (
              <Text style={[tw`text-center text-neutral-500 mt-10`, { fontSize: hp(2) }]}>
                No favorite recipes yet
              </Text>
            ) : (
              favorites.map((item) => (
                <TouchableOpacity
                  key={item.idMeal}
                  style={tw`mb-4 bg-white rounded-2xl shadow-sm`}
                  onPress={() => navigation.navigate('RecipeDetails', item)}
                >
                  <View style={tw`flex-row items-center p-3`}>
                    <CachedImage
                      uri={item.strMealThumb}
                      style={tw`w-20 h-20 rounded-xl`}
                    />
                    <View style={tw`flex-1 ml-4`}>
                      <Text
                        style={[tw`font-bold text-neutral-800`, { fontSize: hp(2) }]}
                        numberOfLines={2}
                      >
                        {item.strMeal}
                      </Text>
                      <Text
                        style={[tw`text-neutral-500`, { fontSize: hp(1.7) }]}
                      >
                        {item.strArea} Cuisine
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    );
  }