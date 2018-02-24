var express = require('express');
var router = express.Router();
var Data = require('.././dataModels/data'); //bring in schema (how data is orgnaized in database)


var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


router.get('/mrjones', function (req, res, next) {
    MongoClient.connect('mongodb://abhijani123:Password@cluster0-shard-00-00-8t9ca.mongodb.net:27017,cluster0-shard-00-01-8t9ca.mongodb.net:27017,cluster0-shard-00-02-8t9ca.mongodb.net:27017/RAD?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', function (err, db) {
            if (err) { return console.dir(err); }
            var collection = db.collection('MrJones');
            collection.find().sort({ "timestamp": -1 }).toArray(function (err, dataJones) {
                res.json(dataJones); //
            });
        });
}); //allows classesdata

router.get('/makerspace', function (req, res, next) {
     MongoClient.connect('mongodb://abhijani123:Beastmode17@cluster0-shard-00-00-8t9ca.mongodb.net:27017,cluster0-shard-00-01-8t9ca.mongodb.net:27017,cluster0-shard-00-02-8t9ca.mongodb.net:27017/testing?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', function (err, db) {
            if (err) { return console.dir(err); }
            var collection = db.collection('makerspace');
            //new ISODate("2017-11-21T00:00:00Z")
            collection.find().sort({ "timestamp": -1 }).limit(10000).toArray(function (err, dataMakerSpace) {
                res.json(dataMakerSpace);
            });
        });
});
/* GET home page. */





module.exports = router; //routes resoiblie from model to views


//mongo "mongodb://testcluster-shard-00-00-odrn0.mongodb.net:27017,testcluster-shard-00-01-odrn0.mongodb.net:27017,testcluster-shard-00-02-odrn0.mongodb.net:27017/test?ssl=true&replicaSet=testcluster-shard-0" --authenticationDatabase admin --ssl --username abhijani --password beastmode17
