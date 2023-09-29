$(function () {
  // Function to fetch and display current weather
  function todayApi(city) {
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c40886ca6c36fc80578e039048174aeb&units=imperial`)
      .then(function (data) {
        // Display weather information here
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
        // Handle errors here
        console.error("Error fetching weather data:", error);
      });
  }

  // Retrieve the array of previous cities from local storage, or initialize an empty array
  var previousCities = JSON.parse(localStorage.getItem("previousCities")) || [];

  function addClickListenersToPreviousCities() {
    $("#previous-city-list li").each(function(index) {
      $(this).click(function() {
        var selectedCity = $(this).text();
        fetchWeather(selectedCity);
      });
    });
  }

  // Display the last 5 previous cities or "No Previous History" if the array is empty
  if (previousCities.length > 0) {
    $("#previous-city-list").empty(); // Clear the list first
    var startIndex = Math.max(0, previousCities.length - 5); // Calculate the starting index
    for (var i = previousCities.length - 1; i >= startIndex; i--) {
      $("#previous-city-list").prepend(`<li>${previousCities[i]}</li>`);
    }
  } else {
    $("#previous-city-list").html("<li>No Previous History</li>");
  }

  $("#search-btn").on("click", function () {
    var city = $("#city-input").val();
    
    // Add the new city to the array of previous cities
    previousCities.push(city);
    
    // Save the updated array in local storage
    localStorage.setItem("previousCities", JSON.stringify(previousCities));

    // Display only the last 5 cities
    $("#previous-city-list").empty(); // Clear the list first
    var startIndex = Math.max(0, previousCities.length - 5); // Calculate the starting index
    for (var i = startIndex; i < previousCities.length; i++) {
      $("#previous-city-list").append(`<li class = "list-group-item list-group-item-warning">${previousCities[i]}</li>`);
    }

    $("#previous-city-list").on("click", "li", function(){
      const cityName = $(this).text();
    });

    todayApi(city);
  });

});

function forecastApi(city) {
  $.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c40886ca6c36fc80578e039048174aeb&units=imperial`)
    .then(function (data) {
      var weather = data.list;
      console.log(weather);

      // Clear the existing forecast data
      $("#forecast").empty();

      // Loop through the weather data
      for (let i = 0; i < weather.length; i++) {
        var time = weather[i].dt_txt.split(" ")[1];

        // Check if the time is 12:00:00 (midday)
        if (time === "12:00:00") {
          // Create a card for the forecast
          var date = weather[i].dt_txt.split(" ")[0];
          var temperature = weather[i].main.temp;
          var description = weather[i].weather[0].description;
          var iconCode = weather[i].weather[0].icon;
          
          var picUrl = 'https://openweathermap.org/img/wn/${iconCode}.png';
          
          var humidityValue = $('.humidity').textContent
          var card = `
            <div class="card">
              <div class="card-body">
                <h1 class="card-title">${date}</h1>
                <img src="${picUrl}" alt="Weather Icon"> 
                <p class="card-text">Temperature: ${temperature}&deg;C</p>
                <p class="card-text">Description: ${description}</p>
                 <p class="card-text">Humidity: ${humidityValue}</p>
              </div>
            </div>
          `;

          // Append the card to the forecast container
          $("#forecast").append(card);
        }
      }
    });
}

           
        

  
  































