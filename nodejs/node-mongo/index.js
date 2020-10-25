const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbhoper = require('./operations');

const url  =  'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url).then(client => {
    console.log('Connectes correctly to the server');
    const db = client.db(dbname);

    let collection = 'dishes';
    dbhoper.insertDocument(db, {"name": 'donut', "description": "desc"}, collection)
        .then((result) => {
            console.log('inserted document \n', result.ops);
            return dbhoper.findDocuments(db, collection);
        }).then(docs => {
            console.log('found documents ' + docs);
            return dbhoper.updateDocument(db, collection, {name: 'donut'}, {description: 'new desc'});
        }).then(result => {
            console.log('Updated document ', result.result);
            return dbhoper.findDocuments(db, collection);
        }).then(docs => {
            console.log('found documents \n' + docs);
            return db.dropCollection(collection);
        }).then(result => {
            console.log('dropped collection ' + collection);
    }).catch(error => {
        console.log(error)
    });
}).catch(err => {console.log(err)});