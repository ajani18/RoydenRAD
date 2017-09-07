#01 - Pandas Introduction
#why python vs. excel?
#   -very slow (even small datasets will take ~5 minutes)
#   -basic calcuations pose a problem
#why python vs. c++?
#   -very friendly
#   -technically slower, but pretty much 99.9% as fast as c++
#why pandas vs. numpy?
#   -efficient
#   -easy-to-use

#imports
import pandas as pd
import datetime
import pandas_datareader as pdr
import matplotlib.pyplot as plt
from matplotlib import style

style.use("ggplot")

start = datetime.datetime(2010, 1, 1)
end = datetime.datetime(2015, 1, 1)

df = pdr.get_data_yahoo('AAPL')

print(df.head())

df["Adj Close"].plot()

plt.show()

