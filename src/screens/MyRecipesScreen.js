// MyRecipesScreen.js
import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

export default function MyRecipesScreen({ route }) {
  const navigation = useNavigation();
  const [myRecipes, setMyRecipes] = React.useState([]);

  // Get new recipe from route params on return from AddRecipeScreen
  useEffect(() => {
    if (route.params?.newRecipe) {
      setMyRecipes([...myRecipes, route.params.newRecipe]);
    }
  }, [route.params?.newRecipe]);

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={tw`p-4 border-b border-gray-200`}
      onPress={() => navigation.navigate('MyRecipeDetails', { recipe: item })}
    >
      <Image
        source={item.imageUri ? { uri: item.imageUri } : require('../../assets/images/welcome.png')}
        style={tw`w-20 h-20 rounded-lg mr-4`}
      />
      <Text style={tw`font-bold text-lg text-gray-800`}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-white pt-10 mb-6`}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 rounded-full bg-white mb-4`}>
        <ChevronLeftIcon size={28} color="#f64e32" strokeWidth={2.5} />
      </TouchableOpacity>
      <FlatList
        data={myRecipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRecipeItem}
        contentContainerStyle={tw`p-4`}
        ListEmptyComponent={<Text style={tw`text-center text-gray-500`}>No recipes added yet</Text>}
      />
      <TouchableOpacity
        style={tw`bg-[#f64e32] p-4 rounded-full mt-4 items-center`}
        onPress={() => navigation.navigate("AddRecipe")}
      >
        <Text style={tw`text-white font-bold`}>Add New Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}
