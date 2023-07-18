import {View,Text, Button, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseCofig';
import { TextInput } from 'react-native';

const List = ({ navigation }: any) => {
const [todos, setTodos] = useState<any[]>([]);
const [todo, setTodo] = useState('');

    useEffect(()=>  {
        const todoRef = collection(FIREBASE_DB, 'todos');
        const subscriber = onSnapshot(todoRef,{
            next: (snapshot) =>{
                const todos: any[] = [];
                snapshot.docs.forEach((doc) => {
                    todos.push({
                            id: doc.id,
                            ...doc.data()
                    })
                });
                setTodos(todos)
            },
        });
        return () => subscriber();
    },[]);

    const addToDo =async () => {
        const doc = await addDoc(collection(FIREBASE_DB, 'todos'), { title:todo, done: false})
        console.log('file: List.tsx:12 ~ addTodo ~ doc:', doc)
        setTodo('')
    }   


    return(
        <View>
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput style={styles.input} placeholder='Add new todo' onChangeText={(text: string) => setTodo(text)} value={todo} />
                    <Button onPress={addToDo} title='Add Todo' disabled={todo===''} />
                </View>
                {todos.length> 0 &&(
                    <View>
                        {todos.map((todo)=>(
                        <Text key={todo.id}>{todo.title}</Text>
                        ))}
                    </View>
                )}

        </View>
            
            
            
            
            <Button onPress={() => navigation.navigate('Details')} title="Open Details " />
        </View>
    )
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

    }
});