#Imports
from pymongo import MongoClient
from pprint import pprint
from random import randint
import time
#import _thread
import threading

#Connecting to MongoDB
client = MongoClient("mongodb://<<USER>>:<<PASS>>@testcluster-shard-00-00-odrn0.mongodb.net:27017,testcluster-shard-00-01-odrn0.mongodb.net:27017,testcluster-shard-00-02-odrn0.mongodb.net:27017/test?ssl=true&replicaSet=testcluster-shard-0&authSource=admin")
db = client.testing

#For Testing Purposes
client.drop_database('testing')
time.sleep(2)

#Setting Up Empty Lists
global raw15MinTempData
raw15MinTempData = []
global raw15MinHumidData
raw15MinHumidData = []
global raw15MinOccData
raw15MinOccData = []
global avgHrTempData
avgHrTempData = []
global avgHrHumidData
avgHrHumidData = []
global avgHrOccData
avgHrOccData = []

#Inserting Our Test Document
db.classes.insert({"_id" : 22129, 'room' : 'makerspace', 'temp' : avgHrTempData, 'humid' : avgHrHumidData, 'occ' : avgHrOccData})


#currentReadTempSensor
#currentReadHumidSensort
#currentReadOccSensor

#Creating Average-Calculating Threads - These threads will read data every fifteen minutes and average it by the hour.
class tempThread(threading.Thread):
    def __init__(self, threadID, name, counter):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.name = name
      self.counter = counter
    def run(self):
      print("Starting " + str(self.name))
      genAvgHrTempData(self.name, raw15MinTempData)
      print("Exiting " + str(self.name))

class humidThread(threading.Thread):
    def __init__(self, threadID, name, counter):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.name = name
      self.counter = counter
    def run(self):
      print("Starting " + str(self.name))
      genAvgHrHumidData(self.name, raw15MinHumidData)
      print("Exiting " + str(self.name))

class occThread(threading.Thread):
    def __init__(self, threadID, name, counter):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.name = name
      self.counter = counter
    def run(self):
      print("Starting " + str(self.name))
      genAvgHrOccData(self.name, raw15MinOccData)
      print("Exiting " + str(self.name))

#Creating Push Thread - This thread will send data to MongoDB.
class pushThread(threading.Thread):
    def __init__(self, threadID, name, counter):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.name = name
      self.counter = counter
    def run(self):
      print("Starting " + str(self.name))
      pushData(self.name, avgHrTempData, avgHrHumidData, avgHrOccData)
      print("Exiting " + str(self.name))

#genAvgHrData Functions - These functions take the readings every fifteen minutes and averages them.
def genAvgHrTempData(threadName, r15data):
    while True:
        if len(r15data) < 4:
            r15data.append(randint(70, 90))
            #print(r15data)
        elif len(r15data) == 4:
            avgHrTempData.append(sum(r15data)/len(r15data))
            r15data = []
            #print(avgHrTempData)
        time.sleep(1)

def genAvgHrHumidData(threadName, r15data):
    while True:
        if len(r15data) < 4:
            r15data.append(randint(30, 60))
            #print(r15data)
        elif len(r15data) == 4:
            avgHrHumidData.append(sum(r15data)/len(r15data))
            r15data = []
            #print(avgHrHumidData)
        time.sleep(1)

def genAvgHrOccData(threadName, r15data):
    while True:
        if len(r15data) < 4:
            r15data.append(randint(0, 20))
            #print(r15data)
        elif len(r15data) == 4:
            avgHrOccData.append(sum(r15data)/len(r15data))
            r15data = []
            #print(avgHrOccData)
        time.sleep(1)
        
#pushData Function - This pushes the resulting data to MongoDB.
def pushData(threadName, tempData, humidData, occData):
    while True:
        #This updates the document.
        db.classes.update_one({"_id" : 22129}, {'$set': {'temp' : tempData}})
        db.classes.update_one({"_id" : 22129}, {'$set': {'humid' : humidData}})
        db.classes.update_one({"_id" : 22129}, {'$set': {'occ' : occData}})

        #This prints the document.
        makerspacedata = db.classes.find_one({'room':'makerspace'})
        print(makerspacedata)

        time.sleep(5)

#This connects all the threads to a referencable variable.
thread1 = tempThread(1, "Thread-Temperature", 1)
thread2 = humidThread(2, "Thread-Humidity", 2)
thread3 = occThread(3, "Thread-Occupency", 3)
thread4 = pushThread(4, "Thread-PushData", 4)

#This starts all the threads.
thread1.start()
thread2.start()
thread3.start()
thread4.start()

print("Existing main thread.")


