/*
let visitorsArray = [
    {
        "id": 22435009,
        "name": "John Snow",
        "phone": "380986575851",
    },
    {
        "id": 85851813,
        "name": "Dean Doe",
        "phone": "380986573851",
    },
    {
        "id": 86935761,
        "name": "Anna Howay",
        "phone": "380986675851",
    },
    {
        "id": 64471454,
        "name": "Lora Lane",
        "phone": "380986595851",
    },
    {
        "id": 40436173,
        "name": "Cristine Cole",
        "phone": "380981575851",
    },
]
*/

let visitorsArray = [];
//localStorage.setItem("visitorsArray", JSON.stringify(visitorsArray));
visitorsArray = JSON.parse(localStorage.getItem('visitorsArray'));


function saveVisitorsArray() {
    saveObjToLocalStorage("visitorsArray", visitorsArray);
}

let isEditingVisitor = false;
let editingRowVisitor = null;

let addVisitorBtn = document.querySelector(".new-visitor");
let visitorsForm = document.querySelector(".add-visitor");

function createTableRow(visitor) {
    let tbody = document.querySelector("tbody.visitors-tbody");
    let tr = document.createElement("tr");
    let td;


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

        editingRow = tr;
        editVisitor(visitor);

        let deleteBtn = document.querySelector(".delete-visitor");
        deleteBtn.hidden = false;

        deleteBtn.addEventListener("click", function () {
            editingRow.remove();
            visitorsModalClose();

            let editingVisitorId = visitor.id;
            console.log(visitor);
            const visitorIndex = visitorsArray.findIndex((b) => b.id === editingVisitorId);
            console.log(visitorIndex);

            if (visitorIndex !== -1){
                visitorsArray.splice(visitorIndex, 1);
                saveVisitorsArray();
            }
            
        });
    });

    tr.appendChild(td);
    tr._data = visitor;
    tbody.appendChild(tr);

    if (isEditing === true) {
        editingRow.remove();
    }
}

function editVisitor(visitor) {
    isEditing = true;
    editingObject = visitor;

    let visitorId = document.querySelector("form input[name='id']");
    let visitorName = document.querySelector("form input[name='name']");
    let visitorPhone = document.querySelector("form input[name='phone']");
    addVisitorModal();

    visitorId.value = visitor.id;
    visitorName.value = visitor.name;
    visitorPhone.value = visitor.phone;

}

addVisitorBtn.addEventListener("click", () => { isEditing = false; editingObject = null; addVisitorModal() });

for (const visitor of visitorsArray) {
    createTableRow(visitor);
}

function addVisitorModal() {
    let visitorId = document.querySelector("form input[name='id']");
    
    let randomInt = Math.floor(Math.random() * 100000000);
    
    visitorId.value = randomInt;

    let overlay = document.querySelector(".overlay");

    overlay.classList.remove("hidden");
    visitorsForm.classList.remove("hidden");
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

let submitVisitorBtn = document.querySelector(".add-visitor .add-to-table");
submitVisitorBtn.addEventListener("click", submitVisitorsForm);

function submitVisitorsForm(event) {
    submitVisitorBtn.classList.remove("red");

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

    visitorsArray.push(visitorData);

    saveVisitorsArray();

    createTableRow(visitorData);

    visitorsModalClose();
}

let sortBtn = document.querySelector(".sort-visitor");
sortBtn.addEventListener("click", sortVisitors);
let visitorsTbody = document.querySelector(".visitors-tbody")

function sortVisitors() {
    let rows = Array.from(visitorsTbody.rows);

    let selectedSortOption = document.querySelector("select#sort-visitors").value;

    let sortIndex;

    switch (selectedSortOption) {
        case "name":
            sortIndex = 1;
            break;
        case "phone":
            sortIndex = 2;
            break;
        default:
            break;
    };

    let sortedVisitors = rows.sort(function (a, b) {
        const title1 = a.cells[sortIndex].textContent;
        const title2 = b.cells[sortIndex].textContent;

        if (title1 < title2) {
            return -1;
        }

        if (title1 > title2) {
            return 1;
        }

        return 0;
    });

    visitorsTbody.innerHTML = '';

    sortedVisitors.forEach(el => {
        visitorsTbody.appendChild(el);
    });
}

document.getElementById("search-visitors").addEventListener("click", searchVisitors);

let visitorsInput = document.querySelector("#search-visitor-input");
visitorsInput.addEventListener("input", searchVisitors);

function searchVisitors() {
    let filter = visitorsInput.value.toLowerCase();
    let rows = visitorsTbody.rows;

    for (let i = 0; i < rows.length; i++) {
        let tds = rows[i].getElementsByTagName("TD");

        for (let j = 1; j < tds.length; j++) {
            let txtValue = tds[j].textContent;

            rows[i].hidden = true;

            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                rows[i].hidden = false;
                break;
            }
        }
    }
}