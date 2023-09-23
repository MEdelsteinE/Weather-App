var apiKey = "c40886ca6c36fc80578e039048174aeb"
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: 'GET',
    success: function(data) {
        var weatherData = `
      <p>Location: ${data.name}, ${data.sys.country}</p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
    `;
    $('#weather-data').html(weatherData);
  },
  error: function(error) {
    console.error('There was a problem with the API request:', error);
  }
});