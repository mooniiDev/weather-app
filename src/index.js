import api from './api';
import dom from './dom';
import handlers from './handlers';

// GET AND SHOW DEFAULT WEATHER DATA
async function getDefaultData() {
  const weatherData = await api.getData('Amsterdam', 'metric');
  dom.renderData(weatherData, 'metric');
  return weatherData;
}
getDefaultData();

handlers.listenClicks();
