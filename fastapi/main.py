from fastapi import FastAPI
from pydantic import BaseModel
import matplotlib.pyplot as plt
import pandas as pd
import matplotlib
matplotlib.use('Agg')



app = FastAPI()

class CSV(BaseModel):
    name: str

@app.post("/")
def read_root(csv: CSV):
    print("i am here as well")
    path = "../express/%s.csv" %csv.name
    tweets_df = pd.read_csv(path)
    plot = pd.value_counts(tweets_df['month']).plot.bar()
    plot.figure.savefig(csv.name)
