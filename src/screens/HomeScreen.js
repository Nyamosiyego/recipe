import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";
import tw from 'twrnc';
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMeals, setFilteredMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMeals(meals);
    } else {
      const filtered = meals.filter(meal =>
        meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMeals(filtered);
    }
  }, [searchQuery, meals]);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
    setSearchQuery(""); // Reset search when changing category
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
        setFilteredMeals(response.data.meals);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" />

      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            tw`space-y-6 pt-14`,
            {
              paddingBottom: 50,
            }
          ]}
        >
          {/* Avatar and Bell Icon */}
          <View style={tw`mx-4 flex-row justify-between items-center`}>
          <TouchableOpacity
            style={tw`bg-[#f64e32] py-2 px-4 rounded-full`}
            onPress={() => navigation.navigate("MyRecipes")}
          >
        <Text style={tw`text-white font-bold text-center`}>My Recipes</Text>
      </TouchableOpacity>
            <Image
              source={require("../../assets/images/avatar.png")}
              style={[
                tw`rounded-full`,
                {
                  width: hp(5),
                  height: hp(5),
                  resizeMode: "cover",
                }
              ]}
            />
          </View>

          {/* Headlines */}
          <View style={tw`mx-4 space-y-1 mb-2`}>
            <View>
              <Text
                style={[
                  tw`font-bold text-neutral-800`,
                  {
                    fontSize: hp(3.5),
                  }
                ]}
              >
                Make your own
              </Text>
            </View>

            <Text
              style={[
                tw`font-extrabold text-neutral-800`,
                {
                  fontSize: hp(3.5),
                }
              ]}
            >
              Food You <Text style={tw`text-[#f64e32]`}>Love</Text>
            </Text>
          </View>

          {/* Search Bar */}
          <View style={tw`mx-4 flex-row items-center border rounded-xl border-black p-[6px]`}>
            <View style={tw`bg-white rounded-full p-2`}>
              <MagnifyingGlassIcon
                size={hp(2.5)}
                color="gray"
                strokeWidth={3}
              />
            </View>
            <TextInput
              placeholder="Search Your Favorite Food"
              placeholderTextColor="gray"
              style={[
                tw`flex-1 text-base mb-1 pl-1 tracking-widest`,
                {
                  fontSize: hp(1.7),
                }
              ]}
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>

          {/* Categories */}
          <View>
            {categories.length > 0 && (
              <Categories
                categories={categories}
                activeCategory={activeCategory}
                handleChangeCategory={handleChangeCategory}
              />
            )}
          </View>

          {/* Recipes Meal */}
          <View>
            <Recipes meals={filteredMeals} categories={categories} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
