floweUrl="https://salemelbe-detection.hf.space/flowerModel"


imageInput=document.getElementById("imageInput")
imageShow=document.querySelector(".imageShow")


imageInput.addEventListener("change",function(){
    const file = this.files[0];

    if(file){

    const reader = new FileReader();
    
    reader.onload=function(e){
        imageShow.innerHTML=`<img src="${e.target.result}">`
    }

    reader.readAsDataURL(file);

}})


async function sendImage (){

    try{

    const resultBox= document.querySelector(".result")

    const predictionText = document.querySelector(".prediction")

    const imageInput = document.getElementById("imageInput")

    const formData = new FormData();

    formData.append("file",imageInput.files[0])

    const response = await fetch(floweUrl,{
        method:"POST",
        body:formData
    })

    const re_response= await response.json()

    const finalResponse= re_response.response;

    resultBox.classList.remove("hidden")

    predictionText.innerHTML=finalResponse
    }catch(errot){
        alert("Error In Server !!!")
    }
    
} 