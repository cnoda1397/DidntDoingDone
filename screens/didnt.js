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
// Redux
import { connect } from 'react-redux'

let mounted = false;
const didnt = (props) =>{
    //modal visibility, the array of tasks, boolean switch for when tasks are updated
    const [modalVisible, setModalVisible] = useState(false); 

    const closeModalHandler = () =>{
        setModalVisible(false);
    }
    const addTask = (task) =>{
        setModalVisible(false);
        //alert(JSON.stringify(props.didntList));
        props.addToList(task);
    }
    return(
        <View style={styles.screen}>
            <Modal visible={modalVisible} animationType='slide'>
            <TaskAdder addTask={addTask} closeModalHandler={closeModalHandler}/>
            </Modal>
            <View style={styles.listContainer}>
                {/* <Text>{JSON.stringify(props.counter)}</Text>         */}
                <FlatList 
                    keyExtractor={(item, index) => item.key}
                    data={props.didntList}
                    extraData = {props.refresh}     
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
function mapStateToProps(state) {
    return {
        refresh: state.refresh,
        didntList: state.didntList
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addToList: (task) => dispatch({ type: 'ADD', payload: task}),
    }
}

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

    export default connect(mapStateToProps, mapDispatchToProps)(didnt);