import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getOrderType } from '../api/OrderTypeApi';
import { deleteOrder } from '../api/OrdersApi';

export default function OrderCard({ order }) {
  const [orderType, setOrderType] = useState({});
  const router = useRouter();
  const { pathname } = router;
  const isDetail = pathname.includes('id');

  const deleteAnOrder = () => {
    deleteOrder(order?.id);
  };

  useEffect(() => {
    getOrderType(order?.orderTypeId).then(setOrderType);
  }, [order]);

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <h5>{order?.custName}</h5>
          <p>{order?.phoneNum}</p>
          <p>{order?.custEmail}</p>
          <p>{orderType?.name}</p>
          {isDetail ? (
            order?.items.map((i) => (
              <>
                Items
                <p>{i.item.itemName}</p>
                <p>{i.item.itemPrice}</p>
              </>
            ))
          ) : ('')}
        </Card.Body>
        {order?.isClosed === false ? (
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
    id: PropTypes.number.isRequired,
    orderTypeId: PropTypes.isRequired,
    custName: PropTypes.string.isRequired,
    phoneNum: PropTypes.string.isRequired,
    custEmail: PropTypes.string.isRequired,
    isClosed: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      item: PropTypes.shape({
        id: PropTypes.number,
        itemName: PropTypes.string,
        itemPrice: PropTypes.number,
      }).isRequired,
    })),
  }).isRequired,
};
