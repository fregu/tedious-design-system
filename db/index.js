const MongoClient = require('mongodb').MongoClient

var url = "mongodb://localhost:27017/mydatabase"; // mydatabase is the name of db
MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  console.log("Database created!");
  db.close();
});
