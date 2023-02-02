let cardsArray = [];

let LSCardsArray = JSON.parse(localStorage.getItem('cardsArray'));
if (LSCardsArray) {
    cardsArray = LSCardsArray;
}

if (cardsArray === null) {
    cardsArray = [];
}

function saveCardsArray() {
    saveObjToLocalStorage("cardsArray", cardsArray);
}

let addCardBtn = document.querySelector("#add-new-card");

addCardBtn.addEventListener("click", addNewCard);
let cardsModal = document.querySelector(".add-card");

function addNewCard() {
    let overlay = document.querySelector(".overlay");

    cardsModal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    createNewCardOptions();
}

document.querySelector(".add-card .modalX").addEventListener("click", cardsModalClose);
function cardsModalClose() {
    let overlay = document.querySelector(".overlay");
    let form = document.querySelector(".add-card form");
    form.reset();
    overlay.classList.add("hidden");
    cardsModal.classList.add("hidden");
}

let selectVisitor = document.getElementById('visitor-name');
let selectBook = document.getElementById('book-name');


function createNewCardOptions() {
    let visitors = JSON.parse(localStorage.getItem('visitorsArray'));

    selectVisitor.innerHTML = "";

    selectBook.innerHTML = "";

    visitors.forEach(vis => {
        let option = document.createElement('option');
        option.value = vis["name"];
        option.textContent = vis["name"];
        selectVisitor.appendChild(option);
    });

    let books = JSON.parse(localStorage.getItem('booksArray'));

    books.forEach(book => {
        let option = document.createElement('option');
        option.value = book["book_title"];
        option.textContent = book["book_title"];
        selectBook.appendChild(option);
    });
}


let submitNewCardBtn = document.querySelector(".add-card .add-to-table");
submitNewCardBtn.addEventListener("click", submitNewCard);

function submitNewCard(event) {
    let form = document.querySelector(".add-card form");

    event.preventDefault();

    const cardFormData = new FormData(form);

    const cardInfo = Object.fromEntries(cardFormData.entries());
    console.log(cardInfo);

    for (let info in cardInfo) {
        let value = cardInfo[info];

        if (value === "" || value === " ") {
            submitNewCardBtn.style.color = "red";

            return;
        }
    }

    cardInfo.id = Math.floor(Math.random() * 1000000);
    cardInfo.borrowDate = new Date();

    cardsArray.push(cardInfo);

    saveCardsArray();

    createCardTable(cardInfo);

    cardsModalClose();

    substractingAmountOfBooks(cardInfo);
}

function createCardTable(cardInfo) {
    let tbody = document.querySelector(".cards-table tbody");
    let tr = document.createElement("tr");
    let td = document.createElement("td");

    td.textContent = cardInfo["id"];
    tr.appendChild(td);

    td = document.createElement("td");
    td.textContent = cardInfo["visitor"];
    td.style.textTransform = "capitalize";

    tr.appendChild(td);

    td = document.createElement("td");
    td.textContent = cardInfo["book"];
    td.style.textTransform = "capitalize";

    tr.appendChild(td);

    let borrowDate = new Date(cardInfo["borrowDate"]).toLocaleString();
    td = document.createElement("td");
    td.textContent = borrowDate;
    td.setAttribute("data-time", new Date(cardInfo["borrowDate"]).getTime());
    tr.appendChild(td);

    td = document.createElement("td");
    td.classList.add("return-date-button");

    if (!cardInfo["returnDate"]) {
        td.innerHTML = `<?xml version="1.0" ?><svg id="return-arrival-date-calendar" style="enable-background:new 0 0 15 15.5;" version="1.1" viewBox="0 0 15 15.5" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M12,1.5V0h-1v1.5H4V0H3v1.5H0v6v8h15v-8v-6H12z M1,2.5h2V4h1V2.5h7V4h1V2.5h2v4H1V2.5z M14,14.5H1v-7h13V14.5z"/><polygon points="5.146,13.354 5.854,12.646 4.707,11.5 12.5,11.5 12.5,10.5 4.707,10.5 5.854,9.354 5.146,8.646 2.793,11 "/></svg>`;

        td.addEventListener("click", () => {
            let returnDate = new Date();
            td.innerHTML = "";
            td.textContent = returnDate.toLocaleString();

            let cardIndex = cardsArray.findIndex(c => c.id === cardInfo.id);
            console.log(cardIndex);
            cardsArray[cardIndex].returnDate = returnDate;
            saveCardsArray();

            addingReturnedBook(cardInfo);
        });
    } else
        td.textContent = new Date(cardInfo["returnDate"]).toLocaleString();
    td.setAttribute("data-time", new Date(cardInfo["returnDate"]).getTime());
    tr.appendChild(td);

    tbody.appendChild(tr);
}

document.getElementById("search-card").addEventListener("click", searchCards);

let cardInput = document.querySelector("#search-card-input");
cardInput.addEventListener("input", searchCards);

function searchCards() {
    let filter = cardInput.value.toLowerCase();
    let rows = document.querySelector(".cards-table tbody").rows;

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

let sortCardsBtn = document.querySelector(".sort-cards");
sortCardsBtn.addEventListener("click", () => { sortCards() });

function sortCards() {
    const tbody = document.querySelector(".cards-table tbody");
    const rows = Array.from(tbody.rows);

    const selectedSortOption = document.querySelector("select#sort-cards").value;

    const sortedArray = rows.sort(function (a, b) {
        let value1;
        let value2;
        let dataType = "string";

        switch (selectedSortOption) {
            case "borrow":
                value1 = a.cells[3].getAttribute("data-time");
                value2 = b.cells[3].getAttribute("data-time");
                dataType = "number";
                break;
            case "return":
                value1 = a.cells[4].getAttribute("data-time");
                value2 = b.cells[4].getAttribute("data-time");
                dataType = "number";
                break;
        };

        if (dataType === "number") {
            value1 = parseInt(value1);
            value2 = parseInt(value2);

            if (isNaN(value1)) {
                value1 = 0;
            }

            if (isNaN(value2)) {
                value2 = 0;
            }
        }

        if (value1 < value2) {
            return -1;
        }

        if (value1 > value2) {
            return 1;
        }

        return 0;
    });

    tbody.innerHTML = '';

    sortedArray.forEach(el => {
        tbody.appendChild(el);
        console.log("works")
    });
}

function buildCardsTable() {
    document.querySelector(".cards-table tbody").innerHTML = "";

    for (const cardInfo of cardsArray) {
        createCardTable(cardInfo);
    }
}

function substractingAmountOfBooks(cardInfo) {
    let borrowedBookName = cardInfo["book"];
    console.log(borrowedBookName);

    //booksArray глобальна змінна в файлі main.js
    let LSBook = booksArray.find(b => b.book_title === borrowedBookName);

    if (LSBook["book_quantity"] > 0) {
        LSBook["book_quantity"]--;
        saveBooksArray();
    } else {
        alert("No books available");
        return;
    }

}

function addingReturnedBook(cardInfo) {
    let borrowedBookName = cardInfo["book"];

    let LSBook = booksArray.find(b => b.book_title === borrowedBookName);

    LSBook["book_quantity"]++;
    saveBooksArray();
}