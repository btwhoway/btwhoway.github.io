/*
let booksArray = [
    {
        "book_id": "66736243",
        "book_title": "Twilight",
        "book_author": "Stephanie Meyer",
        "book_published": "2005",
        "book_pages": "498",
        "book_quantity": "5",
        "book_publisher": "Little, Brown and Company"
    },
    {
        "book_id": "11625765",
        "book_title": "New moon",
        "book_author": "Stephanie Meyer",
        "book_published": "2006",
        "book_pages": "563",
        "book_quantity": "4",
        "book_publisher": "Little, Brown and Company"
    },
    {
        "book_id": "57427133",
        "book_title": "Eclipse",
        "book_author": "Stephanie Meyer",
        "book_published": "2007",
        "book_pages": "629",
        "book_quantity": "3",
        "book_publisher": "Little, Brown and Company"
    },
    {
        "book_id": "73131384",
        "book_title": "Breaking dawn",
        "book_author": "Stephanie Meyer",
        "book_published": "2008",
        "book_pages": "756",
        "book_quantity": "9",
        "book_publisher": "Little, Brown and Company"
    },
    {
        "book_id": "34365183",
        "book_title": "Interview with the vampire",
        "book_author": "Anne Rice",
        "book_published": "1976",
        "book_pages": "371",
        "book_quantity": "27",
        "book_publisher": "Knopf"
    },
];
*/

let booksArray = [];
// localStorage.setItem("booksArray", JSON.stringify(booksArray));
booksArray = JSON.parse(localStorage.getItem('booksArray'));

// let somearr =
// {
//     "book_title": "some book",
//     "book_author": "Stephanie Meyer",
//     "book_published": "2005",
//     "book_pages": "300",
//     "book_quantity": "1",
//     "book_publisher": "Little, Brown and Company"
// };

// localStorage.setItem('somearr', JSON.stringify(somearr));

// localBooksObj.push(somearr);

// localStorage.setItem("booksArray", JSON.stringify(localBooksObj));

// let result = JSON.parse(localStorage.getItem('booksArray'));

function saveObjToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function saveBooksArray() {
    saveObjToLocalStorage("booksArray", booksArray);
}

let isEditing = false;
let editingObject = null;
let editingRow = null;

const topNavigation = document.getElementById("top-navigation");

topNavigation.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName !== "LI") {
        return;
    }

    const sectionName = target.id;
    localStorage.setItem("selectedTab", sectionName);

    highlightNavTab(sectionName);
    showSection(sectionName);
});

function highlightNavTab(sectionName) {
    const tab = document.getElementById(sectionName);

    topNavigation.querySelectorAll("ul > li").forEach(function (el) {
        el.classList.remove("highlited-li");
        //el.style.borderBottom = "none";
    });
    tab.classList.add("highlited-li");
    //tab.style.borderBottom = "2px solid rgb(88 202 215)";
}

function showSection(sectionName) {
    document.querySelectorAll("[data-section]").forEach(el => el.hidden = true);

    const section = document.querySelector(`[data-section=${sectionName}]`);
    if (!section) return;
    section.hidden = false;

    switch (sectionName) {
        case "books": {
            buildBooksTable();
        } break;
        case "visitors": {
            buildVisitorsTable();
        } break;
        case "cards": {
            buildCardsTable();
        } break;
    }

}

function buildBooksTable() {
    document.querySelector(".books-table tbody").innerHTML = "";
    for (const book of booksArray) {
        addTableRow(book);
    }
}

buildBooksTable();




//books
const form = document.querySelector(".add-book form");

let addBookModal = document.querySelector(".add-book");
let overlay = document.querySelector(".overlay");

document.querySelector("#add-book-button").addEventListener("click", () => { isEditing = false; editingObject = null; modalOpen() })

function modalOpen() {
    document.querySelector(".add-to-table").style.color = "unset";
    document.querySelector(".add-to-table").classList.remove("red");

    overlay.classList.remove("hidden");
    addBookModal.classList.remove("hidden");
}

