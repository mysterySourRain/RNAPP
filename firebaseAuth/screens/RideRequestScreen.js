
export default function RideRequestScreen() {
    return(
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
      </View>
      </ScrollView>
    </View>    
    )
}