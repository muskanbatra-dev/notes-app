import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { StatusBar, StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Alert,TouchableOpacity,FlatList } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../AppNavigator'
import { useIsFocused, useRoute } from '@react-navigation/native';

interface navProps {
  navigation: StackNavigationProp<RootStackParamList, "Home">
}
type id = string | undefined;

type notes = {
  title:string,
  description:string,
  _id:string,
}
type flatListType = {
  item:notes,
  index:number
}
const Home = ({ navigation }: navProps) => {
  const route = useRoute();
  const [notes, setNotes] = useState<notes[]>([]);
  const [loading,setLoading] = useState<boolean>(true)
  const isFocused= useIsFocused();
  
  const getNotes = async () => {

    const {id}:id= route.params;
    const header = new Headers();
    header.append('Content-Type', 'application/json');

    const res = await fetch(`http://10.0.2.2:8000/notes/getNotes/${id}`, {
      headers: header
    });
    const data = await res.json();
    setLoading(false)
    setNotes(data);

  };
  const handleCreateNote  = ()=>{
    navigation.navigate('AddNotes',{id:route.params.id,type:'New'})
  }


  const deleteNotes = async(id:string)=>{
    setLoading(true)

    try{
      const header = new Headers();
      header.append('Content-Type', 'application/json');
  
      const res = await fetch(`http://10.0.2.2:8000/notes/deleteNotes/${id}`, {
        headers: header,
        method:'DELETE'
      });
      setLoading(false)
      if(res.status === 200){
        getNotes();
      }
    }catch(error){
        setLoading(false)
    }
    
  }

  useEffect(()=>{
    getNotes();
  },[isFocused])
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles.header} >
        <Text style={styles.headerTitle}>Fullstack Notes App</Text>
      </View>

      {
        notes.length > 0 ? (
         <FlatList
          data={notes}
          keyExtractor={(item)=> item.id}
          renderItem={({item,index}:flatListType)=>{
              return(
                <View style={styles.notesItem}>
                  <View>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text>{item.description}</Text>
                  </View>

                  <View>
                    <TouchableOpacity onPress={()=>{
                           navigation.navigate('AddNotes',{id:route.params.id,type:'EDIT',data:item})
                    }}>
                      <Text style={{color:'green'}}>{'Edit'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                      deleteNotes(item._id)
                    }}>
                      <Text style={{color:'red'}}>{'Delete'}</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              )
          }}  
         />
        ):(
          <View  style={{justifyContent:'center',alignItems:'center',flex:1}}>
              <Text style={{color:'red',fontWeight:'bold',fontSize:20}}>No Data Found ☹️</Text>
          </View>
        )
      }

      {loading && (
                 <ActivityIndicator size="small" color={"green"} style={{justifyContent:'center',alignItems:'center',flex:1}}/>

      )}

      <TouchableOpacity style={styles.btn} onPress={handleCreateNote}>
        <Text style={styles.btnText}>Create New Note</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  header: {
    flex: 0,
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
    paddingLeft: 20
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600'
  },
  btn: {
    width: wp('50%'),
    height: 50,
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    bottom:30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },

  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },
  notesItem:{
    width:wp('90%'),
    height:80,
    borderWidth:1,
    borderRadius:10,
    alignSelf:'center',
    marginTop:10,
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:10
  }
})