import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import React,{useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase'

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async()=>{
    if(email && password){
      try{
        await signInWithEmailAndPassword(auth, email, password);
      }catch(err){
        console.log('get error: ',err.message);
      }
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <SafeAreaView style={{ flex: 0, backgroundColor: themeColors.bg }} />
      <View style={{ flex: 0.8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            stlyle={{ backgroundColor: '#FFD700', padding: 8, borderRadius: 20, marginLeft: 16 }}
          >
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image source={require('../assets/images/login.png')} style={{ width: 200, height: 200 }} />
        </View>
      </View>
      <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, flex: 1, backgroundColor: 'white', paddingHorizontal: 8, paddingTop: 8 }}>
        <View style={{ marginBottom: 4 }}>
          <Text style={{ color: 'gray', marginLeft: 16 }}>Email Address</Text>
          <TextInput
            style={{ padding: 16, backgroundColor: '#F0F0F0', color: 'gray', borderRadius: 20, marginBottom: 3 }}
            placeholder="email"
            value={email}
            onChangeText={value => setEmail(value)}
          />
          <Text style={{ color: 'gray', marginLeft: 16 }}>Password</Text>
          <TextInput
            style={{ padding: 16, backgroundColor: '#F0F0F0', color: 'gray', borderRadius: 20 }}
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
            <Text style={{ color: 'gray', marginBottom: 5 }}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={handleSubmit}
           style={{ paddingVertical: 12, backgroundColor: '#FFD700', borderRadius: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'gray' }}>Login</Text>
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
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 7 }}>
          <Text style={{ color: '#A0A0A0', fontWeight: 'bold' }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ fontWeight: 'bold', color: '#FFD700' }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
