churnUrl=""

async function Churn(){

    try{

        message={
            gender:document.getElementById('gender').value,
            SeniorCitizen:parseInt(document.getElementById("SeniorCitizen").value),
            Partner:document.getElementById("Partner"),
            Dependents:document.getElementById("Dependents"),
            tenure:document.getElementById("tenure"),
            PhoneService:document.getElementById("PhoneService"),
            OnlineSecurity:document.getElementById("OnlineSecurity"),
            OnlineBackup:document.getElementById("OnlineBackup"),
            DeviceProtection:document.getElementById("DeviceProtection"),
            TechSupport:document.getElementById("TechSupport"),
            StreamingTV:document.getElementById("StreamingTV"),
            StreamingMovies:document.getElementById("StreamingMovies"),
            Contract:document.getElementById("Contract"),
            PaperlessBilling:document.getElementById("PaperlessBilling"),
            PaymentMethod:document.getElementById("PaymentMethod")
        }

    const response = await fetch(churnUrl,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(message)
    })        

    }catch(error){
        console.log("error",error)
    }

}