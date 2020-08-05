function checkData() {
    if(window.sessionStorage.getItem('data')) {
        var x = document.getElementById('support');
        var ctx = document.getElementById('24hour').getContext('2d');
        var ctx3 = document.getElementById('tomorrowChart').getContext('2d');
        var ctx4 = document.getElementById('weeklyChart').getContext('2d');
        var ctx5 = document.getElementById('cloudChart').getContext('2d');

        data = JSON.parse(window.sessionStorage.getItem('data'));
        console.log(data);
        
        var k = document.getElementsByClassName('card');
        for(var i = 0; i < k.length; ++i) {
            k[i].style.visibility = "visible";
        }

        //Initialize Variables
        var hourly = [];    //array of temperature data
        var hourlyFeel = [];
        var d = new Date();
        var n = d.getHours();
        var hours = [];     //array of hour labels

        //Create hourly arrays
        for(let i = 0; i < 24; i++){
            if(n+i > 36)
                hours.push(((n+i)-24)%13 +1 + "pm");
            else if(n+i > 24 && n+i < 37)
                hours.push(((n+i)-24)%13 + "am");
            else if(n+i > 11 && n+i < 25) {
                if(n+i == 12)
                    hours.push(n+i + "pm");
                else if(n+i == 24)
                    hours.push(n+i -12 + "am")
                else
                    hours.push((n+i)-12 + "pm");
            }
            else
                hours.push((n+i)%13+"am");
            hourly.push(data.hourly[(i)].temp);
            hourlyFeel.push(data.hourly[i].feels_like);
        } 

        //Create 24 hour temperature chart
        var next24chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: hours,
                datasets: [{
                    label: "Temperature in °F",
                    backgroundColor: 'rgb(43, 190, 255)',
                    borderColor: 'rgb(43, 190, 255)',
                    data: hourly,
                    fill: false,
                    lineTension: 0,
                    pointRadius: 0
                },
                {
                    label: "Feels-Like in °F",
                    data: hourlyFeel,
                    backgroundColor: 'rgb(19, 95, 128)',
                    borderColor: 'rgb(19, 95, 128)',
                    fill: false,
                    lineTension: 0,
                    pointRadius: 0
                }]
            },
            options: {
                pointBackgroundColor: '#ffffff',
                showLine: true,
                gridLines: {
                    display: true
                },
            }
        });

        var header = document.getElementById("todayTemp");
        header.innerText = header.innerText.concat(data.current.temp + "°F");
        //header.appendChild(text);

        var temp = document.getElementById("todayFeel");
        var text = document.createTextNode(data.current.feels_like + "°F");
        temp.appendChild(text);

        var temp = document.getElementById("todayCloud");
        var text = document.createTextNode(data.current.clouds + "% Clouds");
        temp.appendChild(text);

        if(data.current.snow) {
            var temp = document.createElement("h6");
            temp.innerHTML = data.current.snow + "mm of snow has fallen"
            header.appendChild(temp);
        }

        if(data.current.rain) {
            var temp = document.createElement("h6");
            temp.innerHTML = data.current.rain['1h'] + "mm of rain has fallen";
            header.appendChild(temp);
        }

        //Create "Tomorrow's Weather" Array
        var tomorrowTemps = [];
        var tomorrowFeels = [];
        var tomorrowLabels = ["Morning", "Day", "Evening", "Night", "Max", "Min"];
        tomorrowTemps.push(data.daily[1].temp.morn)
        tomorrowTemps.push(data.daily[1].temp.day)
        tomorrowTemps.push(data.daily[1].temp.eve)
        tomorrowTemps.push(data.daily[1].temp.night)
        tomorrowTemps.push(data.daily[1].temp.max)
        tomorrowTemps.push(data.daily[1].temp.min)

        tomorrowFeels.push(data.daily[1].feels_like.morn)
        tomorrowFeels.push(data.daily[1].feels_like.day)
        tomorrowFeels.push(data.daily[1].feels_like.eve)
        tomorrowFeels.push(data.daily[1].feels_like.night)

        //Create "Today's Weather" chart
        var dailyChart = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: tomorrowLabels,
                datasets: [{
                    label: "Today's Temperatures in °F",
                    data: tomorrowTemps,
                    backgroundColor: '#2BBEFF',
                    barPercentage: 1,
                    categoryPercentage: 1.0
                }, 
                {
                    label: "Feels Like in °F",
                    data: tomorrowFeels,
                    backgroundColor: 'rgb(19, 95, 128)',
                    barPercentage: 1,
                    categoryPercentage: 1.0
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0
                        }
                    }]
                }
            }
        });
             //Create "Week Ahead" Array
             var weeklyHighs = [];
             var weeklyLows = [];
             var weeklyLabels = [];
             const monthNames = ["Jan.", "Feb.", "March", "Apr.", "May", "June",
             "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
           ];
             //Create label array for next 7 days
             for(var w = 1; w < 8; ++w) {
                //instantiate new date here
                z = d.addDays(w);
                if(z.getDate() < 10)
                    weeklyLabels.push(" " + monthNames[(z.getMonth() + 1)] + " " + z.getDate());
                else
                    weeklyLabels.push(monthNames[(z.getMonth() + 1)] + " " + z.getDate());
             }
             
             weeklyHighs.push(data.daily[1].temp.max)
             weeklyHighs.push(data.daily[2].temp.max)
             weeklyHighs.push(data.daily[3].temp.max)
             weeklyHighs.push(data.daily[4].temp.max)
             weeklyHighs.push(data.daily[5].temp.max)
             weeklyHighs.push(data.daily[6].temp.max)
             weeklyHighs.push(data.daily[7].temp.max)

             weeklyLows.push(data.daily[1].temp.min)
             weeklyLows.push(data.daily[2].temp.min)
             weeklyLows.push(data.daily[3].temp.min)
             weeklyLows.push(data.daily[4].temp.min)
             weeklyLows.push(data.daily[5].temp.min)
             weeklyLows.push(data.daily[6].temp.min)
             weeklyLows.push(data.daily[7].temp.min)

             //Create "Today's Weather" chart
             var dailyChart = new Chart(ctx4, {
                 type: 'bar',
                 data: {
                     labels: weeklyLabels,
                     datasets: [{
                         label: "Daily Highs in °F",
                         data: weeklyHighs,
                         backgroundColor: '#2BBEFF'
                     }, 
                     {
                         label: "Daily Lows in °F",
                         data: weeklyLows,
                         backgroundColor: 'rgb(19, 95, 128)'
                     }]
                 }, 
                 options: {
                     scales: {
                         yAxes: [{
                             ticks: {
                                suggestedMin: 0
                            }
                         }]
                     }
                 }
             });
             
            var weather = data.current.weather[0].description;
            var id = data.current.weather[0].id;
            var modifier = "Today there's";
            var weatherStatement = getStatement(id, weather, modifier);
            
            //Is it raining?
            var rain = document.getElementById('raining');
             if(data.current.weather[0].main != "Rain" && data.current.weather[0].main != "Drizzle") {
                rain.innerHTML = "Surprisingly, no! " + weatherStatement;
             }
            else
                rain.innerHTML = "Of course it is. " + weatherStatement;
            document.getElementById('weatherIcon').src = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
            document.getElementById('weatherIcon').title = weather;

            var weatherList = document.createElement("ul");
            document.getElementById("Is It Raining Body").appendChild(weatherList);
            var weatherIcons = [];  //array of icon urls
            for(var i = 1; i < 8; ++i) {
                weatherIcons[i] = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png"
                console.log(weatherIcons[i]);
            }

            var day = [];
            var img = [];
            var des = [];
            var description = [];
            var text = [];
            var image = [];
            for(var i = 1; i < 8; ++i)
            {
                day[i] = document.getElementById("day" + i);
                img[i] = document.getElementById("img" + i);
                des[i] = document.getElementById("des" + i);
                text[i] = document.createTextNode(weeklyLabels[i-1] + ":   \t");
                description[i] = document.createTextNode(getStatement(data.daily[i].weather[0].id,data.daily[i].weather[0].description,"There will be"));
                text[i].id = "icon text";
                image[i] = new Image;
                image[i].src = weatherIcons[i];
                image[i].id = "icon";
                image[i].alt = data.daily[i].weather[0].description;
                image[i].title = data.daily[i].weather[0].description;
                day[i].appendChild(text[i]);
                img[i].appendChild(image[i]);
                des[i].appendChild(description[i]);
            }

            var weeklyCloud = [];

            weeklyCloud.push(data.daily[1].clouds);
            weeklyCloud.push(data.daily[2].clouds);
            weeklyCloud.push(data.daily[3].clouds);
            weeklyCloud.push(data.daily[4].clouds);
            weeklyCloud.push(data.daily[5].clouds);
            weeklyCloud.push(data.daily[6].clouds);
            weeklyCloud.push(data.daily[7].clouds);

            colors = [
                '#0084ff',
                '#40a3ff',
                '#80c2ff',
                '#c4e3ff',
                '#7e91a3',
                '#4e7599',
                '#12508a',
            ];

            borderColors = [
                '#12508a',
                '#0084ff',
                '#40a3ff',
                '#80c2ff',
                '#c4e3ff',
                '#7e91a3',
                '#4e7599',
            ]

            var cloud = new Chart(ctx5, {
                type: 'polarArea',
                data: {
                    datasets: [{
                    data: weeklyCloud,
                    backgroundColor: colors,
                    borderColor: borderColors,
                }],
                
                labels: weeklyLabels,
                },

            });
    }
}

