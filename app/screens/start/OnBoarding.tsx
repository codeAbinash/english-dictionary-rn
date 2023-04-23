import { Appearance, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { CustomStatusBar, changeNavColor } from '../../util/methods';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import images from '../../resources/images/images';
import colors from '../../colors/colors';
import icons from '../../resources/icons/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const isDarkMode = Appearance.getColorScheme() === 'dark';


const OnBoarding = ({ navigation }: any) => {

  async function getStarted() {
    await AsyncStorage.setItem('firstTime', 'false');
    navigation.replace('HomeScreen');
  }

  useEffect(() => {
    changeNavColor(isDarkMode, changeNavigationBarColor);
  }, [])

  return (
    <View className='flex-1 bg-white dark:bg-black'>
      <CustomStatusBar dark={isDarkMode} />
      <View className='justify-between flex-1'>
        <View></View>
        <Image source={images.start} style={{ width: '100%', height: '40%', resizeMode: 'contain', margin: 'auto', }} />

        <View className='justify-center items-center gap-2'>
          <Text className='text-3xl font-bold text-black dark:text-white'>English Dictionary</Text>
          <Text className='text-base pl-6 pr-6 text-center font-medium'>
            Welcome to English Dictionary. This application helps you to learn new words. It has many features like word of the day, trending words, word search etc.
          </Text>
        </View>

        <View className='p-5 pb-2'>
          <View>
            <TouchableOpacity onPress={getStarted} className='bg-blue-500/10 p-[19] rounded-2xl' activeOpacity={0.8} style={{ backgroundColor: colors.get('accent') }} >
              <Text className='text-center text-base font-medium text-white'>Get Started</Text>
            </TouchableOpacity>
          </View>
          <View className='flex-row justify-center mt-3'>
            <Text>Read</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('TermsAndConditions')}>
              <Text className='text-blue-500'> T&C and Privacy Policy </Text></TouchableOpacity>
            <Text>before using this application.</Text>
          </View>
        </View>

      </View>

    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({})