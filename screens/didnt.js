import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, FlatList, Button, Modal, TouchableHighlight, TouchableOpacity} from 'react-native'
import {Formik} from 'formik';
import { Ionicons } from '@expo/vector-icons';
import {CommonActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {globalStyles} from '../constants/styles';
import Numerics from '../constants/numerics';
import Card from '../components/Card';
import Task from '../components/Task';
import Colors from '../constants/colors';
import TaskAdder from '../components/TaskAdder'

let mounted = false;
const didnt = ({route, navigation}) =>{
    //modal visibility, the array of tasks, boolean switch for when tasks are updated
    const [modalVisible, setModalVisible] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [refresh, setRefresh] = useState(false); // the value of refresh does not matter. The changing of the value tells the FlatList to rerender.
 

    // Function that updates a task in the TaskList
    // finds the task index by its key, updates the array instance, then updates setRefresh
    //      so the FlatList knows to rerender its items to the updated values.
    const updateList = (title, description, key) => {
        let index = taskList.findIndex(obj => obj.key === key);
        taskList[index] = {title, description, key};
        setRefresh(!refresh);
    }

    // Function that adds a task to the TaskList
    // returns the array with the new task appended
    const closeModalHandler = () =>{
        setModalVisible(false);
    }
    const addTask = (task) =>{
        task.key = Date.now().toString();
        setTaskList((currentTasks) => {
            return [...currentTasks, task];
        });
        setModalVisible(false);
        console.log(taskList.length);
    }
    React.componentDidMount = () => {
        mounted = true;
    }
    React.componentWillUnmount = () => {
        mounted = false;
    }
    React.useEffect(() => {
        if(route.params?.terminate){
            alert('delete');
            setTaskList(deleteTask(route.params.key));
            setRefresh(!refresh);
            route.params.terminate = !route.params.terminate;
        }
        else {
            if(route.params?.description || route.params?.title){
            alert('refresh');
            console.log(JSON.stringify(route.params));
            const {title, description, key} = route.params;
            updateList(title, description, key);
        }}
    }, [route.params?.terminate, route.params?.title, route.params?.description])

    // Function that deletes a task from the TaskList
    // returns the array, but filters out any task with the passed key
    const deleteTask = (key) =>{
        console.log("removing", key);
        //console.log(JSON.stringify(taskList));
        return taskList.filter((obj) => obj.key !== key);
    }

    return(
        <View style={styles.screen}>
            <Modal visible={modalVisible} animationType='slide'>
            <TaskAdder addTask={addTask} closeModalHandler={closeModalHandler}/>
            </Modal>
            <View style={styles.listContainer}>        
                <FlatList 
                    keyExtractor={(item, index) => item.key}
                    data={taskList}
                    extraData = {refresh}     
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <TouchableOpacity onPress = {() => navigation.navigate('Details', {
                                title: item.title,
                                description: item.description,
                                key: item.key,
                            })}>
                                <Card style={styles.taskCard}>
                                    <Text style={styles.taskName}>{item.title}</Text>
                                </Card> 
                            </TouchableOpacity>
                        </View>
                    )}
                />
                {/* <Button title="*" onPress={()=>console.log(JSON.stringify(route.params))}/> in case params gets messed up again*/}
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
        borderColor: 'red',
        borderWidth: 5,
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