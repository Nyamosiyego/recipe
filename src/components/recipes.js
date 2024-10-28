import { View, Text } from "react-native";
import React from "react";
import RecipesCard from "./RecipesCard";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import Loading from "./Loading";
import Animated, { FadeInDown } from "react-native-reanimated";
import tw from 'twrnc'


export default function Recipes({ meals, categories }) {
    const navigation = useNavigation();
  return (
    <Animated.View style={tw`mx-4 my-3`}>
      <Text style={[{fontSize: hp(3)}, tw`font-semibold text-neutral-600`]}>Recipes</Text>
      <Animated.View
        entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
>
        {categories.length == 0 || meals.length == 0 ? (
          <Loading size="large" className="mt-20" />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipesCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </Animated.View>
    </Animated.View>
  )
}