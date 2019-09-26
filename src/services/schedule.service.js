import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://tabler.ru/api/v1/places',
  timeout: 10000,
});

function getSchedules(name) {
  return instance.get(name);
}

export default {
  getSchedules,
};
