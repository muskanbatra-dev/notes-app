import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react';

interface LoaderProps{
    visible:boolean
}

const Loader = ({visible}:LoaderProps) => {
  return (
    <>
    <Modal transparent visible={visible}>
    <View style={{flex:1,backgroundColor:'rgba(0,0,0.5',justifyContent:'center',alignItems:'center'}}>
    <View style={{width:90,height:90,borderRadius:9,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
      <ActivityIndicator
    size={'large'}
    color={'black'}
    
      />
      </View>
    </View>
    </Modal>
    </>
  )
}

export default Loader

const styles = StyleSheet.create({})