// React & React Native
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, FlatList, Button, Modal, TouchableHighlight, TouchableOpacity} from 'react-native'
import {Formik} from 'formik';
import { Ionicons } from '@expo/vector-icons';
// React Navigation
import {CommonActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// Components & Constants
import {globalStyles} from '../constants/styles';
import Numerics from '../constants/numerics';
import Card from '../components/Card';
import Task from '../components/Task';
import Colors from '../constants/colors';
import TaskAdder from '../components/TaskAdder'

import * as SQLite from 'expo-sqlite';

const database_name = 'taskDB'
const database_version = '1.0'
const database_displayname = 'TaskList Database'
const database_size = 200000
let db = SQLite.openDatabase(database_name);
const doing = (props) =>{
    let navigation = props.navigation;
    //modal visibility, the array of tasks, boolean switch for when tasks are updated
    const [modalVisible, setModalVisible] = useState(false); 
    const [list, setList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    
    // Function that updates a task in the TaskList
    // finds the task index by its key, updates the array instance, then updates setRefresh
    //      so the FlatList knows to rerender its items to the updated values.
    // const updateList = (title, description, key) => {
    //     // let index = taskList.findIndex(obj => obj.key === key);
    //     // taskList[index] = {title, description, key};
    //     props.editList({title: title, description: description, key: key});
    //     setRefresh(!refresh);
    // }

    // Function that adds a task to the TaskList
    // returns the array with the new task appended
    const closeModalHandler = () =>{
        setModalVisible(false);
    }
    // const addTask = (task) =>{
    //     task.key = Date.now().toString();
    //     setModalVisible(false);
    //     props.addToList(task);
    // }
    const addTask = (task) =>{
        task.key = Date.now().toString();
        setModalVisible(false);
        //alert(JSON.stringify(props.didntList));
        //props.addToList(task);
        db.transaction(tx =>{
            tx.executeSql('insert into ' + task.screen + ' (title, description, key, screen) values (?, ?, ?, ?)', [task.title, task.description, task.key, task.screen]);
            tx.executeSql('select * from doing', [], (_, {rows: {_array}}) => {
                console.log(JSON.stringify(_array));
                refreshScreen();
            });

        });
        // db.transaction(tx => {
        //     tx.executeSql('select * from didnt where key not = ?', ['123456789'], (_, {rows: {_array}}) => setList(_array));
        //     tx.executeSql('drop database taskDB;');
        //});
        //db = SQLite.openDatabase(database_name);
        //setRefresh(!refresh);
    }
    const refreshScreen = () =>{
        db.transaction(tx => {
            tx.executeSql(tx.executeSql('select * from doing', [], (_, {rows: {_array}}) => {
                setList(_array)
                console.log(JSON.stringify(_array))
            }));
        });
        setRefresh(!refresh);
    }
    const killList = () =>{
        db.transaction(tx => {
            tx.executeSql(tx.executeSql('delete from doing;', []));
            tx.executeSql(tx.executeSql('select * from doing', [], (_, {rows: {_array}}) => {
                console.log(JSON.stringify(_array))
            }));
        });
        setRefresh(!refresh);
    }
    React.useEffect(() => {
        const update = navigation.addListener('focus', () => {
            db.transaction(tx => {
                tx.executeSql(tx.executeSql('select * from doing', [], (_, {rows: {_array}}) => setList(_array)));
            });
          });
      }, []);
    // React.useEffect(() => {
    //     if(props.route.params?.terminate){
    //         alert('delete');
    //         setRefresh(!refresh);
    //         props.decreaseCounter(props.route.params)
    //         // setTaskList(deleteTask(props.route.params.key));
            
    //         props.route.params.terminate = !props.route.params.terminate;
    //     }
    //     else {
    //         if(props.route.params?.description || props.route.params?.title){
    //         alert('refresh');
    //         console.log(JSON.stringify(props.route.params));
    //         const {title, description, key} = props.route.params;
    //         props.editList({title: title, description: description, key: key});
    //         } 
    //     }
    //     setRefresh(!refresh);
    // }, [props.route.params?.terminate, props.route.params?.title, props.route.params?.description, props.route.params?.refresh])

    // Function that deletes a task from the TaskList
    // returns the array, but filters out any task with the passed key
    // const deleteTask = (key) =>{
    //     console.log("removing", key);
    //     //console.log(JSON.stringify(taskList));
    //     return taskList.filter((obj) => obj.key !== key);
    // }

    return(
        <View style={styles.screen}>
            <Modal visible={modalVisible} animationType='slide'>
            <TaskAdder addTask={addTask} closeModalHandler={closeModalHandler}/>
            </Modal>
            <View style={styles.listContainer}>
                {/* <Text>{JSON.stringify(props.counter)}</Text>         */}
                <FlatList 
                    keyExtractor={(item, index) => item.key}
                    data={list}
                    extraData = {refresh}     
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <TouchableOpacity onPress = {() => props.navigation.navigate('Details', {
                                title: item.title,
                                description: item.description,
                                key: item.key,
                                screen: item.screen,
                            })}>
                                <Card style={styles.taskCard}>
                                    <Text style={styles.taskName}>{item.title}</Text>
                                </Card> 
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <Button title="refresh screen" onPress={()=>{
                    console.log('refreshing')
                    refreshScreen();
                    }}/>
                <Button title="Kill List" onPress={()=>{
                    console.log('Allah Ahkbar')
                    killList();
                    }}/>
                {/* <Button title="*" onPress={()=>console.log(JSON.stringify(props.route.params))}/> in case params gets messed up again*/}
                <View style={styles.addButton}>
                    <TouchableOpacity onPress = {() => {
                        setModalVisible(true)
                        }}>
                        <Ionicons name="md-add-circle-outline" size={80} color={Colors.secondary}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white',
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flex: 1
    },
    listContainer: {
        flex: 1,
        position: 'relative',
    },
    input: {
        width: '80%', 
        borderBottomColor: 'black', 
        borderBottomWidth: 1, 
        padding: 10
    },

    listItem: {
        alignItems: 'center',
        padding: 5,
        margin: 3,
    },
    buttonContainer: {
        width: 80,
        height: 40,
        flexDirection: 'row',
        alignItems:'flex-end',
        color: 'red'
    },
    taskCard:{
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: Colors.primary,
    },
    taskName: {
        flex: 2,
        paddingBottom: Numerics.cardPadding,
        fontSize: 18
    },
    taskInputContainer: {
        padding: '5%',
    },
    taskInput: {
        width: '80%', 
        borderBottomColor: 'black', 
        borderBottomWidth: 1, 
        padding: 10
    },
    addButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        justifyContent: 'flex-end', 

    }
    });

    export default doing;