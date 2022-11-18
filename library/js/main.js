const topNavigation = document.getElementById("top-navigation"); //nav

topNavigation.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName !== "LI") {
        return;
    }

    const sectionName = target.id;
    highlightNavTab(sectionName);
    showSection(sectionName);
});

function highlightNavTab(sectionName) {
    const tab = document.getElementById(sectionName); //li

    topNavigation.querySelectorAll("ul > li").forEach(function (el) {
        el.style.borderBottom = "none"; //li style
    });

    tab.style.borderBottom = "2px solid rgb(88 202 215)";
}

function showSection(sectionName) {
    document.querySelectorAll("[data-section]").forEach(el => el.hidden = true);

    const section = document.querySelector(`[data-section=${sectionName}]`);
    if (!section) return;
    section.hidden = false;
}

//books
// maybe make it universal
let addBookModal = document.querySelector(".add-book");
let overlay = document.querySelector(".overlay");

document.querySelector("#add-book-button").addEventListener("click", modalOpen)

function modalOpen() {
    overlay.classList.remove("hidden");
    addBookModal.classList.remove("hidden");
}

document.querySelector(".modalX").addEventListener("click", modalClose)

function modalClose() {
    overlay.classList.add("hidden");
    addBookModal.classList.add("hidden");
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !addBookModal.classList.contains("hidden")) {
        modalClose();
    }
});


const form = document.querySelector(".add-book form");
document.querySelector(".add-to-table").addEventListener("click", submitForm)

function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const bookData = Object.fromEntries(formData.entries());
    console.log(bookData)

    addTableRow(bookData);

}

function addTableRow(bookData) {
    let tbody = document.querySelector(".books-table tbody");
    let tr = document.createElement("tr");
    let td = document.createElement("td");

    let rowsCount = document.querySelectorAll("tbody tr");
    console.log(rowsCount)
    td.textContent = rowsCount.length+1;
    tr.appendChild(td);

    for (let data in bookData) {

        let td = document.createElement("td");
        td.textContent = bookData[data];

        tr.appendChild(td);
    }

    tbody.appendChild(tr);
    console.log("added data")
    modalClose();
}
