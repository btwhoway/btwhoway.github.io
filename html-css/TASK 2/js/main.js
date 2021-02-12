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

document.querySelector("#start").addEventListener("click", () => {
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
        btn.innerHTML = "INFO";
        box.appendChild(btn)
        
        document.querySelector("#tours").appendChild(box);
    });

})