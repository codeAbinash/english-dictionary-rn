import {
   StyleSheet, Text, View,
   StatusBar, Image, Appearance
} from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../colors/colors'
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import icons from '../../resources/icons/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import 

const isDarkMode = Appearance.getColorScheme() === 'dark';

const Splash = ({ navigation }: any) => {
   async function changeColors() {
      await changeNavigationBarColor(colors.get('accent') as string, false, true);
   }

   async function navigateNext() {
      const firstTime = await AsyncStorage.getItem('firstTime');
      // const firstTime = 'true'

      if (firstTime === null) {
         navigation.replace('OnBoarding');
      } else {
         navigation.replace('HomeScreen');
      }
   }

   useEffect(() => {
      // changeColors();
      // Go to HomeScreen after 2 seconds
      // setTimeout(() => {
      navigateNext();
      // }, 1000);
   }, [])


   // return (
   //    <View style={{ flex: 1, backgroundColor: colors.get('accent'), justifyContent: 'center', alignItems: 'center' }}>
   //       <StatusBar backgroundColor={colors.get('accent')} />
   //       <Image source={icons.icon} style={{
   //          width: 250, height: 150, resizeMode: 'cover'
   //       }} />
   //       {/* <Text className='text-white'>English-English Dictionary</Text> */}
   //    </View>
   // )
   return null
}

export default Splash

const styles = StyleSheet.create({})