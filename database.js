var mysql = require('mysql');

function readNote(noteID, callback) {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "kristina",
        password: "kristina01",
        database: "cloud_notes"
    });

    conn.connect();

    conn.query(`SELECT content , title FROM notes WHERE noteID = ${noteID}`, (error , results) => {
        if (error){
          callback(error);}
        else{
          try {
            const row = results[0];
            const note = {
            title: row.title,
            content: row.content}
            conn.end();
            callback(null , note);
          } catch (error) {
            callback(error);
          }
        }
        
    });
}

function deleteNote(noteID, callback) {
  var conn = mysql.createConnection({
    host: "localhost",
    user: "kristina",
    password: "kristina01",
    database: "cloud_notes"
  });

  conn.connect();

  
  conn.query(`DELETE FROM notes WHERE noteID = ${noteID}`, (error, result) => {
    conn.end();
    if (error) {
      callback(error);
    } else {
      if (result.affectedRows === 0) {
        const error = new Error('Note not found');
        callback(error);
      } else {
        callback(null);
      }
    }
  });
}


module.exports = {readNote , deleteNote};