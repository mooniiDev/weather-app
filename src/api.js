const api = (() => {
  const API_KEY = '0baf2fc9b70638f2b2157bf4fe3efde1';

  function processData(weatherData) {
    const processedData = {
      name: weatherData.name,
      country: weatherData.sys.country,
      timezone: weatherData.timezone,
      temp: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,
      icon: weatherData.weather[0].icon,
      description: weatherData.weather[0].description,
      sunrise: weatherData.sys.sunrise,
      sunset: weatherData.sys.sunset,
      pressure: weatherData.main.pressure,
      humidity: weatherData.main.humidity,
      visibility: weatherData.visibility,
      cloudiness: weatherData.clouds.all,
      windSpeed: weatherData.wind.speed,
      windDeg: weatherData.wind.deg,
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

      if (response.status >= 400) { // If error occurs
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
