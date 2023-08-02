import {View,Text, Button, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseCofig';
import { TextInput } from 'react-native';
import { FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Entypo} from '@expo/vector-icons';
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8oxp4SeRw2hxD6VaNwjBbLngYauxAXeA",
    authDomain: "sanboxapp-8654d.firebaseapp.com",
    projectId: "sanboxapp-8654d",
    storageBucket: "sanboxapp-8654d.appspot.com",
    messagingSenderId: "521314368265",
    appId: "1:521314368265:web:443b0f730e7c580d97b1d8",
    measurementId: "G-C4DE0ENL5V"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export interface Todo {
    title: string;
    done: boolean;
    id:string;
}
const List = ({ navigation }: any) => {
const [todos, setTodos] = useState<Todo[]>([]);
const [todo, setTodo] = useState('');

    useEffect(()=>  {
        const todoRef = collection(FIREBASE_DB, 'todos');
        const subscriber = onSnapshot(todoRef,{
            next: (snapshot) =>{
                const todos: Todo[] = [];
                snapshot.docs.forEach((doc) => {
                    todos.push({
                            id: doc.id,
                            ...doc.data()
                    } as Todo);
                });
                setTodos(todos);
            },
        });
        return () => subscriber();
    },[]);

    const addToDo =async () => {
        const doc = await addDoc(collection(FIREBASE_DB, 'todos'), { title:todo, done: false})
        setTodo('')
    }   


    const renderTodo = ({ item }:any) =>{
        const ref  = doc(FIREBASE_DB,`todos/${item.id}`)
        
        const toggleDone = async() => {
            updateDoc(ref,{done: !item.done})
        }

        const deleteItem = async() => {
            deleteDoc(ref);
        }
        
        return(
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={toggleDone} style={styles.todo}>
                    {item.done && <Ionicons name='md-checkmark-circle' size={32} color='green'/> }
                    {!item.done && <Entypo name='circle' size={32} color='black' /> }
                    <Text style={styles.todoText}> {item.title} </Text>
                </TouchableOpacity>
                <Ionicons name="trash-bin-outline" size={24} color={'red'} onPress={deleteItem} />
            </View>
        )
    }

    return(
        <View>
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput style={styles.input} placeholder='Add new todo' onChangeText={(text: string) => setTodo(text)} value={todo} />
                    <Button onPress={addToDo} title='Add Todo' disabled={todo===''} />
                </View>
                { todos.length> 0 &&(
                    <View>
                        <FlatList
                            data={todos}
                            renderItem={(item) => renderTodo(item)}
                            keyExtractor={(todo: Todo) => todo.id}
                        />
                    </View>
                )}

        </View>
            <Button onPress={() => navigation.navigate('Details')} title="Open Details " />
            <Button onPress={async() => logEvent(analytics, 'test_event')} title="test event" />
        </View>
    );
}
export default List

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
    },
    form:{
        marginVertical:20,
        flexDirection:'row',
        alignItems: 'center',
    },
    input:{
        flex:1,
        height: 40,
        borderWidth:1,
        borderRadius:4,
        padding:10,
        backgroundColor:'#FFF'

    },
    todoContainer:{
        flexDirection:'row',
        allignItems:'center',
        backgroundColor:'#FFF',
        padding: 10,
        marginVertical: 4,
    },

    todoText: {
        flex:1,
        paddingHorizontal:4,

    },
    todo:{
        flex:1,
        flexDirection:'row',
        allignItems:'center',

    },
});