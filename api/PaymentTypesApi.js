import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPaymentType = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/paymenttypes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getPaymentTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/paymenttypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getPaymentType, getPaymentTypes };