function getStatement(id, weather, modifier) {
    var weatherStatement;
    if(id < 300) {    //Weather is Thunderstorm
        weatherStatement = modifier + " a " + weather;
    }
    if(id >= 300 && id < 400) {     //Weather is Drizzle
        weatherStatement = modifier + " a " + weather;
    }
    if(id >= 500 && id < 600) {     //Weather is Rain
        switch(id) {
            case 504:
                weatherStatement = modifier + " an " + weather;
                break;
            default:
                weatherStatement = modifier + " a " + weather;
        }
    }
    if(id >= 600 && id < 700) {     //Weather is Snow
        switch(id) {
            case 601:
                weatherStatement = modifier + weather;
                break;
            case 611:
                weatherStatement = modifier +  weather;
                break;
            case 613:
                weatherStatement = modifier + weather;
                break;
            case 616:
                weatherStatement = modifier + weather;
                break;
            case 621:
                weatherStatement = modifier + weather;
                break;
            default:
                weatherStatement = modifier + weather;
        }
    }
    if(id >= 700 && id < 800) {     //Weather is Atmospheric
        switch(id) {
            case 762:
                weatherStatement = modifier + " some... " + weather + " in the air? I'm sure there's a perfectly reasonable explanation for that...";
                break;
            case 781:
                weatherStatement = modifier + " a " + weather + ". Fun!";
                break;
            default:
                weatherStatement = modifier + " some " + weather + " in the air";
        }
    }
    if(id == 800) {     //Weather is Clear
        weatherStatement = modifier + " a " + weather + " :)";
    }
    if(id > 800 && id < 805) {      //Weather is Clouds
        switch(id) {
            case 801:
                weatherStatement = modifier + " a " + weather;
                break;
            default:
                weatherStatement = modifier + " some " + weather;
        }
    }

    return weatherStatement;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherData);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getZIP() {
    var zip = document.getElementById("inputZip").value;
    var validate = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);

    if(validate) {
        var url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&units=imperial&appid=a74f97fb835407860672fd2b009d24c5";
        console.log(url);
        let req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.responseType = 'json';
        req.send();
        req.onload = () => {
            let data = req.response;
            console.log("data is: ");
            console.log(data);
            getCoor(data);
        }
    }
    else {
        x.innerHTML = "Zip Code is Not Valid";
    }
}

