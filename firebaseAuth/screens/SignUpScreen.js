import { View, Text, TouchableOpacity, Image, TextInput,ScrollView,StyleSheet } from 'react-native';
import React,{useState} from 'react';
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth';
import { getFirestore, doc, setDoc, addDoc } from 'firebase/firestore';
import {auth, db, tripsRef} from '../config/firebase';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState(''); // Add state for user's name
  const [location, setLocation] = useState(''); // Add state for user's location
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailInUse,setEmailInUse] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const handleSubmit = async()=>{
    if(email && password && name){
      try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await addDoc(tripsRef, {
          age, 
          location, 
          userId: user.uid
        });
        console.log(age, location);
        try {
          await updateProfile(user, {
            displayName: name // Set the displayName property to the new name
          });
          console.log('Display name updated successfully', name, name.displayName);
        } catch (error) {
          console.error('Error updating display name:', error);
        }
      }catch(err){
        console.log('get error: ',err.message);
        if(err.message && err.message == "Firebase: Error (auth/email-already-in-use)."){
          setEmailInUse(true);
        }
      }
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <ScrollView>
      <SafeAreaView style={{ flex: 0, backgroundColor: themeColors.bg }} />
      <View style={{ flex: 0.5 }}>
        
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start',marginTop:10, marginBottom:10 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: '#FFD700', padding: 8, borderRadius: 20, marginLeft: 16 }}
          >
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30, flex: 1, backgroundColor: 'white', paddingHorizontal: 8, paddingTop: 20 }}>
        {emailInUse && (
          <View style={{ backgroundColor: 'red', padding: 8, marginBottom: 16 }}>
            <Text style={{ color: 'white' }}>This email is already in use. Please use a different email.</Text>
          </View>
        )}
        <View style={{ marginBottom: 4 }}>
          <Text style={style.heading}>Full Name</Text>
          <TextInput
            style={style.textContainer}
            value={name}
            onChangeText={value => setName(value)}
            placeholder='Enter Name'
            autoCapitalize="words"
          />
          <Text style={{ color: 'gray', marginLeft: 16}}>Email Address</Text>
          <TextInput
            style={style.textContainer}
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder='Enter Email'
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={style.heading}>Password</Text>
          <TextInput
            style={style.textContainer}
            secureTextEntry
            value={password}
            onChangeText={value => setPassword(value)}
            placeholder='Enter Password'
          />
          <Text style={style.heading}>Location</Text>
          <TextInput
            style={style.textContainer}
            value={location}
            onChangeText={value => setLocation(value)}
            placeholder='Enter Location'
          />
          <Text style={style.heading}>Age</Text>
          <TextInput
            style={style.textContainer}
            value={age}
            onChangeText={value => setAge(value)}
            placeholder='Enter Age'
          />
          <TouchableOpacity style={{ paddingVertical: 12, backgroundColor: '#FFD700', borderRadius: 20 }}>
            <Text
             onPress={handleSubmit}
             style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'gray' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 20, color: 'gray', fontWeight: 'bold', textAlign: 'center', paddingTop: 5 }}>Or</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 7 , marginBottom:15}}>
          <TouchableOpacity style={style.icon}>
            <Image source={require('../assets/icons/google.png')} style={style.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={style.icon}>
            <Image source={require('../assets/icons/apple.png')} style={style.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={style.icon}>
            <Image source={require('../assets/icons/facebook.png')} style={style.iconImage} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 3, marginBottom: 100 }}>
          <Text style={{ color: '#A0A0A0', fontWeight: 'bold' }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ fontWeight: 'bold', color: '#FFD700' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const style =  StyleSheet.create({
  textContainer: {padding: 16, backgroundColor: '#F0F0F0', color: 'gray', borderRadius: 20, marginBottom: 7},
  heading: { color: 'gray', marginLeft: 16,marginBottom:3 },
  icon: { padding: 10, backgroundColor: '#F0F0F0', borderRadius: 20, marginRight: 12 },
  iconImage: { width: 40, height: 40 },
})