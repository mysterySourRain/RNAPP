import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor: themeColors.bg}}>
        <View style={{ flex: 1, justifyContent: 'space-around', marginVertical: 16 }}>
            <Text 
                style={{ color: 'white', fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>
                Let's Get Started!
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Image source={require("../assets/images/welcome.png")}
                    style={{width: 350, height: 350}} />
            </View>
            <View style={{marginBottom:4}}>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('SignUp')}
                    style={{ paddingVertical: 12, backgroundColor: '#FFD700', marginHorizontal: 16, borderRadius: 12 }}>
                        <Text 
                            style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'gray' }}
                        >
                            Sign Up
                        </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Already have an account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text style={{ fontWeight: 'bold', color: '#FFD700' }}> Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}