$(function () {

  $("#search-btn").on("click", function () {
    var city = $("#city-input").val();
    localStorage.setItem("previousCity", city);
    todayApi(city);
  });



var previousCity = localStorage.getItem("previousCity");
if (previousCity) {
  $("#previous-city").text(previousCity);
}

  function todayApi(city) {
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c40886ca6c36fc80578e039048174aeb&units=imperial`)
      .then(function (data) {

        $("#city").text(data.name)
        $("#temperature").text(data.main.temp)
        $("#description").text(data.weather[0].description)
        $("#humidity").text(data.main.humidity)
        forecastApi(city)
      });
  }

  function forecastApi(city) {
    $.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c40886ca6c36fc80578e039048174aeb&units=imperial`)
      .then(function (data) {
        var weather = data.list
        console.log(weather);

        for (let i = 0; i < weather.length; i++) {
          var time = weather[i].dt_txt.split(" ")[1]
          if (time === "12:00:00") {
            $("#forecast").append("<div>Append this div </div>"
              `
          `
            )
          }
        }


      });
  }




})



