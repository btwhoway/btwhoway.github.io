document.querySelector(".show-projects button").addEventListener("click", () => {
    let oldProjectsDiv = document.querySelector(".old-projects");
    if (oldProjectsDiv.classList.contains("hidden")) {
        oldProjectsDiv.classList.remove("hidden");
        document.querySelector(".show-projects button").textContent = "hide";
    } else {
        oldProjectsDiv.classList.add("hidden");
        document.querySelector(".show-projects button").textContent = "show";
    }
})

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
    errorMessage.addEventListener("click", () => {
        errorMessage.innerHTML = "";
    })
})

