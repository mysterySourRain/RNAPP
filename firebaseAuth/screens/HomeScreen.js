import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const handleLogout = async ()=>{
    await signOut(auth);
    navigation.navigate('Welcome');
  }
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18 }}>Home Page - {user.displayName }</Text>
      <TouchableOpacity onPress={handleLogout} style={{ padding: 8, backgroundColor: '#ff4444', borderRadius: 8 }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}