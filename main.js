document.querySelector("#movie").addEventListener("click", () => {
    let errorMessage = document.querySelector("#message");
    errorMessage.innerHTML = "";
    let modal = document.createElement("div");
    let message = document.createElement("p");
    let img = document.createElement("img");

    message.innerHTML = "Unfortunately OMDb doesn't allow to display insecure content here.<br>If you want to check out the project anyway feel free to contact me."
    img.src = "movies/message.png";
    modal.appendChild(message);
    modal.appendChild(img);

    errorMessage.appendChild(modal);
    errorMessage.addEventListener("click", ()=>{
        errorMessage.innerHTML = "";
    })
})

