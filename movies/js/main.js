let movies, parsedInfo;

function myRequest(url) {
    return new Promise(function (resolve, reject) {
        let request;
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        }
        else {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        request.open("GET", url);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                movies = request.response;
                parsedInfo = JSON.parse(movies);

                let movie = parsedInfo;
                resolve(movie);
            }
        }
        request.send();
    });
}

document.querySelector("#search").addEventListener("click", search);

let payload = {};

async function search(e) {
    let titleInput = document.querySelector(".box input[name='title']");
    let typeInput = document.querySelector(".box select");
    if (e || !payload.hasOwnProperty("title")) {
        payload = {
            title: titleInput.value,
            type: typeInput.value,
            page: 1,
            window: 5
        };
    }

    let response = await myRequest(`http://www.omdbapi.com/?s=${payload.title}&type=${payload.type}&page=${payload.page}&plot=full&apikey=2051a685`);

    if (response.hasOwnProperty("Error")) {
        alert("Movie not found! " + response.Error);
    } else {
        // console.log(response.Search);
        // console.log(response);
        showMovie(response);
    }
}

function showMovie(data) {
    let films = data.Search;

    document.querySelector("#films").innerHTML = "";
    document.querySelector("#film-info").innerHTML = "";
    document.querySelector(".one").hidden = true;

    for (let i = 0; i < films.length; i++) {
        let movieWrap = document.createElement("div");
        movieWrap.classList.add("wrapper");

        let poster = document.createElement("div");
        if (films[i].Poster !== "N/A") {
            poster.style.backgroundImage = `url(${films[i].Poster})`;
            poster.classList.add("poster")
        } else {
            poster.classList.add("no-poster")
            poster.innerHTML = "no poster for this movie";
        }
        movieWrap.appendChild(poster);

        let info = document.createElement("div");
        info.classList.add("info");

        let type = document.createElement("p");
        type.innerHTML = films[i].Type;
        info.appendChild(type);
        let title = document.createElement("p");
        title.innerHTML = films[i].Title;
        title.style.fontWeight = "bold"
        info.appendChild(title);

        let year = document.createElement("p");
        year.innerHTML = films[i].Year;
        year.style.fontSize = "larger"
        info.appendChild(year);

        let details = document.createElement("div");
        details.innerHTML = "Details";
        details.classList.add("details");
        details.dataset.id = films[i].imdbID;

        details.addEventListener("click", infoRequest);

        info.appendChild(details);

        movieWrap.appendChild(info);
        document.querySelector("#films").appendChild(movieWrap);
    }

    pagination(data.totalResults, payload.window);
    document.querySelector(".one").hidden = false;

}


function pagination(total, toShow) {
    document.querySelector("#pages").innerHTML = "";
    total = parseInt(total);
    let quantity = Math.round(total / 10);

    //https://jsfiddle.net/ivanov11/e18zfsau/

    let maxLeft = (payload.page - Math.floor(toShow / 2));
    let maxRight = (payload.page + Math.floor(toShow / 2));

    if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = toShow;
    }

    if (maxRight > quantity) {
        maxLeft = quantity - (toShow - 1);

        if (maxLeft < 1) {
            maxLeft = 1;
        }
        maxRight = quantity;
    }

    let back = document.createElement("div");
    back.innerHTML = "<<";
    document.querySelector("#pages").appendChild(back);

    back.addEventListener("click", function () {
        payload.page = 1;
        search(null);
    })

    for (let i = maxLeft; i <= maxRight; i++) {
        let pagesBlock = document.createElement("div");
        pagesBlock.innerHTML = i;
        pagesBlock.dataset.value = i;

        pagesBlock.addEventListener("click", function (e) {
            let target = e.target.innerHTML;

            payload.page = parseInt(target);

            search(null);
        });
        pagesBlock.classList.add("page");
        document.querySelector("#pages").appendChild(pagesBlock);
    }

    let forward = document.createElement("div");
    forward.innerHTML = ">>";
    document.querySelector("#pages").appendChild(forward);

    forward.addEventListener("click", function () {
        payload.page = quantity;
        search(null);
    })
}

async function infoRequest(e) {
    let filmId = e.target.dataset.id;

    let details = await myRequest(`http://www.omdbapi.com/?i=${filmId}&plot=full&apikey=2051a685`);
    buildInfo(details);
}



function buildInfo(details) {
    document.querySelector("#film-info").hidden = true;
    document.querySelector(".two").hidden = true;
    document.querySelector("#film-info").innerHTML = "";
    let movieWrapper = document.createElement("div");

    let poster = document.createElement("div");
    poster.style.backgroundImage = `url(${details.Poster})`;
    poster.classList.add("big-poster");
    movieWrapper.appendChild(poster);

    let totalInfo = {
        "Title:": details.Title,
        "Released:": details.Released,
        "Genre:": details.Genre,
        "Country:": details.Country,
        "Director:": details.Director,
        "Writer:": details.Writer,
        "Actors:": details.Actors,
        "Awards:": details.Awards
    }

    let table = document.createElement("table");
    for (let key in totalInfo) {
        let tr = document.createElement("tr");
        let keyTd = document.createElement("td");
        keyTd.innerHTML = key;
        tr.appendChild(keyTd);
        let td = document.createElement("td");
        td.innerHTML = totalInfo[key];
        tr.appendChild(td);
        table.appendChild(tr);
    }
    movieWrapper.appendChild(table);
    document.querySelector("#film-info").appendChild(movieWrapper);

    document.querySelector("#film-info").hidden = false;
    document.querySelector(".two").hidden = false;
}