import api from './api';
import dom from './dom';

// GET AND SHOW DEFAULT WEATHER DATA
async function getDefaultData() {
  const weatherData = await api.getData('Amsterdam', 'metric');
  dom.renderData(weatherData);
  return weatherData;
}
getDefaultData();
