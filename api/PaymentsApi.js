import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const closeOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/payments/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getRevenue = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/payments/revenue`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getPaymentByOrderId = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/payments/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { closeOrder, getRevenue, getPaymentByOrderId };
