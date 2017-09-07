#02 - Pandas Basics

##imports
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import style
style.use("ggplot")
import numpy as np

##what is a data frame?
##   a data frame is esentially like a python dictionary,
##   mostly because we can reference it like one.

##getting the data
web_stats = {"Day" : [1, 2, 3, 4, 5, 6],
             "Visitors" : [43, 53, 34, 45, 64, 34],
             "Bounce_Rate" : [65, 72, 62, 64, 54, 66]}

##converting the data into a dataframe
df = pd.DataFrame(web_stats)

##the follow are print commands to make sure the dataframe is working
##print(df)
##   prints entire set of data
##print(df.head())
##   prints first five lines of data
##print(df.tail())
##   prints last five lines of data
##print(df.tail(2))
##   prints last two lines of data

##setting up an index
##df.set_index("Day")
##print(df.set_index("Day"))

##problem - setting an index makes a new dataframe,
##          but doesn't change the existing one.
##df = df.set_index("Day")
##df2 = df.set_index("Day")

##df.set_index("Day", inplace=True)
##print(df.head())

##reference specific columns
##print(df["Bounce_Rate"])
##print(df.Visitors)

##refrence multiple columns
##print(df[["Bounce_Rate","Visitors"]])

##converting to lists/arrays
##print(df.Visitors.tolist())
##print(np.array(df[["Bounce_Rate","Visitors"]]))

##converting it back to a dataframe
##df2 = pd.DataFrame(np.array(df[["Bounce_Rate","Visitors"]]))
##print(df2)



