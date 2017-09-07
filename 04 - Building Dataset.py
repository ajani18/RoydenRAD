#04 - Building Dataset
import quandl
import pandas as pd

#apikey
#df = quandl.get("FMAC/HPI_AK", authtoken="fiUvpFAhnXGFxSSxLqtY")
#print(df.head())

fifty_states = pd.read_html("https://simple.wikipedia.org/wiki/List_of_U.S._states", flavor="html5lib")

#this is a list
#print(fifty_states)

#this is a dataframe
#print(fifty_states[0])

#this is a column
print(fifty_states[0][0])

for abbv in fifty_states[0][0][1:]:
    print("FMAC/HPI_"+str(abbv))

