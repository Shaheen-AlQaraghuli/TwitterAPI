from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import io
import base64



app = FastAPI()

class CSV(BaseModel):
    name: str

@app.post("/")
def read_root(csv: CSV):
    path = "../express/%s.csv" %csv.name
    tweets_df = pd.read_csv(path)
    plot = pd.value_counts(tweets_df['month']).plot.bar()
    IOBytes = io.BytesIO()
    plot.figure.savefig(IOBytes, format='png')
    IOBytes.seek(0)
    imageBase64 = base64.b64encode(IOBytes.read())
    return { "image": imageBase64 }
