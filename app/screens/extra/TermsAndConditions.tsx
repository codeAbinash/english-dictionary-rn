import { Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const TermsAndConditions = () => {

  return (
    <ScrollView className='flex-1 bg-white p-5'>
      <StatusBar backgroundColor='white' barStyle='dark-content' />
      <View className='gap-4'>
        <Text className='text-2xl text-black'>Terms and Conditions</Text>
        {/* Write age limit of 13 */}
        <Text className='text-black' selectable={true}>1. The application is provided "as is" and we do not guarantee that it will meet your expectations, requirements or needs. We are not liable for any loss or damage caused by the use or inability to use the application.</Text>
        <Text className='text-black' selectable={true}>2. The application may contain links to third-party websites, which are not under our control. We are not responsible for the content, accuracy, or reliability of any third-party website.</Text>
        <Text className='text-black' selectable={true}>3. We reserve the right to modify or discontinue the application at any time without notice.</Text>
        <Text className='text-black' selectable={true}>4. Your use of the application is subject to all applicable laws and regulations, and you are solely responsible for any violation of such laws and regulations.</Text>
        <Text className='text-black' selectable={true}>5. You agree not to use the application for any illegal or unauthorized purpose.</Text>
        <Text className='text-black' selectable={true}>6. We may collect certain information about your use of the application. By using the application, you consent to our collection and use of such information in accordance with our privacy policy.</Text>
        <Text className='text-black' selectable={true}>7. We reserve the right to update or modify these terms and conditions at any time without notice. By continuing to use the application after such modifications, you agree to be bound by the updated or modified terms and conditions.  </Text>
        <Text className='text-black' selectable={true}>8. If you have any questions or concerns about these terms and conditions, please contact us at <TouchableOpacity onPress={() => Linking.openURL('mailto:codeAbinash@gmail.com')}><Text className='text-blue-500'>codeAbinash@gmail.com</Text></TouchableOpacity>.</Text>
        <Text className='text-black' selectable={true}>9. The application is not intended for use by children under the age of 13.</Text>
        <Text className='text-black' selectable={true}></Text>
      </View>


      <View className='gap-4 mt-1'>
        <Text selectable={true} className='text-2xl text-black'>Privacy Policy</Text>
        <Text selectable={true} className='text-black'>Thank you for using our English dictionary application! We value your privacy and are committed to protecting your personal information. This privacy policy explains how we collect, use, and protect information about you.</Text>
        <Text selectable={true} className='text-black text-xl'>Information We Collect</Text>
        <Text selectable={true} className='text-black'>When you use our English dictionary application, we only collect the searched words anonymously for the sole purpose of improving the quality of the application. We do not collect any personally identifiable information such as your name, email address, or phone number.</Text>
        <Text selectable={true} className='text-black text-xl'>How We Use Information</Text>
        <Text selectable={true} className='text-black'>The only purpose of collecting the searched words anonymously is to improve the functionality and accuracy of the English dictionary application. We do not use or share this information with any third party for any purpose.</Text>
        <Text selectable={true} className='text-black text-xl'>Data Security</Text>
        <Text selectable={true} className='text-black'>You do not need to create an account to use our English dictionary application. We do not collect any personally identifiable information such as your name, email address, or phone number. We do not share your information with any third party for any purpose. We do not sell your information to any third party for any purpose. We do not use your information for any purpose other than improving the quality of the English dictionary application.</Text>
        <Text selectable={true} className='text-black text-xl'>Links to Third-Party Websites</Text>
        <Text selectable={true} className='text-black'>Our English dictionary application may contain links to third-party websites. We are not responsible for the privacy practices or the content of such websites. We encourage you to review the privacy policies of these websites before providing any personal information.</Text>
        <Text selectable={true} className='text-black text-xl'>Changes to Our Privacy Policy</Text>
        <Text selectable={true} className='text-black'>We may update this privacy policy from time to time. We will notify you of any changes by posting the updated policy on our website. Your continued use of the English dictionary application after any such changes constitutes your acceptance of the updated privacy policy.</Text>
        <Text selectable={true} className='text-black text-xl'>Contact Us</Text>
        <Text selectable={true} className='text-black'>If you have any questions or concerns about our privacy policy or our English dictionary application, please contact us at <TouchableOpacity onPress={() => Linking.openURL('mailto:codeAbinash@gmail.com')}><Text className='text-blue-500'>codeAbinash@gmail.com</Text></TouchableOpacity>.</Text>

      </View>

      <View className='h-20'></View>

    </ScrollView>
  )
}

export default TermsAndConditions

const styles = StyleSheet.create({})