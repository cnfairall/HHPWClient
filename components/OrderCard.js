import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getOrderType } from '../api/OrderTypeApi';
import { deleteOrder, removeItem } from '../api/OrdersApi';
import OrderItem from './OrderItem';

export default function OrderCard({ order }) {
  const [orderType, setOrderType] = useState({});
  const [noItems, setNoItems] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const isDetail = pathname.includes('id');

  const deleteAnOrder = () => {
    deleteOrder(order?.id);
  };

  const deleteItem = (singleItem) => {
    const payload = {
      orderId: order.id,
      itemId: singleItem.item.id,
    };
    removeItem(payload);
  };

  useEffect(() => {
    getOrderType(order?.orderTypeId).then(setOrderType);
    if (order?.items.length < 1) setNoItems(true);
  }, [order]);

  return (
    <a href={`/orders/${order?.id}`}>
      <Card style={{ width: '20em', margin: '10px' }}>
        <Card.Body className="flex">
          <h5>{order?.custName}</h5>
          <p>{order?.phoneNum}</p>
          <p>{order?.custEmail}</p>
          <p>{orderType?.name}</p>

          {isDetail && noItems === true ? (<p>No items</p>) : ('')}
          {isDetail && order?.isClosed === false ? (
            order?.items.map((singleItem) => (
              <div className="order-item-box" key={singleItem.id}>
                <OrderItem item={singleItem} />
                <Button id="del-item" onClick={() => deleteItem(singleItem)}>
                  <i className="bi bi-trash3-fill" />
                </Button>
              </div>
            ))
          ) : ('')}

          {isDetail && order?.isClosed === true ? (
            order?.items.map((singleItem) => (
              <div className="order-item-box" key={singleItem.id}>
                <OrderItem item={singleItem} />
              </div>
            ))
          ) : ('')}
        </Card.Body>
        {order?.isClosed === false ? (
          <div className="edit spread">
            <Link passHref href={`/orders/edit/${order.id}`}>
              <Button>Edit</Button>
            </Link>
            <Button onClick={deleteAnOrder}>Delete</Button>
          </div>
        ) : ('')}
      </Card>
    </a>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    orderTypeId: PropTypes.number.isRequired,
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
