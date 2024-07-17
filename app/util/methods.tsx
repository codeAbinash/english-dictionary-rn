import { StatusBar } from 'react-native'

export function changeNavColor(isDarkMode: boolean, changer: Function) {
  return isDarkMode ? changer('black') : changer('white')
}

export function CustomStatusBar({ dark }: { dark: boolean }) {
  return <StatusBar barStyle={!dark ? 'dark-content' : 'light-content'} backgroundColor={!dark ? 'white' : 'black'} />
}

export function debounce(func: Function, wait = 300) {
  let timeout: any

  return function executedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
