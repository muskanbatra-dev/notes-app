import { StyleSheet, Text, SafeAreaView,TouchableOpacity,TextInput } from 'react-native'
import { RootStackParamList } from '../AppNavigator'
import {StackNavigationProp} from '@react-navigation/stack'
import React,{useState} from 'react'
import Loader from '../Components/Loader'

interface navProps {
  navigation:StackNavigationProp<RootStackParamList,"Signup">
}

const Signup = ({navigation}:navProps) => {
  const [email,setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const [name,setName] = useState<string>('')
  const [invalidEmail,setInvaliEmail] = useState<boolean>(false);
  const [invalidName,setinIvalidName] = useState<boolean>(false);
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
    }

    if(password.length < 1){
      setInvalidPassword(true);
      valid=false;
    }else if(password.length > 0){
      setInvalidPassword(false);
      valid = true;
    };

    if(name.length < 1){
      setinIvalidName(true);
      valid=false;
    }else if(name.length > 0){
      setinIvalidName(false);
      valid = true;
    };

    return valid;

  }
  
  const handleSignup = async()=>{
    setLoading(true)
    try{
      const headers = new Headers();
      headers.append('Content-Type',"application/json");
      const body = {email:email,password:password,name:name};
  
      const res = await fetch('http://10.0.2.2:8000/auth/register',{
        headers:headers,
        method:'POST',
        body:JSON.stringify(body)
      });
  
      const data = await res.json();      

      setEmail('');
      setPassword('');
      setName('');

      if(data){
        setLoading(false)
        navigation.navigate('Home',{id:data._id})
      }
    }catch(error){
      setLoading(false)
      console.log('something went wrong');
      console.log(error);
      setEmail('');
      setPassword('');
      setName('');
    }

    

    
  }
  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.headingText}>Welcome</Text>
    <TextInput style={styles.input} placeholder='enter Name' value={name} onChangeText={(text)=> setName(text)} keyboardType='email-address'/>
    {invalidName && (
      <Text style={styles.errorText}>please enter a valid name</Text>
    )}
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
        handleSignup();
      }
    }}>
      <Text style={styles.loginBtnText}>Create Account</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.loginBtn,{backgroundColor:'white',borderWidth:1,borderColor:'black',marginTop:10}]}
    onPress={()=>{
      navigation.navigate('Login');
    }}
    >
      <Text style={[styles.loginBtnText,{color:'black'}]}>Already have an account? Login</Text>
    </TouchableOpacity>
    <Loader visible={loading} />
  </SafeAreaView>
  )
}

export default Signup

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