$(function () {
  // Function that fetches and displays the current weather
  function todayApi(city) {
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c40886ca6c36fc80578e039048174aeb&units=imperial`)
      .then(function (data) {
       
        $("#city").text(data.name);
        $("#temperature").text(data.main.temp);
        $("#description").text(data.weather[0].description);
        $("#humidity").text(data.main.humidity);

        var iconCode = data.weather[0].icon;
        var iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        $("#weather-icon").attr("src", iconUrl);

        forecastApi(city);
      })
      .catch(function (error) {
        
        console.error("Error fetching weather data:", error);
      });
  }

  var previousCities = JSON.parse(localStorage.getItem("previousCities")) || [];

// Displays only the last 5 cities searched or will show no previous cities. !!Will show previous Cities when you refresh the page.!!
  if (previousCities.length > 0) {
    $("#previous-city-list").empty(); 
    var startIndex = Math.max(0, previousCities.length - 5); 
    for (var i = startIndex; i < previousCities.length; i++) {
      $("#previous-city-list").append(`<li class = "list-group-item list-group-item-warning">${previousCities[i]}</li>`);
    }
   
  } else {
    $("#previous-city-list").html("<li>No Previous History</li>");
  }

  $("#search-btn").on("click", function () {
    var city = $("#city-input").val();

    
    previousCities.push(city);

    // Save array in local storage
    localStorage.setItem("previousCities", JSON.stringify(previousCities));

    todayApi(city);
  });

  function forecastApi(city) {
    $.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c40886ca6c36fc80578e039048174aeb&units=imperial`)
      .then(function (data) {
        var weather = data.list;
        console.log(weather);

        // Clears  existing forecast 
        $("#forecast").empty();

        // Loops the weather data
        for (let i = 0; i < weather.length; i++) {
          var time = weather[i].dt_txt.split(" ")[1];

          // Check if the time is midday
          if (time === "12:00:00") {
            
            var date = weather[i].dt_txt.split(" ")[0];
            var temperature = weather[i].main.temp;
            var description = weather[i].weather[0].description;
            var humidity = weather[i].main.humidity;
            var iconCode = weather[i].weather[0].icon;
            var picUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

            var card = `
            <div class="card">
              <div class="card-body">
                <h1 class="card-title">${date}</h1>
                <img src="${picUrl}" alt="Weather Icon"> 
                <p class="card-text">Temperature: ${temperature}&deg;C</p>
                <p class="card-text">Description: ${description}</p>
                 <p class="card-text">Humidity: ${humidity}</p>
              </div>
            </div>
          `;

            // Appends the card to forecast container
            $("#forecast").append(card);
          }
        }
      });
  }
// Adds event listener and calls todayApi function to previous city list
  $("#previous-city-list").on("click", "li", function (event) {
    var clickedCity = event.target.textContent
    todayApi(clickedCity);
  })
});






























