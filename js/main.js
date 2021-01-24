function myRequest(url) {
    return new Promise(function (resolve, reject) {
        let parsedInfo, request;
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        }
        else {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        request.open("GET", url);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                information = request.response;
                parsedInfo = JSON.parse(information);
                let weather = parsedInfo;
                resolve(weather);
            }
        }
        request.send();
    });
}

window.onload = search;


document.querySelector("#search").addEventListener("click", function () {
    weatherToday();
});

document.querySelector("#today").addEventListener("click", function () {
    weatherToday();
});

function weatherToday() {
    search();
    document.querySelector("#now-on").innerHTML = "";
    document.querySelector("#today").classList.add("current-page");
    document.querySelector("#fiveday").classList.remove("current-page");
    document.querySelector("#forecast").innerHTML = "";
    document.querySelector(".update").hidden = true;
}

let latitude, longitude;

//пошук за геолокацією, не використовую через те що постійно запитує дозвіл 

// function geoFindMe() {
//     function success(position) {
//         latitude = position.coords.latitude;
//         longitude = position.coords.longitude;
//         console.log(latitude + "," + longitude)
//         search();
//     }
//     function error() {
//         alert('Unable to retrieve your location');
//     }
//     if (!navigator.geolocation) {
//         alert('Geolocation is not supported by your browser');
//     } else {
//         console.log('Locating…');
//         navigator.geolocation.getCurrentPosition(success, error);
//     }
// }


async function search(e) {
    let city = document.querySelector("#city").value;
    document.querySelector("#today").classList.add("current-page");

    // cors-anywhere.herokuapp.com/
    let response = await myRequest(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=14e114e3bf46ab7683cae8c2f0148366`);
    console.log("current");
    console.log(response);

    if (response.hasOwnProperty("cod") && response.cod === "404") {
        document.querySelector("#now-on").innerHTML = "";
        let div = document.createElement("div");
        div.classList.add("invalid");
        let img = document.createElement("img");
        img.src = "icons/404.png";
        div.appendChild(img);
        let p = document.createElement("p");
        p.innerHTML = `${city} could not be found. <br> Please enter a different location.`
        div.appendChild(p);
        document.querySelector("#now-on").appendChild(div);
        return;
    }

    latitude = response.coord["lat"];
    longitude = response.coord["lon"];

    today(response);
    await searchHourly();
    citiesInCircle();
}

let searchHourlyResponse;

async function searchHourly(e) {
    //shows daily(7 days) and hourly
    // cors-anywhere.herokuapp.com/
    let response2 = await myRequest(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,alerts&units=metric&appid=14e114e3bf46ab7683cae8c2f0148366`);
    console.log("hourly");
    console.log(response2);

    hourly(response2);
    searchHourlyResponse = response2;
}

async function citiesInCircle(e) {
    // cors-anywhere.herokuapp.com/
    let response3 = await myRequest(`https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=5&units=metric&appid=14e114e3bf46ab7683cae8c2f0148366`);
    console.log("cities in circle");

    console.log(response3);

    nearby(response3);
}

let daysHourlyResponse;

