import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Modal } from 'react-bootstrap';
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

  // delete order modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };
  const confirmDelete = () => {
    handleShow();
  };
  const deleteAnOrder = () => {
    deleteOrder(order.id);
    handleClose();
    router.push('/orders');
  };

  // delete item modal
  const [showItem, setShowItem] = useState(false);
  const handleShowItem = () => setShowItem(true);
  const handleCloseItem = () => {
    setShowItem(false);
    window.location.reload();
  };
  const confirmDeleteItem = () => handleShowItem();
  const deleteItem = (singleItem) => {
    const payload = {
      orderId: order.id,
      itemId: singleItem.item.id,
    };
    removeItem(payload);
    handleCloseItem();
  };

  useEffect(() => {
    getOrderType(order?.orderTypeId).then(setOrderType);
    if (order?.items?.length < 1) setNoItems(true);
  }, [order]);

  return (
    <>
      <Card className="order-card">
        <Link passHref href={`/orders/${order?.id}`}>
          <Card.Body className="flex">
            <div className="cust-info">

              <h5>{order?.custName}</h5>
              <p>{order?.phoneNum}</p>
              <p>{order?.custEmail}</p>
              <p>{orderType?.name}</p>
            </div>

            {isDetail && noItems === true ? (<p>No items</p>) : ('')}
            {isDetail && order?.isClosed === false ? (
              order?.items.map((singleItem) => (
                <div className="order-item-box" key={singleItem.id}>
                  <OrderItem item={singleItem} />
                  <Button id="del-item" onClick={confirmDeleteItem}>
                    <i className="bi bi-trash3-fill" />
                  </Button>
                  <Modal show={showItem} onHide={handleCloseItem}>
                    <Modal.Body>
                      <p>Remove {singleItem?.item.itemName} from this order?</p>
                    </Modal.Body>
                    <Button onClick={handleCloseItem}>Cancel</Button>
                    <Button onClick={() => deleteItem(singleItem)}>Delete</Button>
                  </Modal>
                </div>
              ))
            ) : ('')}
            {isDetail && order?.isClosed === false ? (
              <p style={{ margin: '8px' }}>Subtotal: ${order?.subtotal}</p>
            ) : ('')}

            {isDetail && order?.isClosed === true ? (
              order?.items.map((singleItem) => (
                <div className="order-item-box" key={singleItem.id}>
                  <OrderItem item={singleItem} />
                </div>
              ))
            ) : ('')}
          </Card.Body>
        </Link>
        {order?.isClosed === false ? (
          <>
            <div className="edit spread">
              <Link passHref href={`/orders/edit/${order.id}`}>
                <Button className="yellow">
                  <i className="bi bi-pencil-fill" />

                </Button>
              </Link>
              <Button className="red" onClick={confirmDelete}>
                <i className="bi bi-trash3-fill" />
              </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Body>
                <p>Are you sure you want to delete order #{order?.id}?</p>
              </Modal.Body>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={deleteAnOrder}>Delete</Button>
            </Modal>
          </>
        ) : ('')}
      </Card>
    </>
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
    subtotal: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.shape({
      item: PropTypes.shape({
        id: PropTypes.number,
        itemName: PropTypes.string,
        itemPrice: PropTypes.number,
      }).isRequired,
    })),
  }).isRequired,
};
