const api = (() => {
  // GET WEATHER DATA
  async function getWeather() {
    try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=amsterdam&units=metric&appid=0baf2fc9b70638f2b2157bf4fe3efde1',
        { mode: 'cors' },
      );
      const data = await response.json();
      return data;
    } catch (err) {
      return err;
    }
  }

  // PROCESS WEATHER DATA
  async function processWeather() {
    const weatherData = await getWeather();
    const processedData = {
      name: weatherData.name,
      timezone: weatherData.timezone,
      dataCalcTime: weatherData.dt,
      weatherId: weatherData.weather[0].id,
      description: weatherData.weather[0].description,
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

  return {
    getWeather,
    processWeather,
  };
})();

export default api;