function getCoor(data) {
    let lon = data.coord.lon;
    let lat = data.coord.lat;

    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=a74f97fb835407860672fd2b009d24c5";
    console.log(url);
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'json';
    req.send();
    req.onload = () => {
        let data = req.response;

        fillPage(data);
    }
}

Date.prototype.addDays = function(toAdd) {
    var nextDay = new Date(this.valueOf());
    nextDay.setDate(nextDay.getDate() + toAdd);
    return nextDay;
}

function getWeatherData(position) {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=imperial&appid=a74f97fb835407860672fd2b009d24c5";
    console.log(url);
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'json';
    req.send();
    req.onload = () => {
        let data = req.response;

        fillPage(data);
    }
}

function fillPage(data) {
        console.log(data);
        var k = document.getElementsByClassName('card');
        for(var i = 0; i < k.length; ++i) {
            k[i].style.visibility = "visible";
        }

        document.getElementById("form").reset();

        //store JSON data for page navigation
        window.sessionStorage.setItem('data', JSON.stringify(data));

        //Initialize Variables
        var x = document.getElementById('support');
        var ctx = document.getElementById('24hour').getContext('2d');
        var ctx3 = document.getElementById('tomorrowChart').getContext('2d');
        var ctx4 = document.getElementById('weeklyChart').getContext('2d');
        var ctx5 = document.getElementById('cloudChart').getContext('2d');

        var hourly = [];    //array of temperature data
        var hourlyFeel = [];
        var d = new Date();
        var n = d.getHours();
        var hours = [];     //array of hour labels
        //Create hourly arrays
        for(let i = 0; i < 24; i++){
            if(n+i > 36)
                hours.push(((n+i)-24)%13 +1 + "pm");
            else if(n+i > 24 && n+i < 37)
                hours.push(((n+i)-24)%13 + "am");
            else if(n+i > 11 && n+i < 25) {
                if(n+i == 12)
                    hours.push(n+i + "pm");
                else if(n+i == 24)
                    hours.push(n+i -12 + "am")
                else
                    hours.push((n+i)-12 + "pm");
            }
            else
                hours.push((n+i)%13+"am");
            hourly.push(data.hourly[(i)].temp);
            hourlyFeel.push(data.hourly[i].feels_like);
        } 

        //Create 24 hour temperature chart
        var next24chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: hours,
                datasets: [{
                    label: "Temperature in °F",
                    backgroundColor: 'rgb(43, 190, 255)',
                    borderColor: 'rgb(43, 190, 255)',
                    data: hourly,
                    fill: false,
                    lineTension: 0,
                    pointRadius: 0
                },
                {
                    label: "Feels-Like in °F",
                    data: hourlyFeel,
                    backgroundColor: 'rgb(19, 95, 128)',
                    borderColor: 'rgb(19, 95, 128)',
                    fill: false,
                    lineTension: 0,
                    pointRadius: 0
                }]
            },
            options: {
                pointBackgroundColor: '#ffffff',
                showLine: true,
                gridLines: {
                    display: true
                },
            }
        });

        var header = document.getElementById("todayTemp");
        header.innerText = "Current Temperature: " + data.current.temp + "°F";
        //header.appendChild(text);

        var feel = document.getElementById("todayFeel");
        feel.innerText = "Feels Like: " + data.current.feels_like + "°F";

        var cloud = document.getElementById("todayCloud");
        cloud.innerText = "The Sky is: " + data.current.clouds + "% Clouds";

        if(data.current.snow) {
            var temp = document.createElement("h6");
            temp.innerHTML = data.current.snow + "mm of snow has fallen"
            header.appendChild(temp);
        }

        if(data.current.rain) {
            var temp = document.createElement("h6");
            temp.innerHTML = data.current.rain['1h'] + "mm of rain has fallen"
            header.appendChild(temp);
        }

        //Create "Tomorrow's Weather" Array
        var tomorrowTemps = [];
        var tomorrowFeels = [];
        var tomorrowLabels = ["Morning", "Day", "Evening", "Night", "Max", "Min"];
        tomorrowTemps.push(data.daily[1].temp.morn)
        tomorrowTemps.push(data.daily[1].temp.day)
        tomorrowTemps.push(data.daily[1].temp.eve)
        tomorrowTemps.push(data.daily[1].temp.night)
        tomorrowTemps.push(data.daily[1].temp.max)
        tomorrowTemps.push(data.daily[1].temp.min)

        tomorrowFeels.push(data.daily[1].feels_like.morn)
        tomorrowFeels.push(data.daily[1].feels_like.day)
        tomorrowFeels.push(data.daily[1].feels_like.eve)
        tomorrowFeels.push(data.daily[1].feels_like.night)

        //Create "Today's Weather" chart
        var dailyChart = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: tomorrowLabels,
                datasets: [{
                    label: "Today's Temperatures in °F",
                    data: tomorrowTemps,
                    backgroundColor: '#2BBEFF',
                    barPercentage: 1,
                    categoryPercentage: 1.0
                }, 
                {
                    label: "Feels Like in °F",
                    data: tomorrowFeels,
                    backgroundColor: 'rgb(19, 95, 128)',
                    barPercentage: 1,
                    categoryPercentage: 1.0
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0
                        }
                    }]
                }
            }
        });
             //Create "Week Ahead" Array
             var weeklyHighs = [];
             var weeklyLows = [];
             var weeklyLabels = [];
             const monthNames = ["Jan.", "Feb.", "March", "Apr.", "May", "June",
             "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
           ];
             //Create label array for next 7 days
             for(var w = 1; w < 8; ++w) {
                //instantiate new date here
                z = d.addDays(w);
                if(z.getDate() < 10)
                    weeklyLabels.push(" " + monthNames[(z.getMonth() + 1)] + " " + z.getDate());
                else
                    weeklyLabels.push(monthNames[(z.getMonth() + 1)] + " " + z.getDate());
             }
             
             weeklyHighs.push(data.daily[1].temp.max)
             weeklyHighs.push(data.daily[2].temp.max)
             weeklyHighs.push(data.daily[3].temp.max)
             weeklyHighs.push(data.daily[4].temp.max)
             weeklyHighs.push(data.daily[5].temp.max)
             weeklyHighs.push(data.daily[6].temp.max)
             weeklyHighs.push(data.daily[7].temp.max)

             weeklyLows.push(data.daily[1].temp.min)
             weeklyLows.push(data.daily[2].temp.min)
             weeklyLows.push(data.daily[3].temp.min)
             weeklyLows.push(data.daily[4].temp.min)
             weeklyLows.push(data.daily[5].temp.min)
             weeklyLows.push(data.daily[6].temp.min)
             weeklyLows.push(data.daily[7].temp.min)

             //Create "Today's Weather" chart
             var dailyChart = new Chart(ctx4, {
                 type: 'bar',
                 data: {
                     labels: weeklyLabels,
                     datasets: [{
                         label: "Daily Highs in °F",
                         data: weeklyHighs,
                         backgroundColor: '#2BBEFF'
                     }, 
                     {
                         label: "Daily Lows in °F",
                         data: weeklyLows,
                         backgroundColor: 'rgb(19, 95, 128)'
                     }]
                 }, 
                 options: {
                     scales: {
                         yAxes: [{
                             ticks: {
                                suggestedMin: 0
                            }
                         }]
                     }
                 }
             });
             
            var weather = data.current.weather[0].description;
            var id = data.current.weather[0].id;
            var modifier = "Today there's";
            var weatherStatement = getStatement(id, weather, modifier);
            
            //Is it raining?
            var rain = document.getElementById('raining');
             if(data.current.weather[0].main != "Rain" && data.current.weather[0].main != "Drizzle") {
                rain.innerHTML = "Surprisingly, no! " + weatherStatement;
             }
            else
                rain.innerHTML = "Of course it is. " + weatherStatement;
            document.getElementById('weatherIcon').src = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
            document.getElementById('weatherIcon').title = weather;

            var weatherList = document.createElement("ul");
            document.getElementById("Is It Raining Body").appendChild(weatherList);
            var weatherIcons = [];  //array of icon urls
            for(var i = 1; i < 8; ++i) {
                weatherIcons[i] = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png"
                console.log(weatherIcons[i]);
            }

            var day = [];
            var img = [];
            var des = [];
            var description = [];
            var text = [];
            for(let i = 1; i < 8; ++i)
            {
                day[i] = document.getElementById("day" + i);
                img[i] = document.getElementById("img" + i);
                des[i] = document.getElementById("des" + i);
                text[i] =weeklyLabels[i-1] + ":   \t";
                description[i] = getStatement(data.daily[i].weather[0].id,data.daily[i].weather[0].description,"There will be");
                img[i].src = weatherIcons[i];
                img[i].alt = data.daily[i].weather[0].description;
                img[i].title = data.daily[i].weather[0].description;
                day[i].innerText = (text[i]);
                des[i].innerText = (description[i]);
            }

            i = 1;

            var weeklyCloud = [];

            weeklyCloud.push(data.daily[1].clouds);
            weeklyCloud.push(data.daily[2].clouds);
            weeklyCloud.push(data.daily[3].clouds);
            weeklyCloud.push(data.daily[4].clouds);
            weeklyCloud.push(data.daily[5].clouds);
            weeklyCloud.push(data.daily[6].clouds);
            weeklyCloud.push(data.daily[7].clouds);

            colors = [
                '#0084ff',
                '#40a3ff',
                '#80c2ff',
                '#c4e3ff',
                '#7e91a3',
                '#4e7599',
                '#12508a',
            ];

            borderColors = [
                '#12508a',
                '#0084ff',
                '#40a3ff',
                '#80c2ff',
                '#c4e3ff',
                '#7e91a3',
                '#4e7599',
            ]

            var cloud = new Chart(ctx5, {
                type: 'polarArea',
                data: {
                    datasets: [{
                    data: weeklyCloud,
                    backgroundColor: colors,
                    borderColor: borderColors,
                }],
                
                labels: weeklyLabels,
                },

            });

}


