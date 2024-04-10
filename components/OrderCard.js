import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import getOrderType from '../api/OrderTypeApi';

export default function OrderCard({ order }) {
  const [orderType, setOrderType] = useState({});
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
  }).isRequired,
};
