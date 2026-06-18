churnUrl="http://127.0.0.1:8000/churn"

const myForm = document.getElementById("formChurn")

async function Churn(){

    const result_box=document.getElementById("result")
    const prediction_text=document.getElementById("prediction")

    try{

        message={
            gender:document.getElementById('gender').value,
            SeniorCitizen:parseInt(document.getElementById("SeniorCitizen").value),
            Partner:document.getElementById("Partner").value,
            Dependents:document.getElementById("Dependents").value,
            tenure:parseFloat(document.getElementById("tenure").value),
            PhoneService:document.getElementById("PhoneService").value,
            MultipleLines:document.getElementById("MultipleLines").value,
            InternetService:document.getElementById("InternetService").value,
            OnlineSecurity:document.getElementById("OnlineSecurity").value,
            OnlineBackup:document.getElementById("OnlineBackup").value,
            DeviceProtection:document.getElementById("DeviceProtection").value,
            TechSupport:document.getElementById("TechSupport").value,
            StreamingTV:document.getElementById("StreamingTV").value,
            StreamingMovies:document.getElementById("StreamingMovies").value,
            Contract:document.getElementById("Contract").value,
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
    if (prediction===1){
    prediction_text.innerHTML="Yes"}else{
        prediction_text.innerHTML="No"
    }

    }catch(error){
        console.log("error",error)
        alert("Error In Server !!")
    }

}

document.getElementById("final-btn").addEventListener("click",async function(){
    
if (!myForm.checkValidity()) {
        myForm.reportValidity(); 
        return; 
    }
    await Churn  ()
})
