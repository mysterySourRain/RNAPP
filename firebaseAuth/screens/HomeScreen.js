import { View, Text,TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth,tripsRef } from '../config/firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getDocs, query, where } from 'firebase/firestore';
// import { useNavigation } from '@react-navigation/native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

export default function HomeScreen() {
  // const navigation = useNavigation();
  const user = auth.currentUser;  
  const isFocused = useIsFocused();
  const [info, setInfo] = useState([]); // Add state for user's location
  // const [age, setAge] = useState('');
  const handleLogout = async ()=>{
    await signOut(auth);
    // navigation.navigate('Welcome');
  }
  
  const getInfo = async ()=>{
    try{
      const q = query(tripsRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach(doc=>{
          console.log('documement: ',doc.data());
          data.push({...doc.data(), id: doc.id})
      })
      setInfo(data);
      console.log("data is here", info.age);
      // console.log(data);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  
  }
  useEffect(()=>{
    if(isFocused)
    getInfo();
  },[isFocused])

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18 }}>Home Page - {user.displayName }</Text>
      <Text style={{ fontSize: 18 }}>{info.age}</Text>
      <TouchableOpacity onPress={handleLogout} style={{ padding: 8, backgroundColor: '#ff4444', borderRadius: 8 }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}