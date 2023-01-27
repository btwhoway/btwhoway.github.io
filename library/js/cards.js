let cardsArray = [];

let LSCardsArray = JSON.parse(localStorage.getItem('cardsArray'));
if (LSCardsArray) {
    cardsArray = LSCardsArray;
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
    console.log(visitors);

    visitors.forEach(vis => {
        let option = document.createElement('option');
        option.value = vis["name"];
        option.textContent = vis["name"];
        selectVisitor.appendChild(option);
    });

    let books = JSON.parse(localStorage.getItem('booksArray'));
    console.log(books);

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
        console.log(value);
        if (value === "" || value === " ") {
            submitNewCardBtn.style.color = "red";

            return;
        }
    }

    cardsArray.push(cardInfo);

    saveCardsArray();

    createCardTable(cardInfo);

    cardsModalClose();
}

function createCardTable(cardInfo) {
    let tbody = document.querySelector(".cards-table tbody");
    let tr = document.createElement("tr");
    let td = document.createElement("td");

    td.textContent = Math.floor(Math.random() * 1000000);
    tr.appendChild(td);
    for (let info in cardInfo) {
        let td = document.createElement("td");
        td.textContent = cardInfo[info];
        td.style.textTransform = "capitalize";
        tr.appendChild(td);
    }

    let borrowDate = new Date().toLocaleDateString();

    td = document.createElement("td");
    td.textContent = borrowDate;
    tr.appendChild(td);

    let returnDate = new Date().toLocaleDateString();

    td = document.createElement("td");
    td.textContent = "return date";
    tr.appendChild(td);

    tbody.appendChild(tr);
}