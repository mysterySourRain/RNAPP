import { View, Text, TouchableOpacity, Image, TextInput,ScrollView } from 'react-native';
import React,{useState} from 'react';
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { app, auth, dbService, storageService } from '../config/firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


export default function SignUpScreen() {
  // const auth  = getAuth();
  const navigation = useNavigation();
  const [name, setName] = useState(''); // Add state for user's name
  const [location, setLocation] = useState(''); // Add state for user's location
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailInUse,setEmailInUse] = useState(false);

  const handleSubmit = async()=>{
    if(email && password && name){
      try{
        const {user} = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(dbService,'users',user.uid),{
          displayName: name,
          location,
          age,
        });
      
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
        
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: '#FFD700', padding: 8, borderRadius: 20, marginLeft: 16 }}
          >
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image source={require('../assets/images/signup.png')} style={{ width: 165, height: 140 }} />
        </View>
      </View>
      <View style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30, flex: 1, backgroundColor: 'white', paddingHorizontal: 8, paddingTop: 20 }}>
        {emailInUse && (
          <View style={{ backgroundColor: 'red', padding: 8, marginBottom: 16 }}>
            <Text style={{ color: 'white' }}>This email is already in use. Please use a different email.</Text>
          </View>
        )}
        <View style={{ marginBottom: 4 }}>
          <Text style={{ color: 'gray', marginLeft: 16 }}>Full Name</Text>
          <TextInput
            style={{ padding: 16, backgroundColor: '#F0F0F0', color: 'gray', borderRadius: 20, marginBottom: 3 }}
            value={name}
            onChangeText={value => setName(value)}
            placeholder='Enter Name'
            autoCapitalize="words"
          />
          <Text style={{ color: 'gray', marginLeft: 16}}>Email Address</Text>
          <TextInput
            style={{ padding: 16, backgroundColor: '#F0F0F0', color: 'gray', borderRadius: 20, marginBottom: 3 }}
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder='Enter Email'
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={{ color: 'gray', marginLeft: 16 }}>Password</Text>
          <TextInput
            style={{ padding: 16, backgroundColor: '#F0F0F0', color: 'gray', borderRadius: 20, marginBottom: 7 }}
            secureTextEntry
            value={password}
            onChangeText={value => setPassword(value)}
            placeholder='Enter Password'
          />
          <Text style={{ color: 'gray', marginLeft: 16 }}>Location</Text>
          <TextInput
            style={{ padding: 16, backgroundColor: '#F0F0F0', color: 'gray', borderRadius: 20, marginBottom: 7 }}
            value={location}
            onChangeText={value => setLocation(value)}
            placeholder='Enter Location'
          />
          <Text style={{ color: 'gray', marginLeft: 16 }}>Age</Text>
          <TextInput
            style={{ padding: 16, backgroundColor: '#F0F0F0', color: 'gray', borderRadius: 20, marginBottom: 7 }}
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
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 7 }}>
          <TouchableOpacity style={{ padding: 10, backgroundColor: '#F0F0F0', borderRadius: 20, marginRight: 12 }}>
            <Image source={require('../assets/icons/google.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, backgroundColor: '#F0F0F0', borderRadius: 20, marginRight: 12 }}>
            <Image source={require('../assets/icons/apple.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, backgroundColor: '#F0F0F0', borderRadius: 20 }}>
            <Image source={require('../assets/icons/facebook.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 7, marginBottom: 50 }}>
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