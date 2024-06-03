import { SafeAreaView, StyleSheet, Text, TouchableOpacity, TurboModuleRegistry, View} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import { RootStackParamList } from '../AppNavigator'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Loader from '../Components/Loader'


interface navProps {
  navigation:StackNavigationProp<RootStackParamList,"Login">
}
const Login = ({navigation}:navProps) => {
  const [email,setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const [invalidEmail,setInvaliEmail] = useState<boolean>(false);
  const [invalidPassword,setInvalidPassword] = useState<boolean>(false);
  const [loading,setLoading] = useState<boolean>(false)

  const validate = ()=>{
    let valid = true;

    if(email.length < 1){
      setInvaliEmail(true);
      valid=false;
    }else if(email.length > 0){
      setInvaliEmail(false);
      valid = true;
    };

    if(password.length < 1){
      setInvalidPassword(true);
      valid=false;
    }else if(password.length > 0){
      setInvalidPassword(false);
      valid = true;
    };

    return valid;

  }
  
  const handleLogin = async()=>{
    setLoading(true)
    try{
      const headers = new Headers();
      headers.append('Content-Type',"application/json");
      const body = {email:email,password:password};
  
      const res = await fetch('http://10.0.2.2:8000/auth/login',{
        headers:headers,
        method:'POST',
        body:JSON.stringify(body)
      });
  
      const data = await res.json();

      setEmail('');
      setPassword('')

      if(data){
        setLoading(false)
        navigation.navigate('Home',{id:data._id})
      }
    }catch(error){
      setLoading(false)
      console.log('something went wrong');
      setInvaliEmail(true);
      setInvalidPassword(true);

      setEmail('');
      setPassword('')
    }

    

    
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headingText}>Welcome Back</Text>
      <TextInput style={styles.input} placeholder='enter Email' value={email} onChangeText={(text)=> setEmail(text)} keyboardType='email-address'/>
      {invalidEmail && (
        <Text style={styles.errorText}>please enter a valid email</Text>
      )}

      <TextInput style={styles.input} placeholder='enter Password' value={password} onChangeText={(text)=> setPassword(text)}/>
      {invalidPassword && (
        <Text style={styles.errorText}>please enter a valid password</Text>
      )}

      <TouchableOpacity style={styles.loginBtn} onPress={()=>{
        if(validate()){
          //hit a api call
          handleLogin();
        }
      }}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.loginBtn,{backgroundColor:'white',borderWidth:1,borderColor:'black',marginTop:10}]}
      onPress={()=>{
        navigation.navigate('Signup');
      }}
      >
        <Text style={[styles.loginBtnText,{color:'black'}]}>Create Account</Text>
      </TouchableOpacity>
      <Loader visible={loading}/>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  headingText:{
    marginTop:50,
    fontSize:30,
    color:'black',
    marginLeft:20
  },
  input:{
    width:'90%',
    height:50,
    borderWidth:1,
    borderColor:'#9e9e9e',
    marginTop:20,
    alignSelf:'center',
    paddingLeft:20,
    borderRadius:10
  },
  loginBtn:{
      width:'80%',
      height:50,
      backgroundColor:'black',
      borderRadius:10,
      marginTop:50,
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center'
  },
  loginBtnText:{
    color:'white',
    fontSize:18
  },
  errorText:{
    color:'red',
    marginLeft:30,
    marginTop:5
  }
})

