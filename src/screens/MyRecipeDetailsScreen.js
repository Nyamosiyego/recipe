import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

export default function MyRecipeDetailsScreen({ route }) {
  const navigation = useNavigation();
  const { recipe } = route.params;

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      {/* Back Button */}
      <View style={tw`absolute top-10 left-5 z-10 p-2 rounded-full bg-white shadow-lg`}>
        <ChevronLeftIcon size={30} color="#f64e32" onPress={() => navigation.goBack()} />
      </View>

      {/* Image and Placeholder */}
      <Image
        source={recipe.imageUri ? { uri: recipe.imageUri } : require('../../assets/images/welcome.png')}
        style={tw`w-full h-64`}
      />

      <View style={tw`px-5 py-8 bg-white`}>
        <Text style={tw`text-3xl font-bold text-gray-800 mb-4`}>{recipe.name}</Text>
        <Text style={tw`text-lg font-semibold text-gray-700 mb-2`}>Description</Text>
        <Text style={tw`text-gray-600 mb-4`}>{recipe.description}</Text>

        <Text style={tw`text-lg font-semibold text-gray-700 mb-2`}>Ingredients</Text>
        <Text style={tw`text-gray-600 mb-4`}>{recipe.ingredients}</Text>

        <Text style={tw`text-lg font-semibold text-gray-700 mb-2`}>Instructions</Text>
        <Text style={tw`text-gray-600`}>{recipe.instructions}</Text>
      </View>
    </ScrollView>
  );
}
