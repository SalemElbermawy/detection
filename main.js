churnUrl="http://127.0.0.1:8000/churn"



async function Churn(){

    const result_box=document.getElementById("result")
    const prediction_text=document.getElementById("prediction")

    try{

        message={
            gender:document.getElementById('gender').value,
            SeniorCitizen:parseInt(document.getElementById("SeniorCitizen").value),
            Partner:document.getElementById("Partner").value,
            Dependents:document.getElementById("Dependents").value,
            tenure:document.getElementById("tenure").value,
            PhoneService:document.getElementById("PhoneService").value,
            OnlineSecurity:document.getElementById("OnlineSecurity").value,
            OnlineBackup:document.getElementById("OnlineBackup").value,
            DeviceProtection:document.getElementById("DeviceProtection").value,
            TechSupport:document.getElementById("TechSupport").value,
            StreamingTV:document.getElementById("StreamingTV").value,
            StreamingMovies:document.getElementById("StreamingMovies").value,
            Contract:document.getElementById("Contract"),
            PaperlessBilling:document.getElementById("PaperlessBilling").value,
            PaymentMethod:document.getElementById("PaymentMethod").value,
            MonthlyCharges:parseFloat(document.getElementById("MonthlyCharges").value),
            TotalCharges:parseFloat(document.getElementById("TotalCharges").value)
        }

    const response = await fetch(churnUrl,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(message)
    });
    
    const re_response=await response.json()
    const prediction= re_response.response

    result_box.classList.remove("hidden")
    prediction_text.innerHTML=prediction

    }catch(error){
        console.log("error",error)
    }

}

document.getElementById("final-btn").addEventListener("click",Churn)
