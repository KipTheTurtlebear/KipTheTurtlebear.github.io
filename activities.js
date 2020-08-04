var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

if(window.sessionStorage.getItem('data') !== null) {
    var data = JSON.parse(window.sessionStorage.getItem('data'));
    var k = document.getElementsByClassName('card');
    for(var i = 0; i < k.length; ++i) {
        k[i].style.visibility = "visible";
    }

    tempSorted = JSON.parse(JSON.stringify(data.daily));

    do {
        console.log("entered loop");
        var swap = false;
        for(var i = 0; i < tempSorted.length-1; ++i) {
            if(tempSorted[i].temp.day < tempSorted[i+1].temp.day) {
                let temp = tempSorted[i];
                tempSorted[i] = tempSorted[i+1];
                tempSorted[i+1] = temp;
                swap = true;
            }
        }
    }while(swap === true) 


    var water = document.getElementById('water');
    console.log(water);
    var temp = getWater(tempSorted);
    if(temp !== null) {
        var day = getDay(tempSorted[temp].sunrise);
        z = new Date();
        z = z.addDays(day);
        day = (z.getMonth() + 1) + "/" + z.getDate();
        water.innerText = "The Best Day for Water Activities is " + days[z.getDay()] + ", " + day + " 🚣";
    }
    else {
        water.innerText = "There's no good day for water activities :(" ;
    }

    var picnic = document.getElementById('picnic');
    var temp = getPicnic(tempSorted);
    if(temp !== null) {
        day = getDay(tempSorted[temp].sunrise);
        z = new Date();
        z = z.addDays(day);
        day = (z.getMonth() + 1) + "/" + z.getDate();
        picnic.innerText = "The Best Day for a Picnic is " + days[z.getDay()] + ", " + day + " 🏞️";
    } else {
        picnic.innerText = "There is no good day for a picnic :(";
    }

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