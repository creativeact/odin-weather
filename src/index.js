import "./styles.css";

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=LSZQL3KB36PUMNGJ4DJYQSN6U&contentType=json`,
      {
        method: "GET",
        headers: {},
      },
    );
    const rawData = await response.json();
    console.log(rawData);
    const weatherData = {
      city: city,
      tempmax: rawData.days[0].tempmax,
      tempmin: rawData.days[0].tempmin,
      feelslike: rawData.currentConditions.feelslike,
      temp: rawData.currentConditions.temp,
      data: rawData.days[0].datetime,
      time: rawData.currentConditions.datetime,
    };
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.error("Error fetching citydata:", error);
  }
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

async function handleSearch() {
  const query = searchInput.value.trim();
  if (query) {
    try {
      const data = await getWeatherData(query);
      if (data) {
        displayWeather(data.city, data.temp);
        console.log(data.temp);
      }
    } catch (error) {
      console.error("Error displaying weather data: ", error);
    }
  }
}

function displayWeather(cityInput, tempInput) {
  const city = document.querySelector("#city");
  city.textContent = `${cityInput}`;
  const temp = document.querySelector("#temp");
  temp.textContent = `${tempInput}°F`;
}
