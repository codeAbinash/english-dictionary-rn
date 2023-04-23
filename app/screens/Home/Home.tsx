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


const isDarkMode = Appearance.getColorScheme() === 'dark';


const Home = () => {

  async function changeBarColors() {
    await changeNavigationBarColor(isDarkMode ? 'black' : 'white', !isDarkMode, true);
  }

  useEffect(() => {
    changeBarColors();
  }, [isDarkMode])

  return (
    <View className='flex-1 justify-center items-center bg-white dark:bg-black p-5 gap-10'>
      <Text className='text-lg text-center'>Trending Words, Words of the day etc. Features are coming soon.</Text>
      <Text className='text-lg text-center' style={{
        color: colors.get('accent'),
      }}>Go to search section to search words</Text>
    </View>
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
