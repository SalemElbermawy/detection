from fastapi  import FastAPI,File,UploadFile
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import keras

model_1000 = tf.keras.applications.MobileNetV2(weights="imagenet")

churn_model=joblib.load("churn_model.pkl")

class Churn(BaseModel):
    
    gender:str
    SeniorCitizen:int
    Partner:str
    Dependents:str
    tenure:float
    PhoneService:str
    MultipleLines:str
    InternetService:str
    OnlineSecurity:str
    OnlineBackup:str
    DeviceProtection:str
    TechSupport:str
    StreamingTV:str
    StreamingMovies:str
    Contract:str
    PaperlessBilling:str
    PaymentMethod:str
    MonthlyCharges:float
    TotalCharges:float


app=FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
    
)

@app.post("/churn")
def churn_predict(message:Churn):
    
    message=dict(message)
    
    message=pd.DataFrame([message])
    
    prediction=churn_model.predict(message)
    
    return {"response":int(prediction[0])}


@app.post("/largeModel")
async def largeModel(file:UploadFile = File(...)):
    
    content= await file.read()
    
    content=io.BytesIO(content)
    
    image=Image.open(content).convert("RGB")
    
    image=image.resize((224,224))
    
    img_array=np.array(image,dtype=np.float32)
    
    img_preprocessed=keras.applications.mobilenet_v2.preprocess_input(img_array)
    
    img_preprocessed=np.expand_dims(img_preprocessed,axis=0)
    
    prediction=model_1000.predict(img_preprocessed)
    decode=keras.applications.mobilenet_v2.decode_predictions(prediction,top=1)
    top_prediction=decode[0][0]
    class_name=top_prediction[1]
    
    return {"response":class_name}
    
    

# import sklearn
# import pandas
# import sys

# print(sys.executable)
# print("sklearn:", sklearn.__version__)
# print("pandas:", pandas.__version__)