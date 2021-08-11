import React, {useState} from 'react';
import {StyleSheet, Button, TextInput, View, FlatList, TouchableOpacity, Text} from 'react-native';
import {Formik} from 'formik';
import CheckBox from '@react-native-community/checkbox';
import { Ionicons } from '@expo/vector-icons';
import {globalStyles} from '../constants/styles';
import Colors from '../constants/colors';
import Numerics from '../constants/numerics';
import Task from './Task';
import {HideWithKeyboard} from 'react-native-hide-with-keyboard';

let screenMap = new Map();
screenMap['didnt'] = "Didn't";
screenMap['doing'] = 'Doing';
screenMap['done'] = 'Done'
export default function TaskAdder({addTask, closeModalHandler}){
    // addTask: 
    // use state to ensure that when any checkbox is selected, the others are unchecked
    const [screenList, setScreenList] = useState([
        {screen:'didnt', checked: true,key:'1'},
        {screen:"doing", checked: false,key:'2'},
        {screen:"done", checked:false, key:'3'},
    ]);
    const [refresh, setRefresh] = useState(false);
    const [finalScreen, setFinalScreen] = useState('didnt')

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
        setFinalScreen(screen);
        setScreenList(list);
        setRefresh(!refresh);
    }

    return(
        <View style={globalStyles.screen}>
            {/*use Formik to manage value inputs for the task descriptors*/}
            <Formik 
                initialValues={{title: '', description: '', key: '', screen: 'didnt'}}
                onSubmit= {(values, actions) => {
                    values.screen = finalScreen;
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

                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            paddingHorizontal: 20
                        }}>
                            <TextInput
                                style={globalStyles.input}
                                value={formikProps.values.title}
                                placeholder="Task Title"
                                onChangeText={formikProps.handleChange('title')}
                                onBlur={formikProps.handleBlur('title')}
                            />
                        </View>

                        <View style={{
                            flex: 3,
                            alignItems: 'center',
                            paddingHorizontal: 20
                        }}>
                            <TextInput
                                value={formikProps.values.description}
                                style={globalStyles.inputBody}
                                multiline minHeight={240}
                                placeholder='Task Description'
                                onChangeText={formikProps.handleChange('description')}
                                onBlur={formikProps.handleBlur('description')}
                                multiline ={true}
                                textAlign = {'left'}
                                textAlignVertical = {'top'}
                            />
                        </View>
                        {/*UI buttons for updating and deleting
                        They are hidden when the keyboard is pulled up*/}
                        <HideWithKeyboard style={{paddingBottom: 120, justifyContent: 'center', }}>
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
                                                onValueChange={()=>{
                                                    checkScreen(item.screen)
                                                }}
                                                tintColors={{true:Colors.primary}}
                                            />
                                            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{screenMap[item.screen]}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </HideWithKeyboard>

                        <View style={styles.submit}>
                            <TouchableOpacity style={{paddingVertical: 10, paddingHorizontal: 10}} onPress={formikProps.handleSubmit}>
                                <Ionicons name="enter-outline" size={60} color="grey" />
                            </TouchableOpacity>
                        </View>                        
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