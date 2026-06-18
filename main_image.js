globalUrl="http://127.0.0.1:8000/largeModel"


const imageInput = document.getElementById("imageInput");
const imageShow = document.querySelector(".imageShow")

imageInput.addEventListener("change",

    function(){
        const file =this.files[0];

        if (file){

            const reader = new FileReader();

            reader.onload = function (e) {
                imageShow.innerHTML=`<img src="${e.target.result}">`;
            }

            reader.readAsDataURL(file);

        }
    }
)

async function sendImage(){

    try{
    const imageInput = document.getElementById("imageInput");

    const predictionText = document.querySelector(".prediction");

    const resultBox = document.querySelector(".result");

    const formData = new FormData();

    formData.append("file",imageInput.files[0]);

    const response = await fetch(globalUrl,{
        method:"POST",
        body:formData
    });

    const data = await response.json();

    resultBox.classList.remove("hidden");

    predictionText.innerHTML = data.response 
}catch(error){
    alert("Error In Server !!")
} 
}