import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOrders = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        const orders = Object.values(data);
        const openOrders = orders.filter((order) => (order.isClosed === false));
        const closedOrders = orders.filter((order) => (order.isClosed === true));
        resolve({ openOrders, closedOrders });
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getOrderDetails = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orders/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orders/${payload.OrderId}/add`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const removeItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orders/${payload.OrderId}/remove`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getOrders, getOrderDetails, createOrder, deleteOrder, updateOrder, addItem, removeItem,
};
