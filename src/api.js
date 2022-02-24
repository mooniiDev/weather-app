const api = (() => {
  // GET WEATHER DATA
  async function getWeather() {
    try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=zimbabwe&appid=0baf2fc9b70638f2b2157bf4fe3efde1',
        { mode: 'cors' },
      );
      const data = await response.json();
      return data;
    } catch (err) {
      return console.error('Oh no!', err);
    }
  }

  // PROCESS WEATHER DATA
  async function processWeather() {
    const weatherData = await getWeather();
    const processedData = {
      weatherId: weatherData.weather[0].id,
    };
    return processedData;
  }

  return {
    getWeather,
    processWeather,
  };
})();

export default api;
