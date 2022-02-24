import api from './api';

const dom = (() => {
  async function showWeather() {
    const weatherDataObj = await api.processWeather();

    if (weatherDataObj.weatherId === 800) {
      console.log('Enjoy the clear sky! :)');
    } else {
      console.log('No clear sky for you today.. :(');
    }
  }

  return {
    showWeather,
  };
})();

export default dom;
