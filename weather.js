$(() => {
  //   If user accepts location data, get coordinated and create url with API.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
      //       AJAX CALL
      $.getJSON(url).done(getData);
    });
  }
});

let getData = data => {
  let measurement = " °F";
  $(".weather-icon").attr("src", data.weather[0].icon);
  $(".location").html(data.name);
  $(".desc").html(data.weather[0].main);
  $(".temp").html(Math.floor(data.main.temp * 9 / 5 + 32) + " °F");

  // Color change on weather
  if (data.weather[0].main === "Clouds") {
    $(".card").css("background-color", "#747d8c");
  } else if (data.weather[0].main === "Rain") {
    $(".card").css("background-color", "#353b48");
  } else if (data.weather[0].main === "Clear") {
    $(".card").css("background-color", "#82ccdd");
  }

  //Switch from F to C
  $(".temp-switch").on("click", function() {
    let c = $("button:contains(°F)");
    let f = $("button:contains(°C)");
    if (f.length) {
      $(".temp").html(Math.round(data.main.temp * 10) / 10 + " °C");
      f.html(`Switch to °F`);
    } else {
      $(".temp").html(Math.floor(data.main.temp * 9 / 5 + 32) + " °F");
      c.html(`Switch to °C`);
    }
  });
};
