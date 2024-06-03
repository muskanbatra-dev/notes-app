import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Loader from '../Components/Loader';

const AddNotes = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [title, setTitle] = useState<string>(route.params.type == "EDIT" ? route.params.data.title : '');
    const [description, setdescription] = useState<string>(route.params.type == "EDIT" ? route.params.data.description : '');
    const [isInvalidTitle, setisInvalidTitle] = useState<boolean>(false);
    const [isInvalidDesc, setIsInvalidDesc] = useState<boolean>(false);
    const [loading,setLoading] = useState(false)

    const validate = () => {
        
        let valid = true;

        if (title.length < 1) {
            setisInvalidTitle(true);
            valid = false;
        } else if (title.length > 0) {
            setisInvalidTitle(false);
            valid = true;
        };

        if (description.length < 1) {
            setIsInvalidDesc(true);
            valid = false;
        } else if (description.length > 0) {
            setIsInvalidDesc(false);
            valid = true;
        };

        return valid;

    };

    const handleAddNote = async () => {
        setLoading(true)
        const header = new Headers();
        header.append('Content-Type','application/json');
        const body = {title,description,postedBy:route.params.id};
       
        try{
            const res = await fetch('http://10.0.2.2:8000/notes/createNotes',{
                headers:header,
                method:'POST',
                body:JSON.stringify(body)
            });
            setTitle('');
            setdescription('');
            setLoading(false);
            navigation.goBack();

        }catch(error){
            setLoading(false)
            console.log(error)
        }

    }

    const updateNote = async () =>{
        setLoading(true)
        try{

            const header = new Headers();
            header.append('Content-Type','application/json');
            const body = {title,description,postedBy:route.params.id};

            const res = await fetch(`https://notes-app-mern-react-native-server.vercel.app/notes/updateNotes/${route.params.data._id}`,{
                headers:header,
                method:'PUT',
                body:JSON.stringify(body)
            })
            setLoading(false);
            setTitle('');
            setdescription('');
            navigation.goBack();

        }catch(error){
            setLoading(false)
            console.log(error)
        }

    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='enter Title'
                style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            {isInvalidTitle && <Text style={styles.invalidText}> please enter valid title</Text>}
            <TextInput
                placeholder='enter Desription'
                style={styles.input}
                value={description}
                onChangeText={(text) => setdescription(text)}
            />
            {isInvalidDesc && <Text style={styles.invalidText}> please enter valid Desription </Text>}

            {
                route.params.type === "EDIT" ? (
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        if (validate()) {
                            updateNote()
                        }
                    }}>
                        <Text style={styles.btnText}>Update Note</Text>
                        <Loader visible={loading}/>
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        if (validate()) {
                            handleAddNote()
                        }
                    }}>
                        <Text style={styles.btnText}>Add Note</Text>
                        <Loader visible={loading}/>
                    </TouchableOpacity>
                )
            }
           
        </View>
    )
}

export default AddNotes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    input: {
        width: '90%',
        height: 45,
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        paddingLeft: 20
    },
    btn: {
        width: '90%',
        height: 45,
        backgroundColor: 'black',
        borderRadius: 9,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    },
    invalidText: {
        color: 'red',
        marginLeft: 40
    }
})