import {createConnection} from "typeorm";

let dbConnection;
createConnection().then(connection => {
    dbConnection = connection;
}).catch(error => console.log(error));

export {dbConnection}