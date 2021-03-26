import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList} from 'react-native'
import CheckBox from '@react-native-community/checkbox';

import {globalStyles} from '../constants/styles';
import Numerics from '../constants/numerics';
import Card from '../components/Card';
import Task from '../components/Task';
import Colors from '../constants/colors';
const CheckList = (props) =>{
    let screenMap = new Map();
    screenMap['didnt'] = "Didn't";
    screenMap['doing'] = 'Doing';
    screenMap['done'] = 'Done'
    const [checkList, setCheckList] = useState(props.screenList);

    const changeCheck = (screen) =>{
        const list = checkList;
        // list.forEach(item => {
        //     if(item.screen === screen){
        //         item.checked = true;
        //     }
        //     else{
        //         item.checked = false;
        //     }
        // });
        const index = list.findIndex(obj => obj.screen === screen)
        list[index].checked = !list[index].checked;
        setCheckList(list);
        props.checkScreen(screen);
    }
    return checkList.map((item, key) =>{
        return (
            <TouchableOpacity onPress={()=>{
                changeCheck(item.screen)
                }}>
                <View style={globalStyles.checkList}>    
                    <CheckBox
                        key={item.key}
                        value={item.checked}
                        onValueChange={()=>{
                            changeCheck(item.screen)
                        }}
                        tintColors={{true:Colors.primary}}
                    />
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>{screenMap[item.screen]}</Text>
                </View>
                </TouchableOpacity>
        );
    })
}
export default CheckList;

{/* <CheckList checkScreen={checkScreen} screenList={screenList}/> */}