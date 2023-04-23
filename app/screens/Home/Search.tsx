import React, { useRef, useState } from 'react';
import {
   ActivityIndicator,
   Appearance,
   Dimensions,
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View
} from 'react-native';
import colors from '../../colors/colors';
import icons from '../../resources/icons/icons';
import images from '../../resources/images/images';
import { debounce } from '../../util/methods';
import AsyncStorage from '@react-native-async-storage/async-storage';


const isDarkMode = Appearance.getColorScheme() === 'dark'
let lastSearchedWord: string = ''

// Get Screen width and height

const { width, height } = Dimensions.get('window');

const Search = () => {
   const inputRef = useRef<any>(null)
   const [searchedWord, setSearchedWord] = useState('')
   const [searchedResult, setSearchedResult] = useState<any>(null)


   async function searchWord(e: any) {
      let val = e.nativeEvent.text

      console.log(val, lastSearchedWord)
      let word = lastSearchedWord = val.trim()


      setSearchedWord(word)
      if (!word) {
         setSearchedResult(null)
         return
      }

      // Set the status to loading
      setSearchedResult(null)

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
      }
      else {
         console.log('No AsyncData')
         fetch(url, { signal }).then(res => {
            if (lastSearchedWord !== word) controller.abort()
            return res.json()
         }).then(data => {
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
         }).catch(err => {
            console.log(err)
         })
      }
   }




   return (
      <View className='flex-1 bg-white dark:bg-black'>
         <View className='p-4 pb-3'>
            <View className='bg-[#99999922]  flex-row items-center' style={{
               paddingTop: 1, paddingBottom: 1, paddingLeft: 18, borderRadius: 15
            }}>
               <View>
                  <Image source={icons.search_thin} style={{ resizeMode: 'contain', height: 17, width: 17, tintColor: '#888' }} />
               </View>
               <View className='pl-[10] flex-1 pr-2'>
                  <TextInput className='text-black dark:text-white text-base'
                     ref={inputRef} placeholder='Search any word' autoFocus={true}
                     // onChangeText={debounce(searchWord, 300)}
                     onSubmitEditing={searchWord}
                  />
               </View>
            </View>
         </View>
         <View className='flex-1' style={{}}>
            {
               searchedWord ?
                  searchedResult === null ?
                     <View className='flex-1 justify-center items-center'>
                        <ActivityIndicator color={colors.get('accent')} size={45} />
                        <Text className='pt-5'>Searching for '{searchedWord}'</Text>
                     </View>
                     :
                     SearchResultUI(searchedResult, searchedWord)
                  :
                  <View className='flex-1 justify-center items-center pb-20'>
                     <Image source={images.start} style={{
                        width: '90%', height: '60%'
                        , resizeMode: 'contain',
                     }} />
                     <Text className='text-base mt-5'>Search any word</Text>
                  </View>
            }
         </View>
      </View>
   )
}


function SearchResultUI(data: any, word: any) {
   if (data.length === 0)
      return <View className='flex-1 justify-center items-center pb-20'>
         <Image source={images.not_found} style={{ width: '80%', height: '50%', resizeMode: 'contain' }} />
         <Text className='text-base mt-2'>No result found for '{word}'</Text>
      </View>

   return <ScrollView>
      {
         data.map((result: any, index: number) => {
            return <View key={index}>
               <View className=''>
                  <View className='flex-row justify-between items-center p-5'>
                     <View>
                        <Text className='text-black dark:text-white text-3xl font-bold'>{result.word}</Text>
                        {/* <Text className='text-lg'>{result.phonetic || 'Phonetics is not available'}</Text> */}
                        <Text className='text-lg text-black dark:text-white'>{result.phonetic || '...'}</Text>
                     </View>
                     <View className='flex-row mt-2'>
                        <TouchableOpacity>
                           <Image source={icons.heart_outline} style={{ height: 22, width: 22, resizeMode: 'contain', tintColor: colors.get('accent') }} />
                        </TouchableOpacity>
                     </View>
                  </View>
                  {/* <View className='bg-[#99999911] h-2'></View> */}
                  {
                     result.meanings.map((meanings: any, index: number) => {
                        return <View key={index}>
                           <View className='bg-[#88888822] h-2'></View>
                           <View className='p-5 pt-4'>
                              <View className='flex-row'>
                                 <Text className='text-lg italic' style={{ color: colors.get('accent') }}>{result.word} : </Text>
                                 <Text className='text-lg italic'>{meanings.partOfSpeech}</Text>
                              </View>
                              <View>
                                 {
                                    meanings.definitions.map((definitions: any, index: number) => {
                                       return <View className='pt-4' key={index}>
                                          <View className='flex-row'>
                                             <Text className='text-lg text-black dark:text-white font-bold'>{index + 1}. </Text>
                                             <Text className='text-lg text-black dark:text-white'> {definitions.definition}</Text>
                                          </View>
                                          {  // Check if the example is available
                                             definitions.example &&
                                             <View className='pl-3'>
                                                <Text className='text-base font-bold italic'>Example : </Text>
                                                <Text className='text-lg pl-4 italic'>{definitions.example}</Text>
                                             </View>
                                          }
                                          { // Check if the synonyms are available
                                             definitions.synonyms && definitions.synonyms.length > 0 &&
                                             <View className='mt-1 pl-3'>
                                                <Text className='text-base font-bold italic'>synonyms : </Text>
                                                <WordList words={definitions.synonyms} />
                                             </View>
                                          }
                                          { // Check if the synonyms are available
                                             definitions.antonyms && definitions.antonyms.length > 0 &&
                                             <View className='mt-1 pl-3'>
                                                <Text className='text-base font-bold italic'>antonyms : </Text>
                                                <WordList words={definitions.antonyms} />
                                             </View>
                                          }
                                       </View>
                                    })
                                 }
                              </View>
                              <View>
                                 {
                                    // Check if synonyms are available
                                    meanings.synonyms && meanings.synonyms.length > 0 &&
                                    <View className='mt-3'>
                                       <Text className='text-lg font-bold italic'>Synonyms : </Text>
                                       <WordList words={meanings.synonyms} />
                                    </View>
                                 }
                              </View>
                              {
                                 // Check if antonyms are available
                                 meanings.antonyms && meanings.antonyms.length > 0 &&
                                 <View className='mt-3'>
                                    <Text className='text-lg font-bold italic'>Antonyms : </Text>
                                    <WordList words={meanings.antonyms} />
                                 </View>
                              }
                           </View>
                        </View>
                     })
                  }
               </View>

               <View className='bg-[#88888822] h-4'></View>
            </View>
         })
      }

   </ScrollView>
}

function WordList({ words }: any) {
   return <View className='flex-row pt-1 flex-wrap' style={{
      rowGap: 7,
      columnGap: 7
   }}>
      {
         words.map((word: any, index: number) => {
            return <TouchableOpacity key={index} onPress={() => {
               console.log(word)
            }}>
               <Text className='text-base bg-[#99999922] p-1 pb-2 pl-4 pr-4 rounded-full'>{word}</Text>
            </TouchableOpacity>
         })
      }
   </View>
}

export default Search

const styles = StyleSheet.create({})