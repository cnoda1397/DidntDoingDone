import React, {useState} from 'react';
import {StyleSheet, Button, TextInput, View, Modal, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
//import CheckBox from '@react-native-community/checkbox';
import { Ionicons } from '@expo/vector-icons';
import {globalStyles} from '../constants/styles';
import Colors from '../constants/colors';
import Numerics from '../constants/numerics';
import Task from './Task';
let mounted = false;
export default function TaskAdder({addTask, closeModalHandler}){
    return(
        <View style={globalStyles.screen}>
            <Formik 
                initialValues={{title: '', description: '', key: ''}}
                onSubmit= {(values, actions) => {
                    actions.resetForm();
                    addTask(values);
                }}
            >
                {(formikProps) => (
                    <View style={globalStyles.screen}>
                        <TouchableOpacity style={{paddingVertical: 10}} onPress={()=>closeModalHandler()}>
                            <Ionicons name="arrow-back" size={36} color="grey" />
                        </TouchableOpacity>
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

                        <View style={styles.submit}>
                            <TouchableOpacity style={{paddingVertical: 10}} onPress={formikProps.handleSubmit}>
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