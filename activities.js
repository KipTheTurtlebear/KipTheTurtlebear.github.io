var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

if(window.sessionStorage.getItem('data') !== null) {
    var data = JSON.parse(window.sessionStorage.getItem('data'));
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

    var water = document.getElementById('water');
    console.log(water);
    var temp = getWater(tempSortedHigh);
    if(temp !== null) {
        var day = getDay(tempSortedHigh[temp].sunrise);
        z = new Date();
        z = z.addDays(day);
        day = (z.getMonth() + 1) + "/" + z.getDate();
        water.innerText = "The Best Day for Water Activities is " + days[z.getDay()] + ", " + day + " 🚣";
    }
    else {
        water.innerText = "There's no good day for water activities :(" ;
    }

    var picnic = document.getElementById('picnic');
    var temp = getPicnic(tempSortedHigh);
    if(temp !== null) {
        day = getDay(tempSortedHigh[temp].sunrise);
        z = new Date();
        z = z.addDays(day);
        day = (z.getMonth() + 1) + "/" + z.getDate();
        picnic.innerText = "The Best Day for a Picnic is " + days[z.getDay()] + ", " + day + " 🏞️";
    } else {
        picnic.innerText = "There is no good day for a picnic :(";
    }

    var cozy = document.getElementById('cozy');
    var temp = getCozy(tempSortedLow);
    if(temp !== null) {
        day = getDay(tempSortedLow[temp].sunrise);
        z = new Date();
        z = z.addDays(day);
        day = (z.getMonth() + 1) + "/" + z.getDate();
        cozy.innerText = "The Best Day for a cozy day inside is " + days[z.getDay()] + ", " + day + " ⛈️";
    } else {
        cozy.innerText = "You can have a cozy day inside anyday, even if it's a warm sunny day";
    }

}

Date.prototype.addDays = function(toAdd) {
    var nextDay = new Date(this.valueOf());
    nextDay.setDate(nextDay.getDate() + toAdd);
    return nextDay;
}

// Returns the hottest clear/cloudy day of the sorted array
function getWater(days) {
    for(var i = 0; i < days.length; ++i) {
        if(days[i].temp.max < 75) {
            return null
        }
        else {
            if(days[i].weather[0].id >= 800) {
                let des = document.getElementById("waterDes");
                des.innerText = "High is " + days[i].temp.max + "°F, and weather is: " + days[i].weather[0].description;
                return i;
            }
        }
    }
}

// Returns the warmest day where temperature is moderate and weather is clear/cloudy
function getPicnic(days) {
    for(var i = 0; i < days.length; ++i) {
        if(days[i].temp.max < 65) {
            return null
        }
        else if (days[i].temp.max >= 65 && days[i].temp.max < 90) {
            if(days[i].weather[0].id >= 800) {
                let des = document.getElementById("picnicDes");
                des.innerText = "High is " + days[i].temp.max + "°F, and weather is: " + days[i].weather[0].description;
                return i;
            }
        }
    }
    return null;
}

// Returns the coolest day where weather is rainy or snowy
function getCozy(days) {
    for(var i = 0; i < days.length; ++i) {
        if(days[i].temp.max > 65) {
            return null
        }
        else if (days[i].temp.max <= 65) {
            if(days[i].weather[0].id >= 200 && days[i].weather[0].id < 700) {
                let des = document.getElementById("cozyDes");
                des.innerText = "High is " + days[i].temp.max + "°F, and weather is: " + days[i].weather[0].description;
                return i;
            }
        }
    }
    return null;
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