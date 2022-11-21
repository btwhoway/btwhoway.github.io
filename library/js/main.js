const books1 = [
    {
        "book_title": "Twilight",
        "book_author": "Stephanie Meyer",
        "book_published": "2005",
        "book_pages": "498",
        "book_quantity": "5",
        "book_publisher": "Little, Brown and Company"
    },
    {
        "book_title": "New moon",
        "book_author": "Stephanie Meyer",
        "book_published": "2006",
        "book_pages": "563",
        "book_quantity": "4",
        "book_publisher": "Little, Brown and Company"
    },
    {
        "book_title": "Eclipse",
        "book_author": "Stephanie Meyer",
        "book_published": "2007",
        "book_pages": "629",
        "book_quantity": "3",
        "book_publisher": "Little, Brown and Company"
    },
    {
        "book_title": "Breaking dawn",
        "book_author": "Stephanie Meyer",
        "book_published": "2008",
        "book_pages": "756",
        "book_quantity": "9",
        "book_publisher": "Little, Brown and Company"
    },
    {
        "book_title": "Interview with the vampire",
        "book_author": "Anne Rice",
        "book_published": "1976",
        "book_pages": "371",
        "book_quantity": "27",
        "book_publisher": "Knopf"
    },
];

const topNavigation = document.getElementById("top-navigation");

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
    const tab = document.getElementById(sectionName);

    topNavigation.querySelectorAll("ul > li").forEach(function (el) {
        el.style.borderBottom = "none";
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
const form = document.querySelector(".add-book form");

let addBookModal = document.querySelector(".add-book");
let overlay = document.querySelector(".overlay");

document.querySelector("#add-book-button").addEventListener("click", modalOpen)

function modalOpen() {
    overlay.classList.remove("hidden");
    addBookModal.classList.remove("hidden");
}

document.querySelector(".modalX").addEventListener("click", modalClose)

function modalClose() {
    form.reset();
    overlay.classList.add("hidden");
    addBookModal.classList.add("hidden");
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !addBookModal.classList.contains("hidden")) {
        modalClose();
    }
});

document.querySelector(".add-to-table").addEventListener("click", submitForm)

function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const bookData = Object.fromEntries(formData.entries());
    console.log(bookData);

    for (let data in bookData) {
        let value = bookData[data];
        console.log(value);
        if (value === "" || value === " ") {
            document.querySelector(".add-to-table").style.color = "red";

            return;
        }

        let year = new Date().getFullYear();
        console.log(year)

        if (+bookData["book_published"] <= 0 || +bookData["book_published"] > year || +bookData["book_pages"] <= 0 || +bookData["book_quantity"] <= 0) {
            document.querySelector(".add-to-table").style.color = "red";
            document.querySelector(".add-to-table").style.border = "2px solid red";

            return;
        }
    }
    addTableRow(bookData);
}

function addTableRow(bookData) {
    let tbody = document.querySelector(".books-table tbody");
    let tr = document.createElement("tr");
    let td = document.createElement("td");

    let rowsCount = document.querySelectorAll("tbody tr");
    td.textContent = rowsCount.length + 1;
    tr.appendChild(td);

    for (let data in bookData) {

        let td = document.createElement("td");
        td.textContent = bookData[data];
        td.style.textTransform = "capitalize";

        tr.appendChild(td);
    }
    tbody.appendChild(tr);
    modalClose();
}

let sortButton = document.querySelector(".sort-select");
sortButton.addEventListener("click", () => { sortBooks() });

// function sortBooks() {


//     let tbody, rows, switching, i, x, y, shouldSwitch;
//     tbody = document.querySelector(".books-table tbody");
//     switching = true;


//     while (switching) {

//         switching = false;
//         rows = tbody.rows;

//         for (i = 0; i < (rows.length - 1); i++) {

//             shouldSwitch = false;

//             x = rows[i].getElementsByTagName("TD")[1];
//             y = rows[i + 1].getElementsByTagName("TD")[1];

//             if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

//                 shouldSwitch = true;
//                 break;
//             }
//         }

//         if (shouldSwitch) {

//             rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//             switching = true;
//         }
//     }
// }

const table = document.querySelector(".books-table table");
const tbody = table.querySelector("tbody");

function sortBooks() {
    const rows = Array.from(tbody.rows);

    const selectedSortOption = document.querySelector("select#sort").value;

    let sortIndex;

    switch (selectedSortOption) {
        case "title":
            sortIndex = 1;
            break;
        case "author":
            sortIndex = 2;
            break;
        case "publisher":
            sortIndex = 6;
            break;
        default:
            break;
    };

    const sortedArray = rows.sort(function (a, b) {
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

    tbody.innerHTML = '';

    sortedArray.forEach(el => {
        tbody.appendChild(el);
    });
}

for (const book of books1) {
    addTableRow(book);
}

document.getElementById("search").addEventListener("click", searchTable);

let input = document.querySelector("#search-input");
input.addEventListener("input", searchTable);

function searchTable() {
    let filter = input.value.toLowerCase();
    let rows = tbody.rows;

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


