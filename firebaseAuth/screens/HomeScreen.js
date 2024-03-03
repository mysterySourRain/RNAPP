import { View, Text,TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {useFirestoreData} from '../hooks/userInfo'; 
// import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const user = auth.currentUser;  
  // const docData = useFirestoreData(user.uid); // get user info
  const handleLogout = async ()=>{
    await signOut(auth);
    // navigation.navigate('Welcome');
  }

  // const filteredData = docData.map(doc => ({ age: doc.age, location: doc.location }));


  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18 }}>Home Page - {user.displayName}</Text>
      {/* {filteredData.map((data, index) => (
        <View key={index} style={{ marginTop: 10 }}>
          <Text>{user.displayName}</Text>
          <Text>Age: {data.age}</Text>
          <Text>Location: {data.location}</Text>
        </View> */}
      {/* ))} */}
          <TouchableOpacity onPress={handleLogout} style={{ padding: 8, backgroundColor: '#ff4444', borderRadius: 8 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
    </SafeAreaView>
  )
}