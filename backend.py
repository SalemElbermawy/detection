from fastapi  import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware

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

@app.post("churn/")
def churn_predict(message:Churn):
    
    message=dict(message)
    
    message=pd.DataFrame([message])
    
    prediction=churn_model.predict(message)
    
    return {"response":int(prediction[0])}

