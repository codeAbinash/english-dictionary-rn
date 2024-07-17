import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Appearance, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import colors from '../../colors/colors'
import icons from '../../resources/icons/icons'
import images from '../../resources/images/images'
import { debounce } from '../../util/methods'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'

const isDarkMode = Appearance.getColorScheme() === 'dark'
let lastSearchedWord: string = ''

// Get Screen width and height

const { width, height } = Dimensions.get('window')

const Search = ({ navigation, route }: any) => {
  const inputRef = useRef<any>(null)
  const [searchedWord, setSearchedWord] = useState('')
  const [searchedResult, setSearchedResult] = useState<any>(null)
  const [isFavoriteWord, setIsFavoriteWord] = useState(false)
  // const [isExternalSearch, setIsExternalSearch] = useState(false)
  const [externalSearchedWord, setExternalSearchedWord] = useState(route.params?.search || '')
  const [favWords, setFavWords] = useState<any>([])
  const isFocusedScreen = useIsFocused()

  useEffect(() => {
    setExternalSearchedWord(route.params?.search || '')
    if (externalSearchedWord && isFocusedScreen) {
      search(externalSearchedWord)
    }
  }, [isFocusedScreen, externalSearchedWord])

  useEffect(() => {
    async function checkFavWords() {
      setFavWords(JSON.parse((await AsyncStorage.getItem('favorites')) || '[]'))
    }
    checkFavWords()
  }, [searchedWord])

  async function toggleFavorite() {
    console.log('Toggle Favorite', searchedWord, isFavoriteWord)
    setIsFavoriteWord(!isFavoriteWord)

    if (isFavoriteWord) favWords.splice(favWords.indexOf(searchedWord), 1)
    else favWords.unshift(searchedWord)

    setFavWords(favWords)
    AsyncStorage.setItem('favorites', JSON.stringify(favWords))
  }

  async function search(word: string) {
    word = lastSearchedWord = word.trim()

    if (!word) {
      setSearchedResult(null)
      setSearchedWord('')
      return
    }

    favWords.includes(word) ? setIsFavoriteWord(true) : setIsFavoriteWord(false)

    // Set the status to loading
    setSearchedResult(null)

    setSearchedWord(word)
    inputRef.current.setNativeProps({ text: word })

    let controller = new AbortController()
    let signal = controller.signal
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    // Check if the word is already searched and stored in the AsyncStorage
    // If yes then return the result from the AsyncStorage
    // If no then fetch the data from the API and store it in the AsyncStorage

    const asyncData = await AsyncStorage.getItem('w-Aa-' + word)
    if (asyncData) {
      const jsonData = JSON.parse(asyncData)
      setSearchedResult(jsonData)
      console.log(jsonData)
      return
    } else {
      console.log('No AsyncData')
      fetch(url, { signal })
        .then((res) => {
          if (lastSearchedWord !== word) controller.abort()
          return res.json()
        })
        .then((data) => {
          console.log(data)
          // Check if the data is an array
          if (Array.isArray(data)) {
            setSearchedResult(data)
            // Store it in the AsyncStorage
            AsyncStorage.setItem('w-Aa-' + word, JSON.stringify(data))
          } else {
            setSearchedResult([])
          }
          controller.abort()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  async function searchWord(e: any) {
    let val = e.nativeEvent.text
    await search(val)
  }

  useEffect(() => {
    return () => {
      lastSearchedWord = ''
    }
  }, [searchWord])

  return (
    <View className='flex-1 bg-white dark:bg-black'>
      <View className='p-4 pb-3'>
        <View
          className='flex-row items-center bg-[#99999933]'
          style={{
            paddingTop: 1,
            paddingBottom: 1,
            paddingLeft: 18,
            borderRadius: 15,
          }}
        >
          <View>
            <Image source={icons.search_thin} style={{ resizeMode: 'contain', height: 17, width: 17, tintColor: '#888' }} />
          </View>
          <View className='flex-1 pl-[10] pr-2'>
            <TextInput
              className='text-base text-black dark:text-white'
              ref={inputRef}
              placeholder='Search any word'
              autoFocus={externalSearchedWord ? false : true}
              // onChangeText={debounce(searchWord, 300)}
              onSubmitEditing={searchWord}
            />
          </View>
        </View>
      </View>
      <View className='flex-1'>
        {searchedWord ? (
          searchedResult === null ? (
            <View className='flex-1 items-center justify-center'>
              <ActivityIndicator color={colors.get('accent')} size={45} />
              <Text className='pt-5'>Searching for '{searchedWord}'</Text>
            </View>
          ) : (
            SearchResultUI(searchedResult, searchedWord, search, toggleFavorite, isFavoriteWord)
          )
        ) : (
          <View className='flex-1 items-center justify-center'>
            {/* <Image source={images.start} style={{width: '90%', height: '60%', resizeMode: 'contain',}} /> */}
            <Image source={icons.search_thin} style={{ width: 55, height: 55, resizeMode: 'contain', tintColor: '#999999' }} />
            <Text className='mt-5 text-base'>Search any word</Text>
          </View>
        )}
      </View>
    </View>
  )
}

function SearchResultUI(data: any, word: any, search: Function, toggleFavorite: Function, isFavoriteWord: boolean) {
  if (data.length === 0)
    return (
      <View className='flex-1 items-center justify-center pb-20'>
        <Image source={images.not_found} style={{ width: '80%', height: '50%', resizeMode: 'contain' }} />
        <Text className='mt-2 text-base'>No result found for '{word}'</Text>
      </View>
    )

  function getPhoneticsText(result: any) {
    const phonetics = result.phonetics

    for (let i = 0; i < phonetics.length; i++) {
      if (phonetics[i].text) return phonetics[i].text
    }
  }

  return (
    <ScrollView>
      {data.map((result: any, index: number) => {
        return (
          <View key={index}>
            <View className=''>
              <View className='flex-row items-center justify-between p-5'>
                <View>
                  <Text className='text-3xl font-bold text-black dark:text-white' selectable>
                    {result.word}
                  </Text>
                  {/* <Text className='text-lg'>{result.phonetic || 'Phonetics is not available'}</Text> */}
                  <Text selectable className='text-lg text-black dark:text-white'>
                    {result.phonetic || getPhoneticsText(result) || '...'}
                  </Text>
                </View>
                <View className='mt-2 flex-row'>
                  <TouchableOpacity className='p-3' onPress={() => toggleFavorite()}>
                    <Image
                      source={isFavoriteWord ? icons.heart_filled : icons.heart_outline}
                      style={{ height: 22, width: 22, resizeMode: 'contain', tintColor: colors.get('accent') }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View className='bg-[#99999911] h-2'></View> */}
              {result.meanings.map((meanings: any, index: number) => {
                return (
                  <View key={index}>
                    <View className='h-3 bg-[#99999933] dark:bg-[#181818]'></View>
                    <View className='p-5 pt-4'>
                      <View className='flex-row'>
                        <Text className='text-lg italic' style={{ color: colors.get('accent') }}>
                          {result.word} :{' '}
                        </Text>
                        <Text className='text-lg italic'>{meanings.partOfSpeech}</Text>
                      </View>
                      <View>
                        {meanings.definitions.map((definitions: any, index: number) => {
                          return (
                            <View className='pt-6' key={index}>
                              <View className=''>
                                {/* <Text className='text-lg text-black dark:text-white font-bold'>{index + 1}. </Text> */}
                                <Text selectable className='text-lg text-black dark:text-white'>
                                  {' '}
                                  {'\u2022  ' + definitions.definition}
                                </Text>
                              </View>
                              {
                                // Check if the example is available
                                definitions.example && (
                                  <View className=''>
                                    {/* <Text className='text-base font-bold italic'>Example : </Text> */}
                                    <Text selectable className='pl-4 text-lg italic'>
                                      e.g. {definitions.example}
                                    </Text>
                                  </View>
                                )
                              }
                              {
                                // Check if the synonyms are available
                                definitions.synonyms && definitions.synonyms.length > 0 && (
                                  <View className='mt-1 pl-3'>
                                    <Text className='text-base font-bold italic'>synonyms : </Text>
                                    <WordList words={definitions.synonyms} search={search} />
                                  </View>
                                )
                              }
                              {
                                // Check if the synonyms are available
                                definitions.antonyms && definitions.antonyms.length > 0 && (
                                  <View className='mt-1 pl-3'>
                                    <Text className='text-base font-bold italic'>antonyms : </Text>
                                    <WordList words={definitions.antonyms} search={search} />
                                  </View>
                                )
                              }
                            </View>
                          )
                        })}
                      </View>
                      <View>
                        {
                          // Check if synonyms are available
                          meanings.synonyms && meanings.synonyms.length > 0 && (
                            <View className='mt-3'>
                              <Text className='text-lg font-bold italic'>Synonyms : </Text>
                              <WordList words={meanings.synonyms} search={search} />
                            </View>
                          )
                        }
                      </View>
                      {
                        // Check if antonyms are available
                        meanings.antonyms && meanings.antonyms.length > 0 && (
                          <View className='mt-3'>
                            <Text className='text-lg font-bold italic'>Antonyms : </Text>
                            <WordList words={meanings.antonyms} search={search} />
                          </View>
                        )
                      }
                    </View>
                  </View>
                )
              })}
            </View>

            <View className='h-4 bg-[#99999933] dark:bg-[#181818]'></View>
          </View>
        )
      })}
    </ScrollView>
  )
}

function WordList({ words, search }: { words: any; search: Function }) {
  return (
    <View
      className='flex-row flex-wrap pt-1'
      style={{
        rowGap: 7,
        columnGap: 7,
      }}
    >
      {words.map((word: any, index: number) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              search(word)
            }}
          >
            <Text className='rounded-full bg-[#99999933] p-1 pb-2 pl-4 pr-4 text-base'>{word}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})
