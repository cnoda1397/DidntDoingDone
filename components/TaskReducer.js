import {combineReducers} from 'redux';
const initialState = {
    didntList: [],
    doingList: [],
    doneList: [],
};
const taskReducer = (state = initialState, action) => {
    const {didntList, doingList, doneList} = state;
    switch(action.type) {
        case 'addDidnt': {
            addTask(action.payload, didntList)
            newState = {didntList, doingList, doneList};
            return newState;
        }
        case 'editDidnt': {
            didntList = updateList(action.payload, didntList)
            newState = {didntList, doingList, doneList};
            return newState;
        }
        case 'deleteDidnt': {
            didntList = deleteTask(action.payload, didntList)
            newState = {didntList, doingList, doneList};
            return newState;
        }
        default:{
            return state;
        }
        // newState = {didntList, doingList, doneList};
        // return newState;
    }
    
}
const addTask = (task, list) => {
    task.key = Date.now.toString();
    return list.push(task);
}
const updateList = (task, list) => {
    let index = list.findIndex(obj => obj.key === task.key);
    list[index] = {title, description, key};
}
const deleteTask = (task, list) =>{
    console.log("removing", key);
    //console.log(JSON.stringify(taskList));
    return list.filter((obj) => obj.key !== task.key);
}

export default combineReducers({
    taskLists: taskReducer
});