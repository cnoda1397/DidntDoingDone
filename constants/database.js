import * as SQLite from 'expo-sqlite';
//A constant SQL database shared by all screens
const database_name = 'taskDB'
const database_version = '1.0'
const database_displayname = 'TaskList Database'
const database_size = 200000
const  db = SQLite.openDatabase(database_name);

export default db;