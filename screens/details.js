import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, FlatList, Keyboard} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { Header } from 'react-native/Libraries/NewAppScreen';
import {Formik} from 'formik';
import {CommonActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {globalStyles} from '../constants/styles';
import Numerics from '../constants/numerics';
import Card from '../components/Card';
import Task from '../components/Task';
import Colors from '../constants/colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
// Redux
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
let screenMap = new Map();
screenMap['didnt'] = "Didn't";
screenMap['doing'] = 'Doing';
screenMap['done'] = 'Done'
// takes in task with values title, description, key; [setFunctions for each?]
const Details = (props) => {
    const {title, description, key, screen} = props.route.params;
    const [newTitle, setnewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newScreen, setNewScreen] = useState(screen);
    const [refresh, setRefresh] = useState(false);
    const [hide, setHide] = useState(false);
    const [screenList, setScreenList] = useState([
        {screen:'didnt', checked: false, key:'1'},
        {screen:"doing", checked: false, key:'2'},
        {screen:"done", checked:false, key:'3'},
    ]);
    let oldScreen = screen;
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
        setNewScreen(screen);
        setScreenList(list);
        setRefresh(!refresh);
    }
    React.useEffect(() =>{
        const screenCheckBox = props.navigation.addListener('focus',()=>{
            screenList.forEach(item=>{
                if(item.screen === screen){
                    item.checked = true;
                }    
            })
            setRefresh(!refresh);
        })
        const keyboardHider = Keyboard.addListener('keyboardDidShow', typing)
        const keyboardShower = Keyboard.addListener('keyboardDidShow', notTyping)
    })
    const typing = () => {
        setHide(true);
    }
    const notTyping = () => {
        setHide(false);
    }
    return (
        
        <View style={globalStyles.screen}>
            {/* <KeyboardAwareScrollView 
                style={{backgroundColor: 'white'}}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={globalStyles.screen}
                scrollEnabled={true}
            > */}
            <ScrollView>
            <View style={{
                flex: 1,
                alignItems: 'center',
                padding: 20
                }}>
                <TextInput style={globalStyles.input}
                    value = {newTitle}
                    onChangeText={(value) => setnewTitle(value)}
                    editable = {true}
                />
            </View>
            <View style={{
                flex: 3,
                alignItems: 'center',
                padding: 20
                }}>
                <TextInput style={globalStyles.input}
                    value = {newDescription}
                    onChangeText={(value) => setNewDescription(value)}
                    editable = {true}
                    multiline ={true}
                />
            </View>
            </ScrollView>
            {!hide ? (
            <FlatList
                keyExtractor={(item, index) => item.key}
                data={screenList}
                extraData={refresh}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{
                    checkScreen(item.screen)
                    }}>
                    <View style={globalStyles.checkList}>    
                        <CheckBox
                            value={item.checked}
                            disabled={item.checked}
                            onValueChange={(check)=>{
                                checkScreen(item.screen)
                                if(check) {checkScreen(item.screen)}
                            }}
                            tintColors={{true:Colors.primary}}
                        />
                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>{screenMap[item.screen]}</Text>
                    </View>
                    </TouchableOpacity>
                )}
            />): null}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress = {() => {
                    //props.navigation.navigate('Didnt', {terminate: true, key: key, title: null, description: null})
                    props.deleteFromList({title: newTitle, description: newDescription, key: key, screen: newScreen});
                    //props.navigation.navigate('Didnt', {refresh: true});
                    props.navigation.dispatch(CommonActions.goBack());
                    }}>
                    <Ionicons name="trash-outline" size={60} color={Colors.secondary} />
                    <Text>Delete </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress = {() => {
                    //props.navigation.navigate('Didnt', {title: newTitle, description: newDescription, key: key, terminate: null}) 
                    if(newScreen !== oldScreen){
                        props.moveList({title: newTitle, description: newDescription, key: key, screen: newScreen}, oldScreen);
                    } else {
                        props.updateList({title: newTitle, description: newDescription, key: key, screen: newScreen});
                    }
                    props.navigation.dispatch(CommonActions.goBack());
                    }}>
                    <Ionicons name="enter-outline" size={60} color={Colors.secondary} />
                    <Text> Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems:'flex-end',
        color: 'red',
        justifyContent: 'space-around',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
function mapStateToProps(state) {
    return {
        didntList: state.didntList,
        doingList: state.doingList,
        doneList: state.doneList
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addToList: (task) => dispatch({ type: 'ADD', payload: task}),
        deleteFromList: (task) => dispatch({ type: 'DELETE', payload: task}),
        updateList: (task) => dispatch({type: 'UPDATE', payload: task}),
        moveList: (task, oldScreen) => dispatch({type: 'MOVE', payload: task, oldScreen: oldScreen})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Details);




{/* <TouchableOpacity onPress={()=>{
                checkScreen(screenList[0].screen)
                }}>
                <View style={globalStyles.checkList}>    
                    <CheckBox
                        value={screenList[0].checked}
                        onValueChange={(check)=>{
                            if(check) {checkScreen(screenList[0].screen)}
                            else {setRefresh(!refresh)}
                            
                        }}
                        tintColors={{true:Colors.primary}}
                    />
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>{screenMap[screenList[0].screen]}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                checkScreen(screenList[1].screen)
                }}>
                <View style={globalStyles.checkList}>    
                    <CheckBox
                        value={screenList[1].checked}
                        onValueChange={(check)=>{
                            if(check) {checkScreen(screenList[1].screen)}
                            else {setRefresh(!refresh)}
                        }}
                        tintColors={{true:Colors.primary}}
                    />
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>{screenMap[screenList[1].screen]}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                checkScreen(screenList[2].screen)
                }}>
                <View style={globalStyles.checkList}>    
                    <CheckBox
                        value={screenList[2].checked}
                        onValueChange={(check)=>{
                            if(check) {checkScreen(screenList[2].screen)}
                            else {setRefresh(!refresh)}
                        }}
                        tintColors={{true:Colors.primary}}
                    />
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>{screenMap[screenList[2].screen]}</Text>
                </View>
            </TouchableOpacity> */}