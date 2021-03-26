import {StyleSheet} from 'react-native';
import Numerics from './numerics';
import Colors from './colors';

export const globalStyles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%'
        // borderWidth: 5,
    },
    container: {
        flex: 1,
        padding: Numerics.screenpadding,
    },
    inputContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    checkList: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '15%',
        fontSize: 18,
    },
});