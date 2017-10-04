#Imports
from pymongo import MongoClient
from pprint import pprint
from random import randint
import time

#Connecting to MongoDB
client = MongoClient("mongodb://<<USER>>:<<PASS>>@testcluster-shard-00-00-odrn0.mongodb.net:27017,testcluster-shard-00-01-odrn0.mongodb.net:27017,testcluster-shard-00-02-odrn0.mongodb.net:27017/test?ssl=true&replicaSet=testcluster-shard-0&authSource=admin")
db = client.testing

#For Testing Purposes
client.drop_database('testing')
time.sleep(2)

#Setting Up Empty Lists
raw5SecsTempData = []
raw5SecsHumidData = []
raw5SecsOccData = []
rawHrTempData = []
rawHrHumidData = []
rawHrOccData = []

#Inserting Our Test Document
db.classes.insert({"_id" : 22129, 'room' : 'makerspace', 'temp' : tempData, 'humid' : humidData, 'occ' : occData})

#Main While Loop
while True:
    #This represents updating the lists with the new sensor reading.
    tempData.append(randint(70, 90))
    humidData.append(randint(30, 60))
    occData.append(randint(0,20))
    

    #This updates the document.
    #db.classes.update_one(
     #   {"_id" : 22129},
      #  {'$set': {'temp' : tempData}},
       # {'$set': {'humid' : humidData}},
        #{'$set': {'occ' : occData}},
        #upsert=False
        #)
    db.classes.update_one({"_id" : 22129}, {'$set': {'temp' : tempData}})
    db.classes.update_one({"_id" : 22129}, {'$set': {'humid' : humidData}})
    db.classes.update_one({"_id" : 22129}, {'$set': {'occ' : occData}})

    #This prints the document.
    makerspacedata = db.classes.find_one({'room':'makerspace'})
    print(makerspacedata)

    time.sleep(5)

