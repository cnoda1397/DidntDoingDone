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

let mounted = false;
const database_name = 'taskDB'
const database_version = '1.0'
const database_displayname = 'TaskList Database'
const database_size = 200000
let db = SQLite.openDatabase(database_name);
// 
const didnt = (props) =>{
    let navigation = props.navigation;
    //modal visibility; the array of tasks; boolean switch for when tasks are updated
    const [modalVisible, setModalVisible] = useState(false); 
    const [list, setList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const closeModalHandler = () =>{
        setModalVisible(false);
    }
    // add task to SQLite DB
    const addTask = (task) =>{
        task.key = Date.now().toString();
        setModalVisible(false);
        db.transaction(tx =>{
            tx.executeSql('insert into ' + task.screen + ' (title, description, key, screen) values (?, ?, ?, ?)', [task.title, task.description, task.key, task.screen]);
            tx.executeSql('select * from didnt', [], (_, {rows: {_array}}) => {
                console.log(JSON.stringify(_array));
                refreshScreen();
            });

        });
    }
    // Refresh the screen so the view has updated data
    const refreshScreen = () =>{
        db.transaction(tx => {
            tx.executeSql(tx.executeSql('select * from didnt', [], (_, {rows: {_array}}) => setList(_array)));
        });
        setRefresh(!refresh);
    }
    React.useEffect(() => {
        const update = navigation.addListener('focus', () => {
            db.transaction(tx => {
                tx.executeSql(tx.executeSql('select * from didnt', [], (_, {rows: {_array}}) => setList(_array)));
                tx.executeSql(tx.executeSql('select * from didnt', [], (_, {rows: {_array}}) => console.log(JSON.stringify(_array))));
            });
          });
      }, []);

    return(
        <View style={styles.screen}>
            <Modal visible={modalVisible} animationType='slide'>
            <TaskAdder addTask={addTask} closeModalHandler={closeModalHandler}/>
            </Modal>
            <View style={styles.listContainer}>
                <FlatList 
                    keyExtractor={(item, index) => item.key}
                    data={list}
                    extraData = {refresh}     
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <TouchableOpacity onPress = {() => {
                                props.navigation.navigate('Details', {
                                title: item.title,
                                description: item.description,
                                key: item.key,
                                screen: item.screen
                                })
                            }}>
                                <Card style={styles.taskCard}>
                                    <Text style={styles.taskName}>{item.title}</Text>
                                </Card> 
                            </TouchableOpacity>
                        </View>
                    )}
                />
                
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

    export default didnt;