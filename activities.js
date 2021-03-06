var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var coll = document.getElementsByClassName("collapsible");
var i;



function getWeather(type, tempSortedHigh, tempSortedLow) {

    switch(type) {
        case 'water':
            var list = document.getElementById('water');
            var temp = getWater(tempSortedHigh);    // This returns an array of integers
            break;
        case 'picnic':
            var list = document.getElementById('picnic');
            var temp = getPicnic(tempSortedHigh);    // This returns an array of integers
            break;
        case 'cozy':
            var list = document.getElementById('cozy');
            var temp = getCozy(tempSortedLow);    // This returns an array of integers
            break;
    }

    console.log(list);

    if(temp.length) {
        var i = 0;
        while(i < temp.length) {
            console.log(tempSortedHigh[temp[i]])
            var day = getDay(tempSortedHigh[temp[i]].sunrise);
            z = new Date();
            z = z.addDays(day);
            date = (z.getMonth() + 1) + "/" + z.getDate();
            var dayList = document.createElement('li');
            dayList.setAttribute('id', 'goodDay');
            dayList.appendChild(document.createTextNode(days[z.getDay()] + ", " + date + '\n' +
            "High is " + data.daily[day].temp.max + "°F, and weather is: " + data.daily[day].weather[0].description));
            list.appendChild(dayList);
            i++;
        }
    }
    else {
        var dayList = document.createElement('li');
        dayList.appendChild(document.createTextNode("There's no good day for this activity :("));
        dayList.setAttribute('id', 'goodDay');
        list.appendChild(dayList);
    }
} 



for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "initial") {
      content.style.display = "none";
    } else {
      content.style.display = "initial";
    }
  });
} 

if(window.sessionStorage.getItem('data') !== null) {
    var data = JSON.parse(window.sessionStorage.getItem('data'));
    console.log("Data:");
    console.log(data);
    var k = document.getElementsByClassName('card');
    for(var i = 0; i < k.length; ++i) {
        k[i].style.visibility = "visible";
    }

    tempSortedHigh = JSON.parse(JSON.stringify(data.daily));

    do {
        console.log("entered loop");
        var swap = false;
        for(var i = 0; i < tempSortedHigh.length-1; ++i) {
            if(tempSortedHigh[i].temp.day < tempSortedHigh[i+1].temp.day) {
                let temp = tempSortedHigh[i];
                tempSortedHigh[i] = tempSortedHigh[i+1];
                tempSortedHigh[i+1] = temp;
                swap = true;
            }
        }
    }while(swap === true) 

    tempSortedLow = JSON.parse(JSON.stringify(data.daily));

    do {
        console.log("entered loop");
        var swap = false;
        for(var i = 0; i < tempSortedLow.length-1; ++i) {
            if(tempSortedLow[i].temp.day > tempSortedLow[i+1].temp.day) {
                let temp = tempSortedLow[i];
                tempSortedLow[i] = tempSortedLow[i+1];
                tempSortedLow[i+1] = temp;
                swap = true;
            }
        }
    }while(swap === true) 

    console.log(tempSortedLow);

    getWeather('water', tempSortedHigh, tempSortedLow);
    getWeather('picnic', tempSortedHigh, tempSortedLow);
    getWeather('cozy', tempSortedHigh, tempSortedLow);


    //this code is unnecessary but I'm too afraid to delete it
/*
    var water = document.getElementById('water');
    console.log(water);
    var temp = getWater(tempSortedHigh);    // This returns an array of integers
    if(temp.length) {
        var i = 0;
        while(i < temp.length) {
            console.log(tempSortedHigh[temp[i]])
            var day = getDay(tempSortedHigh[temp[i]].sunrise);
            z = new Date();
            z = z.addDays(day);
            date = (z.getMonth() + 1) + "/" + z.getDate();
            var dayList = document.createElement('li');
            dayList.appendChild(document.createTextNode(days[z.getDay()] + ", " + date + '\n' +
            "High is " + data.daily[day].temp.max + "°F, and weather is: " + data.daily[day].weather[0].description));
            water.appendChild(dayList);
            i++;
        }
    }
    else {
        var dayList = document.createElement('li');
        dayList.appendChild(document.createTextNode("There's no good day for water activities :("));
        water.appendChild(dayList);
    }

    var picnic = document.getElementById('picnic');
    var temp = getPicnic(tempSortedHigh);
    if(temp.length) {
        var i = 0;
        while(i < temp.length) {
            var day = getDay(tempSortedHigh[temp[i]].sunrise);
            z = new Date();
            z = z.addDays(day);
            date = (z.getMonth() + 1) + "/" + z.getDate();
            picnic.innerText = picnic.innerText + days[z.getDay()] + ", " + date + '\n' +
            "High is " + data.daily[day].temp.max + "°F, and weather is: " + data.daily[day].weather[0].description + '\n\n';
            ++i;
        }
    } else {
        picnic.innerText = "There is no good day for a picnic :(";
    }

    var cozy = document.getElementById('cozy');
    var temp = getCozy(tempSortedLow);
    if(temp.length) {
        console.log("entered cozy")
        var i = 0;
        while(i < temp.length) {
            var day = getDay(tempSortedLow[temp].sunrise);
            z = new Date();
            z = z.addDays(day);
            date = (z.getMonth() + 1) + "/" + z.getDate();
            cozy.innerText = cozy.innerText + days[z.getDay()] + ", " + date + "\n" +
            "High is " + data.daily[day].temp.max + "°F, and weather is: " + data.daily[day].weather[0].description + '\n\n';

        }
    } else {
        cozy.innerText = "You can have a cozy day inside anyday, even if it's a warm sunny day";
    }
*/
}

Date.prototype.addDays = function(toAdd) {
    var nextDay = new Date(this.valueOf());
    nextDay.setDate(nextDay.getDate() + toAdd);
    return nextDay;
}

// Returns the hottest clear/cloudy days of the sorted array
function getWater(days) {
    var hotDays = [];
    var k = 0;
    for(var i = 0; i < days.length; ++i) {
        if(days[i].temp.max >= 75) {
            if(days[i].weather[0].id >= 800) {
                hotDays[k] = i;
                ++k;
            }
        }
    }
    return hotDays;
}

// Returns the warmest days where temperature is moderate and weather is clear/cloudy
function getPicnic(days) {
    var hotDays = [];
    var k = 0;
    for(var i = 0; i < days.length; ++i) {
        if(days[i].temp.max > 65 && days[i].temp.max < 80) {
            if(days[i].weather[0].id >= 800) {
                hotDays[k] = i;
                ++k;
            }
        }
    }
    return hotDays;
}

// Returns the coolest day where weather is rainy or snowy
function getCozy(days) {
    var cozyDays = [];
    var k = 0;
    for(var i = 0; i < days.length; ++i) {
        if (days[i].temp.max <= 65) {
            if(days[i].weather[0].id >= 200 && days[i].weather[0].id < 700) {
                cozyDays[k] = i;
                ++k;
            }
        }
    }
    console.log("CozyDays: ")
    console.log(cozyDays)
    return cozyDays;
}

// Returns the day number that matches the sorted day sunrise
function getDay(sunrise) {
    for(var i = 0; i < data.daily.length; ++i) {
        if(data.daily[i].sunrise === sunrise) {
            return i;
        }
    }
    return null;
}
console.log(data);