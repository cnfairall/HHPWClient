import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOrderType = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/ordertypes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getOrderTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/ordertypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getOrderType, getOrderTypes };
