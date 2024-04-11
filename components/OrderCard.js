import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { getOrderType } from '../api/OrderTypeApi';
import { deleteOrder } from '../api/OrdersApi';

export default function OrderCard({ order }) {
  const [orderType, setOrderType] = useState({});
  const deleteAnOrder = () => {
    deleteOrder(order.id);
  };

  useEffect(() => {
    getOrderType(order.orderTypeId).then(setOrderType);
  }, [order]);

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <h5>{order.custName}</h5>
          <p>{order.phoneNum}</p>
          <p>{order.custEmail}</p>
          <p>{orderType?.name}</p>
        </Card.Body>
        {order.isClosed === false ? (
          <>
            <Link passHref href={`/orders/edit/${order.id}`}>
              <Button>Edit</Button>
            </Link>
            <Button onClick={deleteAnOrder}>Delete</Button>
          </>
        ) : ('')}
      </Card>
    </>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    orderTypeId: PropTypes.number,
    custName: PropTypes.string,
    phoneNum: PropTypes.string,
    custEmail: PropTypes.string,
    isClosed: PropTypes.bool,
  }).isRequired,
};
