import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMenuItem = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/items/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getMenuItems = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getMenuItem, getMenuItems };
