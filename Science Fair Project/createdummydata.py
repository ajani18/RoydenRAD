from pymongo import MongoClient
from pprint import pprint
from random import randint

client = MongoClient("mongodb://roydenlynch18:18Royaquacultureaff@testcluster-shard-00-00-odrn0.mongodb.net:27017,testcluster-shard-00-01-odrn0.mongodb.net:27017,testcluster-shard-00-02-odrn0.mongodb.net:27017/test?ssl=true&replicaSet=testcluster-shard-0&authSource=admin")
db=client.classrooms

roomtype = ['Saratoga', 'Lemle', 'Heymann', 'Oreck', 'Jefferson']
names = ['Jones', 'DBB', 'Hesse', 'Malis', 'Nicholson', 'Uskali', 'Kern', 'Krob','Bond', 'Vogt', 'McIntosh', 'Creech']
lightstatus = ['On', 'Off']

light = []
for i in range(1, 11):
    sublight = []
    for i in range(1, 365):
        sublight.append(lightstatus[randint(0, len(lightstatus)-1)])
    light.append(sublight)

temp = []
for i in range(1, 11):
    subtemp = []
    for i in range(1, 365):
        subtemp.append(randint(70, 100))
    temp.append(subtemp)

elec = []
for i in range(1, 11):
    subelec = []
    for i in range(1, 365):
        subelec.append(randint(5, 15))
    elec.append(subelec)

humid = []
for i in range(1, 11):
    subhumid = []
    for i in range(1, 365):
        subhumid.append(randint(50, 70))
    humid.append(subhumid)

occc = []
for i in range(1, 11):
    suboccc = []
    for i in range(1, 365):
        suboccc.append(randint(0, 30))
    occc.append(suboccc)
    

for x in range(1, 501):
    classrooms = {
        'room' : roomtype[randint(0, len(roomtype)-1)] + ' ' + str(randint(1, 299)),
        'teacher' : names[randint(0, len(names)-1)],
        'lightstatus' : light[randint(1, len(light)-1)],
        'avgtempperday' : temp[randint(1, len(temp)-1)],
        'avgocccperperday' : occc[randint(1, len(occc)-1)],
        'humidiity' : humid[randint(1, len(humid)-1)],
        'avgelecperday' : elec[randint(1, len(elec)-1)]
        }

    result=db.classes.insert_one(classrooms)

    print('Created {0} of 500 as {1}'.format(x,result.inserted_id))

print('Finished created some classes')
