import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../../colors/colors'
import icons from '../../resources/icons/icons'

const Favorites = ({ navigation }: any) => {
  const [favWords, setFavWords] = useState([] as string[])
  const isFocusedScreen = useIsFocused()

  function goToSearchScreen(word: string) {
    navigation.navigate('Search', { search: word })
  }

  async function removeFromFavorites(word: string) {
    // Confirm if the user wants to remove the word from favorites
    Alert.alert('Remove from favorites', 'Are you sure you want to remove this word from your favorites?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          await AsyncStorage.setItem('favorites', JSON.stringify(favWords.filter((item: string) => item != word)))
          loadFavWords()
        },
      },
    ])
  }

  async function loadFavWords() {
    await setFavWords(JSON.parse((await AsyncStorage.getItem('favorites')) || '[]'))
    // setFavWords([...favWords,...favWords])
  }

  useEffect(() => {
    if (isFocusedScreen) {
      loadFavWords()
    }
  }, [isFocusedScreen])

  if (favWords.length == 0) {
    return (
      <View className='flex-1 bg-white dark:bg-black'>
        <View className='gap-5 bg-white p-5 dark:bg-black'>
          <Text className='ml-5 mt-4 text-2xl font-bold text-[#222] dark:text-[#ddd]'>Favorite Words</Text>
          <View className='h-[85%] items-center justify-center'>
            <Image source={icons.favorites} style={{ width: 55, height: 55, resizeMode: 'contain', tintColor: '#999999' }} />
            <Text className='mt-7 text-lg'>No favorite words yet.</Text>
            <Text className='text-sm' style={{ color: colors.get('accent'), marginTop: 5 }}>
              Tap on the heart icon to add a word to your favorites.
            </Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <ScrollView className='bg-white dark:bg-black'>
      <View className='gap-5 bg-white p-5 pb-20 dark:bg-black'>
        <Text className='ml-5 mt-4 text-2xl font-bold text-[#222] dark:text-[#ddd]'>Favorite Words</Text>
        <View className='grow overflow-hidden rounded-2xl bg-[#99999918]'>
          {favWords.map((word, index) => {
            return (
              <View
                className='flex-row items-center justify-between'
                key={index}
                style={{ borderBottomWidth: index == favWords.length - 1 ? 0 : 1, borderBottomColor: '#99999922' }}
              >
                <TouchableOpacity
                  onPress={() => {
                    goToSearchScreen(word)
                  }}
                  className='w-[80%] p-4'
                >
                  <Text className='text-lg text-[#222] dark:text-[#ddd]'>{word}</Text>
                </TouchableOpacity>
                <TouchableOpacity className='p-4' onPress={() => removeFromFavorites(word)}>
                  <Image source={icons.heart_filled} style={{ tintColor: colors.get('accent'), resizeMode: 'contain', height: 22, width: 22 }} />
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}

export default Favorites

const styles = StyleSheet.create({})
