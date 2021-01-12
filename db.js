const { rootsql } = require('./config.json');

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }
    const mysql = require('mysql2/promise')
    const connection = await mysql.createConnection(rootsql)
    global.connection = connection;
    return connection;
}
connect()

async function selectChar(){
    const conn = await connect();
    return await conn.query('SELECT * FROM characterdb')
}

async function selectSeries(){
    const conn = await connect();
    return await conn.query('SELECT * FROM seriesdb')
}

async function addType(type,id){
    const conn = await connect();
    return await conn.query('UPDATE characterdb SET '+ type +" = " + type + ' + 1 WHERE ID = ' + id)
}

async function addTotal(id){
    const conn = await connect();
    return await conn.query("UPDATE characterdb SET Total = Total + 1 WHERE ID = " + id)
}



module.exports = {selectChar,selectSeries,addType,addTotal}