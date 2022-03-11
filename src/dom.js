import api from './api';

const dom = (() => {
  async function showWeather() {
    const weatherDataObj = await api.processWeather();
    console.log(weatherDataObj);
  }
  return {
    showWeather,

  };
})();

export default dom;
