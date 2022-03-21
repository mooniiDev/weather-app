const api = (() => {
  // PROCESS WEATHER DATA
  function processData(weatherData) {
    const processedData = {
      name: weatherData.name,
      country: weatherData.sys.country,
      timezone: weatherData.timezone,
      description: weatherData.weather[0].description,
      weatherIcon: weatherData.weather[0].icon,
      temp: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,
      pressure: weatherData.main.pressure,
      humidity: weatherData.main.humidity,
      visibility: weatherData.visibility,
      windSpeed: weatherData.wind.speed,
      windGust: weatherData.wind.gust,
      windDeg: weatherData.wind.deg,
      sunrise: weatherData.sys.sunrise,
      sunset: weatherData.sys.sunset,
    };
    return processedData;
  }

  // GET WEATHER DATA FROM API
  async function getData(city, unit) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=0baf2fc9b70638f2b2157bf4fe3efde1`,
        { mode: 'cors' },
      );

      const data = await response.json();

      // IF CLIENT-SIDE ERROR OCCURS
      if (response.status >= 400) {
        return data;
      }
      return processData(data);
    } catch (err) {
      return { cod: err.name, message: err.message };
    }
  }
  return {
    getData,
    processData,
  };
})();

export default api;
