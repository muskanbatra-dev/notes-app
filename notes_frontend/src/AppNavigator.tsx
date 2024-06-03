import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './screens/Splash';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import AddNotes from './screens/AddNotes';

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Signup:undefined;
    Home: {
        id:string
    };
    AddNotes:{
        id:string,
        type:string,
        data:{}
    };
}

const Stack = createStackNavigator<RootStackParamList>();
const AppNavigator = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name='Splash' component={Splash} 
            options={{
                headerShown:false
            }}
            />
            <Stack.Screen name='Login' component={Login}
             options={{
                headerShown:false
            }}
            />
            <Stack.Screen name='Signup' component={Signup}
            options={{title:""}}
            />
            <Stack.Screen name='Home' component={Home}
             options={{
                headerShown:false
            }}
            />
            <Stack.Screen name='AddNotes' component={AddNotes}
             options={{
                headerShown:true,
                title:'Create New Node'
            }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;