let addCardBtn = document.querySelector("#add-new-card");

addCardBtn.addEventListener("click", addNewCard);
let cardsModal = document.querySelector(".add-card");
function addNewCard(){
    let overlay = document.querySelector(".overlay");

    cardsModal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    createNewCardOptions();
}

document.querySelector(".add-card .modalX").addEventListener("click", cardModalClose);
function cardModalClose() {
    let overlay = document.querySelector(".overlay");
    let form = document.querySelector(".add-card form");
    form.reset();
    overlay.classList.add("hidden");
    cardsModal.classList.add("hidden");
}

let selectVisitor = document.getElementById('visitor-name');
let selectBook = document.getElementById('book-name');


function createNewCardOptions(){
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

