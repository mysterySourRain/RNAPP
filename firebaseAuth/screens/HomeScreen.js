import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React, { useEffect,useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import {useFirestoreData} from '../hooks/userInfo'; 
// import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const user = auth.currentUser;  
  const docData = useFirestoreData(user.uid); // get user info
  const handleLogout = async ()=>{
    await signOut(auth);
    // navigation.navigate('Welcome');
  }

  const filteredData = docData.map(doc => ({ age: doc.age, location: doc.location }));


  return (
    <SafeAreaView style={styles.container}>
    <View style= {{flexDirection:'row'}}>
      <View style={styles.userInfo}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Account</Text>
      </TouchableOpacity>
      {filteredData.map((data, index) => (
        <View key={index} style={{ marginTop: 10 }}>
          <Text>Name: {user.displayName}</Text>
          <Text>Age: {data.age}</Text>
          <Text>Location: {data.location}</Text>
        </View>))}
    </View></View>
    
    <View style={styles.buttonsContainer}>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Driver</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ride Request</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'flex-end',
    marginRight: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFD700',
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'flex-end',
    marginRight: 20,
  },
});