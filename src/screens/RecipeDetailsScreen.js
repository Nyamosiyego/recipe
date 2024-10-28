import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { CachedImage } from "../../utils/index";
import { useNavigation } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import Loading from "../components/Loading";
import axios from "axios";
import Animated, { FadeInDown } from "react-native-reanimated";
import tw from 'twrnc';

export default function RecipeDetailsScreen(props) {
  let item = props.route.params;
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    getMealData(item.idMeal);
  });

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const renderInstructionStep = (step, index) => {
    return (
      <View key={index} style={tw`flex-row mb-4`}>
        <View style={tw`bg-[#f64e32] rounded-full h-6 w-6 mr-3 items-center justify-center`}>
          <Text style={tw`text-white font-bold`}>{index + 1}</Text>
        </View>
        <Text style={[tw`text-neutral-700 flex-1`, { fontSize: hp(1.7) }]}>
          {step.trim()}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      style={tw`flex-1 bg-white`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
      <StatusBar style="white" />

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

      <View style={tw`w-full absolute flex-row justify-between items-center pt-10`}>
        <View style={tw`p-2 rounded-full bg-white ml-5 shadow-lg`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon
              size={hp(3.5)}
              color="#f64e32"
              strokeWidth={4.5}
            />
          </TouchableOpacity>
        </View>

        <View style={tw`p-2 rounded-full bg-white mr-5 shadow-lg`}>
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
            <HeartIcon
              size={hp(3.5)}
              color={isFavourite ? "#f64e32" : "gray"}
              strokeWidth={4.5}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <Loading size="large" style={tw`mt-16`} />
      ) : (
        <View
          style={[
            tw`px-4 flex justify-between space-y-4 bg-white mt-[-46]`,
            {
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              paddingTop: hp(3),
            },
          ]}
        >
          <Animated.View
            style={tw`space-y-2 px-4`}
            entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
          >
            <Text
              style={[
                tw`font-bold flex-1 text-neutral-700`,
                { fontSize: hp(3) },
              ]}
            >
              {meal?.strMeal}
            </Text>

            <Text
              style={[
                tw`text-neutral-500 font-medium`,
                { fontSize: hp(2) },
              ]}
            >
              {meal?.strArea} Cuisine
            </Text>
          </Animated.View>

          <Animated.View
            style={tw`space-y-4 p-4`}
            entering={FadeInDown.delay(300).duration(700).springify().damping(12)}
          >
            <Text
              style={[
                tw`font-bold text-neutral-700`,
                { fontSize: hp(2.5) },
              ]}
            >
              Ingredients
            </Text>

            <View style={tw`flex-row flex-wrap justify-start`}>
              {ingredientsIndexes(meal).map((i) => (
                <View 
                  key={i} 
                  style={tw`bg-[#fff8f6] rounded-xl p-3 mr-3 mb-3 shadow-sm w-[45%]`}
                >
                  <View style={tw`flex-row items-center mb-2`}>
                    <View style={tw`bg-[#f64e32] rounded-full h-2 w-2 mr-2`} />
                    <Text style={[tw`font-medium text-neutral-800`, { fontSize: hp(1.7) }]}>
                      {meal["strIngredient" + i]}
                    </Text>
                  </View>
                  <Text 
                    style={[tw`text-neutral-700`, { fontSize: hp(1.7) }]}
                  >
                    {meal["strMeasure" + i]}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>

          <Animated.View
            style={tw`space-y-4 p-4`}
            entering={FadeInDown.delay(400).duration(700).springify().damping(12)}
          >
            <Text
              style={[
                tw`font-bold text-neutral-700`,
                { fontSize: hp(2.5) },
              ]}
            >
              Instructions
            </Text>

            <View style={tw`space-y-2 bg-[#fff8f6] p-4 rounded-xl`}>
              {meal?.strInstructions
                .split('.')
                .filter(step => step.trim().length > 0)
                .map((step, index) => renderInstructionStep(step, index))
              }
            </View>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}