import { useEffect, useState } from 'react';
import { getOrders } from '../api/OrdersApi';
import OrderCard from '../components/OrderCard';

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <div id="order-container">
      <div id="open">

      {orders.openOrders?.map((order) => (
        <OrderCard order={order} />
      ))}
      </div>
      <div id="closed">
      {orders.closedOrders?.map((order) => (
        <OrderCard order={order} />
      ))}
      </div>
    </div>
  );
}
