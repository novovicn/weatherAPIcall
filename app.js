apiKey = "7a3f8e04-c6ea-4397-8e06-206be5dd6c9a";
countriesURL = "http://api.airvisual.com/v2/countries?key=";
statesURL =
  "http://api.airvisual.com/v2/states?country={{COUNTRY_NAME}}&key={{YOUR_API_KEY}}";


//   CREATING COUNTRIES ON THE FIRST PAGE
var xhr = new XMLHttpRequest();
xhr.open("GET", countriesURL + apiKey);

xhr.onload = function () {
  if (this.status == 200) {
    document.getElementById('statesPage').style.display ="none";
    let countries = document.getElementById("countries");
    let responseCountries = JSON.parse(this.responseText);
    //    console.log(responseCountries.data[3].country);

    for (let i = 0; i < responseCountries.data.length; i++) {
      let countriesDiv = document.createElement("div");
      countriesDiv.setAttribute("class", "countriesDiv");
      countriesDiv.setAttribute("onclick", "listStates(this)");
      countriesDiv.setAttribute("id", responseCountries.data[i].country);

      countriesDiv.innerHTML = `<a href=#">${responseCountries.data[i].country}</a>`;
      countries.appendChild(countriesDiv);

      //    console.log(vraceneDrzave.data[i].country);
    }
  }
};

xhr.send();


document.getElementById('citiesPage').style.display = 'none';

// CREATING LIST OF STATES FOR CHOSEN COUNTRY

function listStates(country) {
  document.getElementById('statesPage').style.display ="block";

    // document.getElementById('citiesPage').style.display = 'none';
    document.getElementById('choose').innerText = 'Choose a state:'
  var xhr2 = new XMLHttpRequest();
  xhr2.open(
    "GET",
    `http://api.airvisual.com/v2/states?country=${country.id}&key=${apiKey}`
  );
  xhr2.onload = function () {
    if (this.status == 200) {
      let responseStates = JSON.parse(this.responseText);
      let statesList = responseStates.data;

      let statesHTMLDiv = document.getElementById("states");

      var h1States = document.getElementById("countryInStates");
      h1States.innerText = `Country: ${country.id} `;

      for (let i = 0; i < statesList.length; i++) {
        let statesDiv = document.createElement("div");
        statesDiv.setAttribute("onclick", "listCities(this)");
        statesDiv.setAttribute("id", statesList[i].state);
        statesDiv.classList.add('state')
        statesDiv.innerHTML = `<a href="#">${statesList[i].state}</a>`;
        let countries = document.getElementById("countries");
        statesHTMLDiv.appendChild(statesDiv);
        countries.style.display = "none";

        // console.log(states.data[i].state);
      }
    }
  };

  xhr2.send();
}

//  citiesExampleURL = "http://api.airvisual.com/v2/cities?state={{STATE_NAME}}&country={{COUNTRY_NAME}}&key={{YOUR_API_KEY}}";

// CREATING LIST OF CITIES FOR CHOSEN STATE

function listCities(stateName) {

    document.getElementById('choose').innerText = 'Choose city:'

    document.getElementById('citiesPage').style.display = 'block';
    document.getElementById('statesPage').style.display = 'none';
  let xhr3 = new XMLHttpRequest();
  let country = document
    .getElementById("countryInStates")
    .textContent.split(" ")[1];

  xhr3.open(
    "GET",
    `http://api.airvisual.com/v2/cities?state=${stateName.id}&country=${country}&key=${apiKey}`
  );

  console.log(stateName);
  xhr3.onload = function () {
    if (this.status == 200) {
      let returnedText = JSON.parse(this.responseText);
      let citiesList = returnedText.data;

      var h1Cities = document.getElementById("stateInCities");
      h1Cities.innerText = `State: ${stateName.id}`;

      for (let i = 0; i < citiesList.length; i++) {
        let citiesDiv = document.createElement("div");
        citiesDiv.setAttribute('onclick','listCityInfo(this)');
        citiesDiv.setAttribute("id", citiesList[i].city);
        citiesDiv.classList.add('city');
        citiesDiv.innerHTML = `<a href="#">${citiesList[i].city}</a>`;
        let countrie = document.getElementById("countrie");
        document.getElementById("cities").appendChild(citiesDiv);
        countries.style.display = "none";
        document.getElementById("states").style.display = "none";
      }
    }
  };

  xhr3.send();
}


// sample: http://api.airvisual.com/v2/city?city={{CITY}}&state={{STATE}}&country={{COUNTRY}}&key={{YOUR_API_KEY}}


// CREATEN INFO FOR CHOSEN CITY

function listCityInfo(city){


    document.getElementById('choose').style.display = 'none';

    
    document.getElementById('citiesPage').style.display = 'none';
    document.getElementById('stateInCities').style.display = 'none';

    let country = document
    .getElementById("countryInStates").textContent.substring(9); 
    let state = document.getElementById('stateInCities').textContent.substring(7); 

    let xhr4 = new XMLHttpRequest();
    xhr4.open('GET',`http://api.airvisual.com/v2/city?city=${city.id}&state=${state}&country=${country}&key=${apiKey}`);

    xhr4.onload = function(){
        if(this.status == 200) {
            let responseCity = JSON.parse(this.responseText);

            let cityInfoDiv = document.createElement('div');
            cityInfoDiv.classList.add('cityInfoTables');
            cityInfoDiv.innerHTML = `<table id="cityInfoTable" class="table">
            <tr><td>City:</td><td>${responseCity.data.city}</td></tr>
            <tr><td>State:</td><td>${responseCity.data.state}</td></tr>
            <tr><td>Country:</td><td>${responseCity.data.country}</td></tr>
            <tr><td>Coordinates:</td><td>${responseCity.data.location.coordinates}</td></tr>
            </table>
            <table id="cityWeatherTable" class="table">
            <tr><td>Updated:</td><td>${responseCity.data.current.weather.ts}</td></tr>
            <tr><td>Temperature(C):</td><td>${responseCity.data.current.weather.tp}</td></tr>
            <tr><td>Humidity:</td><td>${responseCity.data.current.weather.hu}</td></tr>
            <tr><td>Wind speed(m/s):</td><td>${responseCity.data.current.weather.ws}</td></tr>
            </table>`
            document.getElementById('cityInfo').appendChild(cityInfoDiv);
      
        }
    }

    xhr4.send();

}

// responseText to be used: {"status":"success",
// "data":{"city":"Shanwei","state":"Guangdong","country":"China",
// "location":{"type":"Point","coordinates":[115.370147,22.772239]},
// "current":{"weather":{"ts":"2020-08-20T08:00:00.000Z","tp":30,"pr":1007,"hu":69,"ws":4.57,"wd":133,"ic":"01d"},
// "pollution":{"ts":"2020-08-20T08:00:00.000Z","aqius":68,"mainus":"p2","aqicn":36,"maincn":"p1"}}}}
