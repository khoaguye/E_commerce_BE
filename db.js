import mysql from "mysql"

export const db = mysql.createConnection({
    host:"3.15.6.51",
    user:"group6",
    password:"KhoaNg1234",
    database:"e_commere",
    port : '3306'

})
// db.connect((err) => {
//     if (err) {
//       console.log("Database Connection Failed !!!", err);
//     } else {
//          allProduct();
//       console.log("connected to Database");
//     }
// });
  
