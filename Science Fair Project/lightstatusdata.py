#Imports
from pymongo import MongoClient
from pprint import pprint
from random import randint
import time
import datetime
#import _thread
import threading

#Connecting to MongoDB
client = MongoClient("mongodb://roydenlynch18:18Royaquacultureaff@testcluster-shard-00-00-odrn0.mongodb.net:27017,testcluster-shard-00-01-odrn0.mongodb.net:27017,testcluster-shard-00-02-odrn0.mongodb.net:27017/test?ssl=true&replicaSet=testcluster-shard-0&authSource=admin")
db = client.testing

#For Testing Purposes
client.drop_database('testing')
time.sleep(2)

timestamp = datetime.datetime.now()


#Inserting Our Test Document
db.classes.insert({"_id" : 22129, 'room' : 'makerspace', 'temp' : avgHrTempData, 'humid' : avgHrHumidData, 'occ' : avgHrOccData})

db.makerspace.insert(
    
    )

(
    {'timestamp' : timestamp,
     'lightstatus' : status,
     }
    \])

print(makerspace)


