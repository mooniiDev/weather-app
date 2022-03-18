import api from './api';
import dom from './dom';

const handlers = (() => {
  function listenClicks() {
    const searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      const searchInputValue = document.querySelector('.search-input').value;
      const weatherData = await api.getData(searchInputValue, 'metric');

      dom.renderData(weatherData);
    });
  }
  return {
    listenClicks,
  };
})();

export default handlers;
