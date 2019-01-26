import oracledb from 'oracledb';
import base64 from 'base-64';
import utf8 from 'utf8'
import config from "../config/index"

const user = utf8.decode(base64.decode(config.DBUSER));
const password = utf8.decode(base64.decode(config.DBPASSWORD));

export const connect =  async () => {
   try{
    await oracledb.createPool({
        user,
        password,
        connectString: config.DBCONSTR
    });
    let connection = await oracledb.getConnection();
    return connection;
   }
   catch(ex){
       console.log(ex)
       return ex;  
   }
}

export const releaseConnection =  async (connection) => {
    await connection.close()
}


