import {
  StyleSheet, Text, View,
  TouchableOpacity, Image, Alert, ScrollView, Share, Linking
} from 'react-native'
import React from 'react'
import icons from '../../resources/icons/icons'
import colors from '../../colors/colors'


const More = ({ navigation }: any) => {
  const favWords = [
    {
      text: 'About App',
      icon: icons.about,
      action: () => {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.englishdictionary.rn')
      }
    },
    {
      text: 'About Developer',
      icon: icons.binary_code,
      action: () => {
        Linking.openURL('https://github.com/codeAbinash')
      }
    },
    {
      text: 'Rate App',
      icon: icons.star,
      action: () => {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.englishdictionary.rn')
      }
    },
    {
      text: 'Share App',
      icon: icons.share,
      action: () => { shareText(`Try the best English Dictionary App. I am using it and it is very helpful. Get the app on Google Play Store: https://play.google.com/store/apps/details?id=com.englishdictionary.rn         `) }
    }, {
      text: 'Privacy Policy',
      icon: icons.lock,
      action: () => { navigation.navigate('TermsAndConditions') }
    }, {
      text: 'Terms & Conditions',
      icon: icons.t_and_c,
      action: () => { navigation.navigate('TermsAndConditions') }
    }, {
      text: 'Contact Me',
      icon: icons.email,
      action: () => {
        Linking.openURL('mailto:codeAbinash@gmail.com')
      }
    }, {
      text: 'Source Code',
      icon: icons.github,
      action: () => {
        Linking.openURL('https://github.com/codeAbinash/english-dictionary-rn')
      }
    }
  ]
  return (
    <ScrollView className='flex-1 bg-white dark:bg-black'>
      <View className='p-5'>
        <Text className='text-2xl font-bold text-[#222] dark:text-[#ddd] mb-5'
        >More Options</Text>
        <View className='bg-[#99999910] rounded-2xl overflow-hidden grow'>
          {favWords.map((option, index) => {
            return <TouchableOpacity className='flex-row justify-between items-center' key={index} activeOpacity={0.5}
              style={{ borderBottomWidth: index == favWords.length - 1 ? 0 : 1, borderBottomColor: '#99999922' }}
              onPress={() => { option.action() }}
            >
              <View className='flex-row items-center'>
                <View className='p-4 pr-4'>
                  <Image source={option.icon} style={{ resizeMode: 'contain', height: 28, width: 28 }} />
                </View>
                <View className=''>
                  <Text className='text-lg text-[#222] dark:text-[#ddd]'>{option.text}</Text>
                </View>
              </View>
              <View>
                <View className='p-4'>
                  <Image source={icons.right_arrow} style={{ tintColor: '#999999', resizeMode: 'contain', height: 19, width: 19 }} />
                </View>
              </View>
            </TouchableOpacity>
          })}
        </View>

        <Text className='mt-20 text-center text-black dark:text-white'>
          Made with ❤️ by Abinash
        </Text>

      </View>
    </ScrollView>
  )
}

export default More


async function shareText(text: string) {
  try {
    const result = await Share.share({
      message:
        text,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {// shared with activity type of result.activityType
      } else {// shared
      }
    }
    else if (result.action === Share.dismissedAction) {// dismissed
    }
  } catch (error: any) {
    Alert.alert('Error!', error.message);
  }
};

// const styles = StyleSheet.create({})