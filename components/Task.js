import React, {useState} from 'react';
import {Platform, View, Text, TextInput, Button, StyleSheet, Keyboard, Modal} from 'react-native';
import Colors from '../constants/colors';
import Card from './Card';
import Numerics from '../constants/numerics';
// import Modal from 'react-native-modal';



const Task= props=> {
    const [title, setTitle] = useState('');
    const [description, setDiscription] = useState('');
    const [workers, setWorkers] = useState(['']);
    const [key, setKey] = useState(0);

    // const setTitle = (taskTitle) =>{
    //     title = taskTitle;
    // }
    // const setDescription = (taskDescription) => {
    //     description = taskDescription;
    // }
    // const setWorkers = (taskWorkers) => {
    //     workers = taskWorkers;
    // }
    // const setKey = (taskKey) => {
    //     key = taskKey;
    // }
    setTitle(props.taskTitle);
    setDiscription(props.taskDescription);
    setWorkers(props.taskWorkers);
    setKey(props.taskKey);
    return(
        <Card style={styles.taskCard}>
            <Text style={styles.taskName}>{props.taskTitle}</Text>
            <Button 
                style={styles.taskDetails}
                title="Task Details" 
                color = {Colors.purple} 
                onPress = {() => {
                    openTask();
                    console.log("Button");
                }}
            />
        </Card>
        
    );

};
const styles = StyleSheet.create({
    taskCard:{
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderColor: 'red',
        borderWidth: 5,
        backgroundColor: Colors.teal,
    },
    taskName:{
        flex: 2,
        paddingBottom: Numerics.cardPadding,
        fontSize: 18
    },
    taskDetails:{
        flex: 1,
    }
});
export default Task;