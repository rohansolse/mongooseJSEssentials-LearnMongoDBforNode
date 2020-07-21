
const MongoClient = require('mongodb').MongoClient;
const dbUrl = "mongodb+srv://admin:admin@cluster0.mvalj.mongodb.net/example?retryWrites=true&w=majority"

MongoClient.connect(dbUrl, { useUnifiedTopology: true } ,function (err, db) {
    if (err) throw err;
    // db pointing to newdb
    console.log("Switched to " + db.databaseName + " database");

    // document to be inserted
    var doc = {
        title: "Its my health",
        author: "roshan solse",
        category: "Health"
    };

    // insert document to 'users' collection using insertOne
    db.collection("books").insertOne(doc, function (err, res) {
        if (err) throw err;
        console.log("Document inserted");
        // close the connection to db when you are done with it
        db.close();
    });
});