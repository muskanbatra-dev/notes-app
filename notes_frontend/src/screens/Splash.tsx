import { StyleSheet, Text, View } from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { RootStackParamList } from '../AppNavigator'

interface navProps {
  navigation:StackNavigationProp<RootStackParamList,"Splash">
}
const Splash = ({navigation}:navProps) => {

  useEffect(()=>{
    setTimeout(() => {
      navigation.navigate('Login')
    }, 1500);
  },[])
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        Notes APP
      </Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    color:"#FFFFFF",
    fontSize:30
  }
})