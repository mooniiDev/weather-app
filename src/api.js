const api = (() => {
  const API_KEY = '0baf2fc9b70638f2b2157bf4fe3efde1';

  function processData(weatherData) {
    const processedData = {
      name: weatherData.name,
      country: weatherData.sys.country,
      timezone: weatherData.timezone,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
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

  async function getData(city, unit) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`,
        { mode: 'cors' },
      );

      const data = await response.json();

      // IF ERROR OCCURS
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