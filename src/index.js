import api from './api';
import dom from './dom';
import handlers from './handlers';

// GET AND SHOW DEFAULT WEATHER DATA
async function getDefaultData() {
  const weatherData = await api.getData('amsterdam', 'metric');
  dom.renderData(weatherData);
  return weatherData;
}
getDefaultData();

handlers.listenClicks();
