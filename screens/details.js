import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, FlatList, Keyboard, SectionList} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import {CommonActions} from '@react-navigation/native';

import {globalStyles} from '../constants/styles';
import Colors from '../constants/colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ScrollView } from 'react-native-gesture-handler';
import {HideWithKeyboard} from 'react-native-hide-with-keyboard';
let mounted = false;
//SQL Database
import db from '../constants/database';

let screenMap = new Map();
screenMap['didnt'] = "Didn't";
screenMap['doing'] = 'Doing';
screenMap['done'] = 'Done'
// takes in task with values title, description, key; [setFunctions for each]
const Details = (props) => {
    const {title, description, key, screen} = props.route.params;
    const [newTitle, setnewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newScreen, setNewScreen] = useState(screen);
    const [refresh, setRefresh] = useState(false);
    const [hide, setHide] = useState(false);
    // use state to ensure that when any checkbox is selected, the others are unchecked
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
    // hide the submit and delete UI buttons when the keyboard is in focus
    React.componentDidMount = () =>{
        const keyboardHider = Keyboard.addListener('keyboardDidShow', typing())
        const keyboardShower = Keyboard.addListener('keyboardDidShow', notTyping())
    };
    React.componentWillUnmount = () =>{
        keyboardHider.remove();
        keyboardShower.remover();
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
    }, [])
    const typing = () => {
        setHide(true);
    }
    const notTyping = () => {
        setHide(false);
    }
    return (
        <View style={globalStyles.screen}>
            <ScrollView>
                {/*Title*/}
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    padding: 20
                    }}>
                    <TextInput style={globalStyles.input}
                        value = {newTitle}
                        onChangeText={(value) => setnewTitle(value)}
                        editable = {true}
                        placeholder = 'No Title Entered Yet'
                        placeholderTextColor = 'grey'
                    />
                </View>

                {/*Description*/}
                <View style={{
                    flex: 3,
                    alignItems: 'center',
                    padding: 20
                    }}>
                    <TextInput style={globalStyles.inputBody}
                        multiline minHeight = {200}
                        value = {newDescription}
                        onChangeText={(value) => setNewDescription(value)}
                        editable = {true}
                        textAlign = {'left'}
                        textAlignVertical = {'top'}
                        placeholder = 'No Description Entered Yet'
                        placeholderTextColor = 'grey'
                    />
                </View>
            </ScrollView>

            {/*UI buttons for updating and deleting
                They are hidden when the keyboard is pulled up*/}
            <View>
                <HideWithKeyboard>
                <FlatList
                    style={{paddingBottom: 60}}
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
                />
                {/*Update the database when a button is used*/}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress = {() => {
                        db.transaction(tx=>{
                            tx.executeSql('delete from ' + screen + ' where key = ?', [key]);
                            tx.executeSql('select * from didnt', [], (_, {rows: {_array}}) =>
                                console.log(JSON.stringify(_array)));
                        })
                        props.navigation.dispatch(CommonActions.goBack());
                        }}>
                        <Ionicons name="trash-outline" size={60} color={Colors.secondary} />
                        <Text>Delete </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress = {() => {
                        if(newScreen !== oldScreen){
                            db.transaction(tx=>{
                                tx.executeSql('delete from ' + oldScreen + ' where key = ?', [key]);
                                tx.executeSql('insert into ' + newScreen + ' (title, description, key, screen) values (?, ?, ?, ?)', [newTitle, newDescription, key, newScreen]);
                                tx.executeSql('select * from ' + newScreen, [], (_, {rows: {_array}}) =>
                                    console.log(JSON.stringify(_array)));
                            })
                        } else {
                            db.transaction(tx=>{
                            tx.executeSql('update ' + newScreen  + ' set title = ?, description = ? where key = ?;', [newTitle, newDescription, key]);
                        })}
                        props.navigation.dispatch(CommonActions.goBack());
                        }}>
                        <Ionicons name="enter-outline" size={60} color={Colors.secondary} />
                        <Text> Submit</Text>
                    </TouchableOpacity>
                </View>
                </HideWithKeyboard>
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

export default Details;

