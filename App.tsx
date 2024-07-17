import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import HomeScreen from './app/screens/Home/Home'
import Splash from './app/screens/start/Splash'
import OnBoarding from './app/screens/start/OnBoarding'
import TermsAndConditions from './app/screens/extra/TermsAndConditions'

const Stack = createNativeStackNavigator()

function Sample() {
  return (
    <View>
      <Text className='font-bold text-[#ff0000]'>Sample</Text>
    </View>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='OnBoarding' component={OnBoarding} options={{ headerShown: false }} />
        <Stack.Screen name='TermsAndConditions' component={TermsAndConditions} options={{ title: 'T&C and Privacy Policy' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
