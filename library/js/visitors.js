const visitorsObj = [
    {
        "id": 1,
        "name": "John Snow",
        "phone": "380986575851",
    },
    {
        "id": 2,
        "name": "Dean Doe",
        "phone": "380986573851",
    },
    {
        "id": 3,
        "name": "Anna Howay",
        "phone": "380986675851",
    },
    {
        "id": 4,
        "name": "Lora Lane",
        "phone": "380986595851",
    },
    {
        "id": 5,
        "name": "Cristine Cole",
        "phone": "380981575851",
    },
]



function createTableRow(visitor) {
    let tbody = document.querySelector("tbody.visitors-tbody");
    let tr = document.createElement("tr");

    for (let data in visitor) {
        let td = document.createElement("td");
        td.textContent = visitor[data];
        td.style.textTransform = "capitalize";
        tr.appendChild(td);

    }

    td = document.createElement("td");
    td.innerHTML = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 50 50" height="30px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="30px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect fill="none" height="50" width="50"/><polyline fill="none" points="  42.948,12.532 10.489,44.99 3,47 5.009,39.511 37.468,7.052 " stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><path d="M45.749,11.134c-0.005,0.004,0.824-0.825,0.824-0.825c1.901-1.901,1.901-4.983,0.002-6.883c-1.903-1.902-4.984-1.9-6.885,0  c0,0-0.83,0.83-0.825,0.825L45.749,11.134z"/><polygon points="5.191,39.328 10.672,44.809 3.474,46.526 "/></svg>`
    td.classList.add("edit-visitor-btn");

    td.addEventListener("click", () => {
        editVisitorModal();

        editingRow = tr;

        let deleteBtn = document.querySelector(".delete-visitor");
        deleteBtn.hidden = false;
        deleteBtn.addEventListener("click", function () {
            editingRow.remove();
            visitorsModalClose();
        });
    });

    tr.appendChild(td);
    tbody.appendChild(tr);

    visitorsModalClose();
}

let addVisitorBtn = document.querySelector(".new-visitor");


addVisitorBtn.addEventListener("click", addVisitorModal);
let visitorsForm = document.querySelector(".add-visitor");

for (const visitor of visitorsObj) {
    createTableRow(visitor);
}

function addVisitorModal() {
    let overlay = document.querySelector(".overlay");

    overlay.classList.remove("hidden");
    visitorsForm.classList.remove("hidden");
    console.log("working")
}

function editVisitorModal() {
    
    addVisitorModal();
}

document.querySelector(".add-visitor .modalX").addEventListener("click", visitorsModalClose);


function visitorsModalClose() {
    let overlay = document.querySelector(".overlay");
    let form = document.querySelector(".add-visitor form");
    form.reset();
    overlay.classList.add("hidden");
    visitorsForm.classList.add("hidden");
}

const submitVisitorBtn = document.querySelector(".add-visitor .add-to-table");
submitVisitorBtn.addEventListener("click", submitVisitorsForm);

function submitVisitorsForm(event) {
    let form = document.querySelector(".add-visitor form");

    event.preventDefault();

    const visitorFormData = new FormData(form);

    const visitorData = Object.fromEntries(visitorFormData.entries());
    console.log(visitorData);

    for (let data in visitorData) {
        let value = visitorData[data];
        console.log(value);
        if (value === "" || value === " ") {
            submitVisitorBtn.style.color = "red";
            return;
        }

        if (+visitorData["id"] <= 0 || +visitorData["phone"].length > 12 || +visitorData["phone"].length < 12) {
            submitVisitorBtn.classList.add("red");
            return;
        }
    }
    createTableRow(visitorData);
}

let sortBtn = document.querySelector(".sort-visitor");
sortBtn.addEventListener("click", sortVisitors);

function sortVisitors(){
    
}