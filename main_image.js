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