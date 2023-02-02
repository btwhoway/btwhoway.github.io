function countNumberOfBooks() {
    let booksCount = {};

    for (let card of cardsArray) {
        if (!booksCount.hasOwnProperty(card.book)) {
            booksCount[card.book] = 0;
        }

        booksCount[card.book]++;
    }

    booksCount = Object.entries(booksCount);

    booksCount = booksCount.sort((a, b) => {
        return b[1] - a[1]
    })

    return booksCount;
}

function countNumberOfVisitors() {
    let visitorsCount = {};

    for (let card of cardsArray) {
        if (!visitorsCount.hasOwnProperty(card.visitor)) {
            visitorsCount[card.visitor] = 0;
        }

        visitorsCount[card.visitor]++;
    }

    visitorsCount = Object.entries(visitorsCount);

    visitorsCount = visitorsCount.sort((a, b) => {
        return b[1] - a[1]
    })

    return visitorsCount;

}

function showPopular(booksCount) {
    let div = document.querySelector(".popular-books");

    for (let i = 0; i < 5; i++) {
        let book = booksCount[i];
        if (!book){
            continue;
        }
        let p = document.createElement("p");
        p.textContent = `${book[0]}: ${book[1]}`;
        p.style.textTransform = "capitalize";

        div.appendChild(p);

    }

}

let booksCount = countNumberOfBooks();

if (booksCount.length) {
    showPopular(booksCount);
}

function showActiveVisitors(visitorsCount) {
    let div2 = document.querySelector(".active-visitors");

    for (let i = 0; i < 5; i++) {
        let visitor = visitorsCount[i];
        if (!visitor){
            continue;
        }
        let p = document.createElement("p");
        p.style.textTransform = "capitalize";

        p.textContent = `${visitor[0]}: ${visitor[1]}`;
        div2.appendChild(p);
    }
}

let visitorsCount = countNumberOfVisitors();

if(visitorsCount.length) {
    showActiveVisitors(visitorsCount);
}