document.querySelector(".modalX").addEventListener("click", booksModalClose);

function booksModalClose() {
    form.reset();
    overlay.classList.add("hidden");
    addBookModal.classList.add("hidden");
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !addBookModal.classList.contains("hidden")) {
        booksModalClose();
    }
});

document.querySelector(".add-to-table").addEventListener("click", submitForm);

function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(form);

    let bookData = Object.fromEntries(formData.entries());
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
            document.querySelector(".add-to-table").classList.add("red");

            return;
        }
    }

    if (isEditing) {
        const editingBookId = editingObject.book_id;

        const bookIndex = booksArray.findIndex((b) => b.book_id === editingBookId);

        if (bookIndex !== -1) {
            booksArray[bookIndex] = { ...booksArray[bookIndex], ...bookData };
            bookData = booksArray[bookIndex];
        }
    } else { //перевірити чи такого індексу не існує
        bookData["book_id"] = Math.floor(Math.random() * 100000000);
        booksArray.push(bookData);
    }

    saveBooksArray();

    addTableRow(bookData);

    booksModalClose();

}

function addTableRow(bookData) {
    let tbody = document.querySelector(".books-table tbody");
    let tr = document.createElement("tr");
    let td = document.createElement("td");

    td.textContent = bookData["book_id"];
    tr.appendChild(td);

    for (let key in bookData) {
        if (key === "book_id") {
            continue;
        }
        let td = document.createElement("td");
        td.textContent = bookData[key];
        td.style.textTransform = "capitalize";

        tr.appendChild(td);
    }

    td = document.createElement("td");
    td.innerHTML = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 50 50" height="30px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="30px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect fill="none" height="50" width="50"/><polyline fill="none" points="  42.948,12.532 10.489,44.99 3,47 5.009,39.511 37.468,7.052 " stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><path d="M45.749,11.134c-0.005,0.004,0.824-0.825,0.824-0.825c1.901-1.901,1.901-4.983,0.002-6.883c-1.903-1.902-4.984-1.9-6.885,0  c0,0-0.83,0.83-0.825,0.825L45.749,11.134z"/><polygon points="5.191,39.328 10.672,44.809 3.474,46.526 "/></svg>`
    td.classList.add("edit-book-btn");

    td.addEventListener("click", () => {

        editingRow = tr;
        editBook(bookData);

        let deleteBtn = document.querySelector(".delete-book");
        deleteBtn.hidden = false;
        deleteBtn.addEventListener("click", function () {
            editingRow.remove();
            booksModalClose();
            let bookIndex = booksArray.findIndex(b => {
                console.log(b.book_id, bookData.book_id);

                return b.book_id === bookData.book_id
            });
            console.log(bookIndex);
            booksArray.splice(bookIndex, 1);
            saveBooksArray();
        });

    });
    tr.appendChild(td);

    tr._data = bookData;

    tbody.appendChild(tr);

    if (isEditing === true) {
        editingRow.remove();
    }
}

let sortButton = document.querySelector(".sort-select");
sortButton.addEventListener("click", () => { sortBooks() });


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

function editBook(bookData) {
    isEditing = true;
    editingObject = bookData;

    let bookTitle = document.querySelector("form input[name='book_title']");
    let bookAuthor = document.querySelector("form input[name='book_author']");
    let bookPublished = document.querySelector("form input[name='book_published']");
    let bookPages = document.querySelector("form input[name='book_pages']");
    let bookQuantity = document.querySelector("form input[name='book_quantity']");
    let bookPublisher = document.querySelector("form input[name='book_publisher']");
    modalOpen();

    bookTitle.value = bookData.book_title;
    bookAuthor.value = bookData.book_author;
    bookPublished.value = bookData.book_published;
    bookPages.value = bookData.book_pages;
    bookQuantity.value = bookData.book_quantity;
    bookPublisher.value = bookData.book_publisher;

}

const selectedTab = localStorage.getItem("selectedTab");

setTimeout(() => {
    if (selectedTab) {
        highlightNavTab(selectedTab);
        showSection(selectedTab);
    }
}, 10);