async function daysHourly(e) {
    // cors-anywhere.herokuapp.com/
    let response4 = await myRequest(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=40&appid=14e114e3bf46ab7683cae8c2f0148366`);
    console.log("days hourly");

    console.log(response4);

    daysHourlyResponse = response4;
    hourlyDay(searchHourlyResponse);

}

function today(data) {
    document.querySelector("#forecast").hidden = true;
    document.querySelector("#now-on").hidden = false;

    let current = document.createElement("div");
    current.id = "current";
    current.classList.add("box");
    let div = document.createElement("div");

    let title = document.createElement("p");
    title.classList.add("title");
    title.innerHTML = "CURRENT WEATHER";
    div.appendChild(title);
    let curInfo = document.createElement("div");
    curInfo.id = "current-info";

    let mainTemp = data.main;
    let imgName = data.weather;
    let sys = data.sys;
    let newDate = new Date;
    let date = document.createElement("p");
    let dd = newDate.getDate();
    let mm = newDate.getMonth() + 1;
    let yyyy = newDate.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date.innerHTML = dd + '.' + mm + '.' + yyyy;
    div.appendChild(date);

    let icon = document.createElement("div");
    let img = document.createElement("img");
    img.src = `http://openweathermap.org/img/wn/${imgName[0]["icon"]}@2x.png`
    if (img.src === "http://openweathermap.org/img/wn/13d@2x.png" || img.src === "http://openweathermap.org/img/wn/13n@2x.png") {
        img.style.filter = "drop-shadow(1px 1px 3px rgb(137, 187, 235))";
    }
    icon.appendChild(img);
    let parameter = document.createElement("p");
    parameter.innerHTML = imgName[0]["main"];
    icon.appendChild(parameter);

    let temperature = document.createElement("div");
    let temp = document.createElement("p");
    let feel = document.createElement("p");
    temp.innerHTML = Math.floor(mainTemp["temp"]) + " &degC";
    feel.innerHTML = "Real feel " + Math.floor(mainTemp["feels_like"]) + "&deg"
    temperature.appendChild(temp);
    temperature.appendChild(feel);

    let sun = document.createElement("div");
    let table = document.createElement("table");

    let sunrise = new Date(sys["sunrise"] * 1000)
    let nd = new Date(((sunrise.getTime()) + (sunrise.getTimezoneOffset() * 60000)) + (1000 * data.timezone));

    let h = nd.getHours();
    let m = nd.getMinutes();
    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    let sunset = new Date(sys["sunset"] * 1000)
    let nd2 = new Date(((sunset.getTime()) + (sunset.getTimezoneOffset() * 60000)) + (1000 * data.timezone));

    let hh = nd2.getHours();
    let min = nd2.getMinutes();
    if (hh < 10) {
        hh = '0' + hh;
    }
    if (min < 10) {
        min = '0' + min;
    }

    let sunTiming = {
        "Sunrise:": h + ":" + m,
        "Sunset:": hh + ":" + min,
        "Duration:": secondsToHms(sys["sunrise"], sys["sunset"])
    };

    for (let key in sunTiming) {
        let tr = document.createElement("tr");
        let name = document.createElement("td");
        name.innerHTML = key;
        let sun = document.createElement("td");
        sun.innerHTML = sunTiming[key];
        tr.appendChild(name);
        tr.appendChild(sun);
        table.appendChild(tr)
    }
    sun.appendChild(table);

    curInfo.appendChild(icon);
    curInfo.appendChild(temperature);
    curInfo.appendChild(sun);
    current.appendChild(div);
    current.appendChild(curInfo);

    document.querySelector("#now-on").appendChild(current);
}


function hourly(response2) {
    let div = document.createElement("div");
    div.classList.add("box");
    let title = document.createElement("p");
    title.classList.add("title");
    title.innerHTML = "HOURLY";
    div.appendChild(title);

    let hourly = document.createElement("div");
    hourly.id = "hourly";

    let list = response2.hourly;
    let hh, tr;
    let table = document.createElement("table");

    let titles = [
        "TODAY",
        "",
        "Forecast",
        "Temp(&degC)",
        "Feels like",
        "Wind(km/h)"
    ];

    for (let k = 0; k < titles.length; k++) {
        tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = titles[k];
        tr.appendChild(td);

        if (k === 0) {
            for (let i = 0; i < 6; i++) {
                //https://stackoverflow.com/a/62397158
                let d = new Date(response2.hourly[i]["dt"] * 1000);

                let nd = new Date(((d.getTime()) + (d.getTimezoneOffset() * 60000)) + (1000 * response2.timezone_offset));

                hh = nd.getHours();
                if (hh >= 0 && hh <= 9) {
                    hh = "0" + hh;
                }
                td = document.createElement("td");
                td.innerHTML = hh + ":00";
                tr.appendChild(td);
            }
        }
        if (k === 1) {
            for (let i = 0; i < 6; i++) {
                td = document.createElement("td");
                let img = document.createElement("img");
                img.src = `http://openweathermap.org/img/wn/${list[i]["weather"][0]["icon"]}@2x.png`;
                if (img.src === "http://openweathermap.org/img/wn/13d@2x.png" || img.src === "http://openweathermap.org/img/wn/13n@2x.png") {
                    img.style.filter = "drop-shadow(1px 1px 3px rgb(137, 187, 235))";
                }
                td.appendChild(img);
                tr.appendChild(td);
            }
        }
        if (k === 2) {
            for (let i = 0; i < 6; i++) {
                td = document.createElement("td");

                td.innerHTML = list[i]["weather"][0]["main"];
                tr.appendChild(td);
            }
        }
        if (k === 3) {
            for (let i = 0; i < 6; i++) {
                td = document.createElement("td");

                td.innerHTML = Math.floor(list[i]["temp"]) + " &deg";
                tr.appendChild(td);
            }
        }
        if (k === 4) {
            for (let i = 0; i < 6; i++) {
                td = document.createElement("td");

                td.innerHTML = Math.floor(list[i]["feels_like"]) + " &deg";
                tr.appendChild(td);
            }
        }
        if (k === 5) {
            for (let i = 0; i < 6; i++) {
                let wind = list[i]["wind_deg"];
                let direction;
                if (wind >= 0 && wind <= 45) direction = "NE";
                if (wind > 45 && wind <= 90) direction = "E";
                if (wind > 90 && wind <= 135) direction = "SE";
                if (wind > 135 && wind <= 180) direction = "S";
                if (wind > 180 && wind <= 225) direction = "SW";
                if (wind > 225 && wind <= 270) direction = "W";
                if (wind > 270 && wind <= 315) direction = "NW";
                if (wind > 315 && wind <= 360) direction = "N";
                td = document.createElement("td");

                td.innerHTML = (Math.floor(list[i]["wind_speed"]) * 3.6) + " " + direction;
                tr.appendChild(td);
            }
        }
        table.appendChild(tr);
    }
    hourly.appendChild(table);
    div.appendChild(hourly);
    document.querySelector("#now-on").appendChild(div);
}

function nearby(response3) {
    let div = document.createElement("div");
    div.classList.add("box");
    let title = document.createElement("p");
    title.classList.add("title");
    title.innerHTML = "NEARBY PLACES";
    div.appendChild(title);

    let nearby = document.createElement("div");
    nearby.id = "nearby";
    let cities = response3.list;
    for (let i = 1; i < cities.length; i++) {
        let box = document.createElement("div");
        box.classList.add("wrapper");

        let city = document.createElement("p");
        city.innerHTML = cities[i]["name"];
        box.appendChild(city);

        let div = document.createElement("div");
        let img = document.createElement("img");
        img.src = `http://openweathermap.org/img/wn/${cities[i]["weather"][0]["icon"]}@2x.png`;
        if (img.src === "http://openweathermap.org/img/wn/13d@2x.png" || img.src === "http://openweathermap.org/img/wn/13n@2x.png") {
            img.style.filter = "drop-shadow(1px 1px 3px rgb(137, 187, 235))";
        }
        div.appendChild(img);

        let temperature = document.createElement("p");
        temperature.innerHTML = Math.floor(cities[i]["main"]["temp"]) + " &degC";
        div.appendChild(temperature);
        box.appendChild(div);

        nearby.appendChild(box);
    }
    div.appendChild(nearby)
    document.querySelector("#now-on").appendChild(div);
}

document.querySelector("#fiveday").addEventListener("click", function () {
    daysHourly();
    document.querySelector("#fiveday").classList.add("current-page");
    document.querySelector("#today").classList.remove("current-page");
})

let update = document.querySelector(".update");
update.classList.add("box");


function hourlyDay(data) {
    document.querySelector("#forecast").innerHTML = "";
    document.querySelector("#forecast").hidden = false;
    document.querySelector("#now-on").hidden = true;

    let days = document.createElement("div");

    days.addEventListener("click", function (e) {
        let target = e.target;
        if (target) {
            target.closest(".days").parentElement.querySelectorAll(".days").forEach(function (elem) {
                elem.classList.remove("active");
            })
            target.closest(".days").classList.add("active");
        }
        if (target.closest(".days")) {
            hourlyTable(e, daysHourlyResponse);
        }
        console.log(target);
    });

    let fiveDay = data.daily;
    for (let i = 0; i < 6; i++) {

        let day = document.createElement("div");
        day.classList.add("days");

        let d = new Date(data.daily[i]["dt"] * 1000);
        let nd = new Date(((d.getTime()) + (d.getTimezoneOffset() * 60000)) + (1000 * data.timezone_offset));

        let options = { weekday: 'short' };
        weekday = new Intl.DateTimeFormat('en-US', options).format(nd);

        let title = document.createElement("p");
        title.classList.add("title");

        let thisDay = new Date().getDate();

        let date = document.createElement("p");
        let dd = nd.getDate();

        let month = nd.toLocaleString('en-UK', { month: 'short' });

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (dd === thisDay) {
            weekday = "TODAY";
        }

        title.innerHTML = weekday.toUpperCase();
        day.appendChild(title);

        date.innerHTML = (month + " " + dd).toUpperCase();
        date.classList.add("weekday");
        day.appendChild(date);

        let icon = document.createElement("div");
        let img = document.createElement("img");
        img.src = `http://openweathermap.org/img/wn/${fiveDay[i]["weather"][0]["icon"]}@2x.png`;
        if (img.src === "http://openweathermap.org/img/wn/13d@2x.png" || img.src === "http://openweathermap.org/img/wn/13n@2x.png") {
            img.style.filter = "drop-shadow(1px 1px 3px rgb(137, 187, 235))";
        }
        icon.appendChild(img);
        day.appendChild(icon);

        let temp = document.createElement("p");
        temp.innerHTML = Math.floor(fiveDay[i]["temp"]["max"]) + " &degC";
        day.appendChild(temp);

        let parameter = document.createElement("p");
        parameter.innerHTML = fiveDay[i]["weather"][0]["main"];
        day.appendChild(parameter);
        days.appendChild(day);
        document.querySelector("#forecast").appendChild(days);
    }
    document.querySelector(".days").click();
}

function hourlyTable(e, info) {
    if (!info) {
        info = daysHourlyResponse;
    }
    let tableData = document.createElement("div");
    let title = document.createElement("p");
    title.classList.add("title");
    title.innerHTML = "HOURLY";
    tableData.appendChild(title);

    let hourly = document.createElement("div");
    hourly.id = "hourly";

    let list = info.list;
    let timezone = info.city.timezone;
    let hh, tr;
    let table = document.createElement("table");

    let hourlyInfoForDays = {};

    for (let key in list) {
        let item = list[key];
        let d = new Date(item["dt"] * 1000);
        let nd = new Date(((d.getTime()) + (d.getTimezoneOffset() * 60000)) + (1000 * timezone));
        let month = nd.toLocaleString('en-UK', { month: 'short' });
        let dateKey = `${month.toUpperCase()} ${nd.getDate()}`;
        if (!hourlyInfoForDays.hasOwnProperty(dateKey)) {
            hourlyInfoForDays[dateKey] = [];
        }

        hourlyInfoForDays[dateKey].push(item);
    }

    let titles = [
        e.target.closest(".days").querySelector(".weekday").innerHTML,
        "",
        "Forecast",
        "Temp(&degC)",
        "Feels like",
        "Wind(km/h)"
    ];

    let clickedInfo = hourlyInfoForDays[e.target.closest(".days").querySelector(".weekday").innerHTML];

    for (let k = 0; k < titles.length; k++) {
        tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = titles[k];
        tr.appendChild(td);

        if (k === 0) {
            for (let i = 0; i < clickedInfo.length; i++) {
                //https://stackoverflow.com/a/62397158
                let d = new Date(clickedInfo[i]["dt"] * 1000);

                let nd = new Date(((d.getTime()) + (d.getTimezoneOffset() * 60000)) + (1000 * info.city.timezone));

                hh = nd.getHours();
                if (hh >= 0 && hh <= 9) {
                    hh = "0" + hh;
                }
                td = document.createElement("td");
                td.innerHTML = hh + ":00";
                tr.appendChild(td);
            }
        }
        if (k === 1) {
            for (let i = 0; i < clickedInfo.length; i++) {
                td = document.createElement("td");
                let img = document.createElement("img");
                img.src = `http://openweathermap.org/img/wn/${clickedInfo[i]["weather"][0]["icon"]}@2x.png`;
                if (img.src === "http://openweathermap.org/img/wn/13d@2x.png" || img.src === "http://openweathermap.org/img/wn/13n@2x.png") {
                    img.style.filter = "drop-shadow(1px 1px 3px rgb(137, 187, 235))";
                }
                td.appendChild(img);
                tr.appendChild(td);
            }
        }
        if (k === 2) {
            for (let i = 0; i < clickedInfo.length; i++) {
                td = document.createElement("td");

                td.innerHTML = clickedInfo[i]["weather"][0]["main"];
                tr.appendChild(td);
            }
        }
        if (k === 3) {
            for (let i = 0; i < clickedInfo.length; i++) {
                td = document.createElement("td");

                td.innerHTML = Math.floor(clickedInfo[i]["main"]["temp"]) + " &deg";
                tr.appendChild(td);
            }
        }
        if (k === 4) {
            for (let i = 0; i < clickedInfo.length; i++) {
                td = document.createElement("td");

                td.innerHTML = Math.floor(clickedInfo[i]["main"]["feels_like"]) + " &deg";
                tr.appendChild(td);
            }
        }
        if (k === 5) {
            for (let i = 0; i < clickedInfo.length; i++) {
                let wind = clickedInfo[i]["wind"]["deg"];
                let direction;
                if (wind >= 0 && wind <= 45) direction = "NE";
                if (wind > 45 && wind <= 90) direction = "E";
                if (wind > 90 && wind <= 135) direction = "SE";
                if (wind > 135 && wind <= 180) direction = "S";
                if (wind > 180 && wind <= 225) direction = "SW";
                if (wind > 225 && wind <= 270) direction = "W";
                if (wind > 270 && wind <= 315) direction = "NW";
                if (wind > 315 && wind <= 360) direction = "N";
                td = document.createElement("td");

                td.innerHTML = (Math.floor(clickedInfo[i]["wind"]["speed"]) * 3.6) + " " + direction;
                tr.appendChild(td);
            }
        }
        table.appendChild(tr);
    }

    hourly.appendChild(table);
    tableData.appendChild(hourly);
    update.innerHTML = '';
    update.appendChild(tableData);
    document.querySelector(".update").hidden = false;
}



function secondsToHms(sunrise, sunset) {
    let h = Math.floor((sunset - sunrise) / 3600);
    let m = Math.floor((sunset - sunrise) % 3600 / 60);
    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    return `${h}:${m} hr`;
}