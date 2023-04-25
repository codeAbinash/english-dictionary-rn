import React, {
  useEffect
} from 'react';
import {
  Text, View, StatusBar, Appearance,
  TouchableOpacity, Image,
} from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from './Favorites';
import More from './More';
import icons from '../../resources/icons/icons';
import colors from '../../colors/colors';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Search from './Search';
import AsyncStorage from '@react-native-async-storage/async-storage';


const isDarkMode = Appearance.getColorScheme() === 'dark';


const Home = ({ navigation }: any) => {
  const [randomWord, setRandomWord] = React.useState('');

  useEffect(() => {
    loadRandomWord()
  }, [])



  async function loadRandomWord() {
    const favWords = JSON.parse(await AsyncStorage.getItem('favorites') || '[]');
    setRandomWord(favWords[Math.floor(Math.random() * favWords.length)])
  }

  async function changeBarColors() {
    await changeNavigationBarColor(isDarkMode ? 'black' : 'white', !isDarkMode, true);
  }

  useEffect(() => {
    changeBarColors();
  }, [isDarkMode])

  return (
    <View className='flex-1 bg-white dark:bg-black p-5 gap-10'>
      <View>
        <Text className='text-xl font-bold text-black dark:text-white'>Random Word to learn</Text>
        <TouchableOpacity className='bg-[#99999933] mt-5 rounded-3xl overflow-hidden' activeOpacity={0.6}
          onPress={() => navigation.navigate('Search', { search: randomWord })}
        >
          <View className='h-44 justify-center items-center'>
            <Text className='text-3xl font-bold text-black dark:text-white'>{randomWord}</Text>
          </View>
        </TouchableOpacity>
        <View className='justify-end items-end pt-2 pr-3'>
          <TouchableOpacity activeOpacity={0.6}>
            <Text className='text-base text-black dark:text-white' style={{ color: colors.get('accent'), }}>
              Tap to learn more
            </Text>
          </TouchableOpacity>
        </View>

        <Text className='mt-44 text-lg text-center' style={{ color: colors.get('accent') }}>More Features are coming soon</Text>

      </View>
    </View >
  )
}


const tabIcons = new Map(
  [
    ['Home', icons.home],
    ['Search', icons.search],
    ['Favorites', icons.favorites],
    ['More', icons.more],
  ]
)



function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View className='justify-evenly flex-row bg-white dark:bg-black pt-1' style={{
      borderTopWidth: 0.3, borderTopColor: '#aaaaaa55',
    }}>
      {
        state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity key={route.key} onPress={onPress} onLongPress={onLongPress} activeOpacity={0.8}>
              <View className='justify-center items-center p-2' style={{ opacity: isFocused ? 1 : 0.5 }}>
                <Image source={tabIcons.get(label)} style={{ width: 21, height: 21, resizeMode: 'contain', tintColor: isFocused ? colors.get('accent') : getTextColor(isDarkMode) }} />
                <Text style={{ fontSize: 12, color: isFocused ? colors.get('accent') : getTextColor(isDarkMode), fontFamily: 'Rubik-Medium', marginTop: 2 }}>{label}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

function getTextColor(isDarkMode: boolean) {
  return isDarkMode ? colors.get('darkText') : colors.get('text');
}

const Tab = createBottomTabNavigator();
const HomeScreen = () => {
  return (
    <>
      <StatusBar backgroundColor={isDarkMode ? 'black' : 'white'} barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Tab.Navigator tabBar={CustomTabBar}>
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Search" component={Search} options={{ headerShown: false }} />
        <Tab.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
        <Tab.Screen name="More" component={More} options={{ headerShown: false }} />
      </Tab.Navigator>
    </>
  )
}

export default HomeScreen
