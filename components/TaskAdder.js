import React, {useState} from 'react';
import {StyleSheet, Button, TextInput, View, Modal, TouchableOpacity, Text} from 'react-native';
import {Formik} from 'formik';
import CheckBox from '@react-native-community/checkbox';
import { Ionicons } from '@expo/vector-icons';
import {globalStyles} from '../constants/styles';
import Colors from '../constants/colors';
import Numerics from '../constants/numerics';
import Task from './Task';
import { FlatList } from 'react-native-gesture-handler';

let screenMap = new Map();
screenMap['didnt'] = "Didn't";
screenMap['doing'] = 'Doing';
screenMap['done'] = 'Done'
export default function TaskAdder({addTask, closeModalHandler}){
    const [screenList, setScreenList] = useState([
        {screen:'didnt', checked: true,key:'1'},
        {screen:"doing", checked: false,key:'2'},
        {screen:"done", checked:false, key:'3'},
    ]);
    const [refresh, setRefresh] = useState(false);

    const checkScreen = (screen) => {
        let list = screenList;
        list.forEach(item => {
            if(item.screen === screen){
                item.checked = true;
            }
            else{
                item.checked = false;
            }
        });
        setScreenList(list);
        setRefresh(!refresh);
    }
    return(
        <View style={globalStyles.screen}>
            <Formik 
                initialValues={{title: '', description: '', key: '', screen: 'didnt'}}
                onSubmit= {(values, actions) => {
                    actions.resetForm();
                    addTask(values);
                }}
            >
                {(formikProps) => (
                    <View style={globalStyles.screen}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity style={{paddingVertical: 10, paddingHorizontal: 10}} onPress={()=>closeModalHandler()}>
                                <Ionicons name="arrow-back" size={36} color="grey" />
                            </TouchableOpacity>
                            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Add Task to Board</Text>
                        </View>
                        {/* <Button title="Back" color={Colors.purple} onPress={()=>{
                            props.setModalVisible(false);
                        }}/> */}
                        <TextInput
                            style={globalStyles.input}
                            value={formikProps.values.title}
                            placeholder="Task Title"
                            onChangeText={formikProps.handleChange('title')}
                            onBlur={formikProps.handleBlur('title')}
                        />
                        <TextInput
                            value={formikProps.values.description}
                            style={globalStyles.input}
                            placeholder='Task Description'
                            onChangeText={formikProps.handleChange('description')}
                            onBlur={formikProps.handleBlur('description')}
                            multiline ={true}
                            
                        />
                        <FlatList
                            keyExtractor={(item, index) => item.key}
                            data={screenList}
                            extraData={screenList}
                            renderItem={({ item }) => (
                            <TouchableOpacity onPress={()=>{
                                checkScreen(item.screen)
                                }}>
                                <View style={globalStyles.checkList}>    
                                    <CheckBox
                                        value={item.checked}
                                        onValueChange={()=>checkScreen(item.screen)}
                                        tintColors={{true:Colors.primary}}
                                    />
                                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>{screenMap[item.screen]}</Text>
                                </View>
                                </TouchableOpacity>
                            )}
                        />
                        <View style={styles.submit}>
                            <TouchableOpacity style={{paddingVertical: 10, paddingHorizontal: 10}} onPress={formikProps.handleSubmit}>
                                <Ionicons name="enter-outline" size={36} color="grey" />
                            </TouchableOpacity>
                        </View>
                        {/* <Button title='submit' color={Colors.purple} style={{paddingVertical: 10}} onPress={formikProps.handleSubmit}/> */}
                        
            </View>
                )}
            </Formik>
        </View>
    )
}
const styles = StyleSheet.create({
    submit: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        justifyContent: 'flex-end', 
    }
});