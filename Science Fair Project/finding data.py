from pymongo import MongoClient
client = MongoClient("mongodb://roydenlynch18:18Royaquacultureaff@testcluster-shard-00-00-odrn0.mongodb.net:27017,testcluster-shard-00-01-odrn0.mongodb.net:27017,testcluster-shard-00-02-odrn0.mongodb.net:27017/test?ssl=true&replicaSet=testcluster-shard-0&authSource=admin")
db = client.testing
count = db.makerspace.find({"indentifier":1}).count()
occupied = db.makerspace.find({"occupancystatus":1}).count()
unoccupied = db.makerspace.find({"occupancystatus":0}).count()
print("Total Data: " + str(count))
print("Occupied: " + str(occupied))
print("Unoccupied: " + str(unoccupied))
