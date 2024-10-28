import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { categoryData } from '../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';


export default function Categories({activeCategory, handleChangeCategory, categories}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={tw`ml-2 mt-4`}
      contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
            categories.map((cat, index) => {
                let isActive = cat.strCategory==activeCategory
                let activeButtonClass = isActive? 'bg-amber-400' : 'bg-black/10'
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={()=> handleChangeCategory(cat.strCategory)}
                        style={tw`flex items-center mt-1 mx-1`}
                    >
                        <View style={tw`rounded-full p-[6px] ${activeButtonClass}`}>
                            <Image 
                                source={{uri: cat.strCategoryThumb}}
                                style={[{width: hp(6), height: hp(6)}, tw`rounded-full`]}
                            />
                        </View>
                        <Text style={[tw`text-neutral-600`, {fontSize: hp(1.6)}]}>
                            {cat.strCategory}
                        </Text>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </Animated.View>
  )
}