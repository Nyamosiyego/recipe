import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import tw from 'twrnc';

export default function RecipesCard({ index, navigation, item }) {
  let isEven = index % 2 == 0;
  
  return (
    <View>
      <Pressable
        style={[
          tw`flex justify-center mb-4 space-y-1`,
          {
            width: "100%",
            paddingRight: isEven ? 8 : 0,
          }
        ]}
        onPress={() => navigation.navigate("RecipeDetails", { ...item })}
      >
        <Image
          source={{
            uri: item.strMealThumb,
          }}
          style={[
            tw`bg-black/5 relative`,
            {
              width: "100%",
              height: index % 3 == 0 ? hp(25) : hp(35),
              borderRadius: 35,
            }
          ]}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={[
            {
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: hp(20),
              borderBottomLeftRadius: 35,
              borderBottomRightRadius: 35,
            }
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <Text
          style={[
            tw`font-semibold ml-2 text-white absolute bottom-7 left-2`,
            {
              fontSize: hp(2.2),
              maxWidth: '80%'
            }
          ]}
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </View>
  );
}