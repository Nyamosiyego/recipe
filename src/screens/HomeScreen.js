import { View, Text, Image, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import tw from 'twrnc'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/categories'
import axios from 'axios'

export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    getCategories();
  },[])

  const getCategories = async()=>{
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      if (response&& response.data){
          setCategories(response.data.categories)
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={'dark'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        style={tw`pt-14`}
      >
        {/* Avatar and other content */}
        <View style={tw`flex-row items-center justify-between mx-4 mb-2`}>
          <Image 
            source={require('../../assets/images/avatar.png')} 
            style={{ height: hp(5), width: hp(5.5), borderRadius: hp(5.5) / 2 }} 
          />
          <BellIcon size={hp(4)} color="gray"/>
        </View>

        {/* Greetings and punchline */}
        <View style={tw`mx-4 mb-2 mt-2`}>
          <Text style={[tw`text-neutral-600`, {fontSize: hp(1.7)}]}>Hello, Eddy!</Text>
          <View>
            <Text style={[tw`font-semibold text-neutral-600`, {fontSize: hp(3.8)}]}>Make your own food,</Text>
          </View>
          <Text style={[tw`font-semibold text-neutral-600`, {fontSize: hp(3.8)}]}>
            stay at <Text style={tw`text-amber-400`}>home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View style={tw`mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]`}>
          <TextInput 
          placeholder='Search any recipe'
          placeholderTextColor={'gray'}
          style={[tw`flex-1 text-base mb-1 pl-3 tracking-wider`, {fontSize: hp(1.7)}]}
          />
          <View style={tw`bg-white rounded-full p-3`}>
            <MagnifyingGlassIcon size={hp(2.7)} strokeWidth={3} color={"gray"}/>
          </View>
        </View>

        {/* Categories */}
        <View>
          <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
        </View>
      </ScrollView>
    </View>
  )
}
