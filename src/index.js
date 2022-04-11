import api from './api';
import dom from './dom';
import handlers from './handlers';

async function getDefaultData() {
  const weatherData = await api.getData('Amsterdam', 'metric');
  dom.renderData(weatherData, 'metric');
  return weatherData;
}
getDefaultData();

handlers.listenClicks();
