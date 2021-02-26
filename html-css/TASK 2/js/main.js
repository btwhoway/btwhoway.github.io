document.querySelector(".display-menu").addEventListener("click", () => {
    if (document.querySelector("#menu-small").hidden === true) {
        document.querySelector("#menu-small").hidden = false;
    } else {
        document.querySelector("#menu-small").hidden = true;
    }
}
)

let tours = [
    {
        poster: "https://images.unsplash.com/photo-1560969184-10fe8719e047?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        name: "Warsaw-Berlin-Amsterdam",
        length: "9 days",
        age: "18+"
    }, {
        poster: "https://images.unsplash.com/photo-1583755689194-210010d31d21?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8emFrb3BhbmV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        name: "Wroclaw-Krakow-Zakopane",
        length: "6 days",
        age: "16+"
    }, {
        poster: "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGFyaXN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        name: "Prague-Paris-Amsterdam",
        length: "12 days",
        age: "18+"
    }, {
        poster: "https://images.unsplash.com/photo-1560698862-c340d3c8bf38?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8b3Nsb3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        name: "Oslo-Copenhagen",
        length: "7 days",
        age: "18+"
    }, {
        poster: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9tZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: "Milan-Rome",
        length: "8 days",
        age: "18+"
    }, {
        poster: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bWFkcmlkfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        name: "Madrid-Barselona-Porto",
        length: "5 days",
        age: "16+"
    }, {
        poster: "https://images.unsplash.com/photo-1488747279002-c8523379faaa?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8bG9uZG9ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        name: "London-Manchester-Edinburg",
        length: "9 days",
        age: "18+"
    }
]

let startFlag = false;

document.querySelector("#start").addEventListener("click", () => {
    if (startFlag) return;
    startFlag = true;
    let title = document.createElement("p");
    title.innerHTML = 'Choose your tour now!';
    document.querySelector("#choose").appendChild(title);
    let info = document.createElement("div");
    info.id = "tours";

    tours.forEach(tour => {
        let box = document.createElement("div");
        box.classList.add("tour-box");

        let imgContainer = document.createElement("div");
        let img = document.createElement("img");
        img.src = tour.poster;
        imgContainer.appendChild(img);
        box.appendChild(imgContainer);

        let name = document.createElement("p");
        name.innerHTML = `Locations: ${tour.name}`;
        box.appendChild(name);


        let length = document.createElement("p");
        length.innerHTML = `How long: ${tour.length}`;
        box.appendChild(length);

        let age = document.createElement("p");
        age.innerHTML = `Who can go: ${tour.age}`;
        box.appendChild(age);

        let btn = document.createElement("button");
        btn.innerHTML = "BOOK";
        box.appendChild(btn);
        let checkout = document.createElement("div");

        btn.addEventListener("click", () => {
            let checkoutExists = document.querySelector(".checkout");
            if (checkoutExists) {
                document.querySelector(".checkout").remove();
            }

            checkout.classList.add("checkout");
            checkout.innerHTML = '<i class="fas fa-route"></i>';
            checkout.hidden = false;
            box.appendChild(checkout);

            checkout.addEventListener("click", () => {
                let modalExists = document.querySelector(".modal-back");
                if (modalExists) {
                    document.querySelector(".modal-back").remove();
                }
                let modalback = document.createElement("div");
                modalback.classList.add("modal-back");
                checkout.hidden = true;
                
                let infoExists = document.querySelector(".checkout-box");
                if (infoExists) {
                    document.querySelector(".checkout-box").remove();
                }
                let checkoutInfo = document.createElement("div");
                checkoutInfo.classList.add("checkout-box");

                let imgdiv = document.createElement("div");
                let img = document.createElement("img");
                img.src = tour.poster;
                imgdiv.appendChild(img);

                let text = document.createElement("p");
                text.innerHTML = `You chose ${tour.name} tour for ${tour.length}.
                If you are age ${tour.age} and confirm your decision, 
                fill the data and press SEND.
                We will contact you ASAP!`;

                let labelbox = document.createElement("div");

                let name = document.createElement("input");
                let letters = /^[a-z ,.'-]+$/i;
                let label = document.createElement("label");
                label.innerHTML = "Enter your name:";
                label.appendChild(name);
                labelbox.appendChild(label);

                let labelbox2 = document.createElement("div");
                let phone = document.createElement("input");
                phone.type = "tel";
                phone.setAttribute("required", null);
                let label2 = document.createElement("label");
                label2.innerHTML = "Enter your phone number:";
                label2.appendChild(phone);
                labelbox2.appendChild(label2);

                let btns = document.createElement("div");
                let checkoutBtn = document.createElement("button");
                checkoutBtn.innerHTML = `SEND`;
                btns.appendChild(checkoutBtn);
                let close = document.createElement("button");
                close.innerHTML = `CLOSE`;
                btns.appendChild(close);


                checkoutInfo.appendChild(imgdiv);
                checkoutInfo.appendChild(text);
                checkoutInfo.appendChild(labelbox);
                checkoutInfo.appendChild(labelbox2);
                checkoutInfo.appendChild(btns);

                box.appendChild(modalback);
                box.appendChild(checkoutInfo);

                checkoutBtn.addEventListener("click", () => {
                    if (name.value === "" || !name.value.match(letters) || phone.value === "") {
                        pushNotify("Something is wrong..", `You need to enter the correct data`, "error");

                    } else {
                        modalback.hidden = true;
                        checkoutInfo.hidden = true;
                        pushNotify("Success", `Thanks ${name.value}! We will contact you for details.`, "success");
                    }
                })

                close.addEventListener("click", () => {
                    checkout.hidden = false;
                    modalback.hidden = true;
                    checkoutInfo.hidden = true;
                })
            })
        })
        info.appendChild(box);
    });
    document.querySelector("#choose").appendChild(info);

});


function pushNotify(title, text, type) {
    new Notify({
        status: type,
        title: title,
        text: text,
        effect: 'fade',
        speed: 300,
        customClass: null,
        customIcon: null,
        isIcon: true,
        isCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'right top'
    })
}

document.querySelector("form button").addEventListener("click", () => {
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let emailValidator = /\S+@\S+\.\S+/;
    let phone = document.querySelector("#phone").value;
    let phoneValidator = /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/;
    let checkbox = document.querySelector("#human");

    if (emailValidator.test(email) === true && name !== "" && phoneValidator.test(phone) === true && checkbox.checked === true) {
        document.querySelector("form").reset();
        pushNotify("Success", "We'll contact you", 'success')
    } else pushNotify("Hmm.. Something went wrong", "Check if your info is correct", "error")

})