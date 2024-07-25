import mysql from 'mysql2';
import * as dotenv from 'dotenv';

dotenv.config();


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  namedPlaceholders: true,
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from(process.env.DB_PASSWORD + '\0')
  }
});
/*
const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'Abed123*',
  database:'infernogym_mysql_ts',
  connectionLimit:10   
    
});*/

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });
  
  export default connection;