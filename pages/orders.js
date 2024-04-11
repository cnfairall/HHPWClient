import { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { getOrders } from '../api/OrdersApi';
import OrderCard from '../components/OrderCard';

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders().then(setOrders);
  }, [orders]);

  return (
    <div style={{ marginTop: '20px' }}>
      <Tabs
        defaultActiveKey="open"
        id="order-tabs"
        className="mb-3"
      >
        <Tab eventKey="open" title="Open">
          <div id="open" className="column">
            {orders.openOrders?.map((order) => (
              <OrderCard order={order} key={order.id} />
            ))}
          </div>
        </Tab>
        <Tab eventKey="closed" title="Closed">
          <div id="closed" className="column">
            {orders.closedOrders?.map((order) => (
              <OrderCard order={order} key={order.id} />
            ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
