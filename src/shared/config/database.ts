import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'Abed123*',
  database:'infernogym_mysql_ts',
  connectionLimit:10   
    
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });
  
  export default connection;