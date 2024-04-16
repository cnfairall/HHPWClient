import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getMenuItem } from '../api/ItemsApi';

export default function ItemModal({ orderItem }) {
  const [menuItem, setMenuItem] = useState({});
  useEffect(() => {
    getMenuItem(orderItem.itemId).then(setMenuItem);
  }, [orderItem]);

  return (
    <Modal onHide={handleClose}>
      <Modal.Body>
        <Modal.Dialog>{menuItem.itemName} has been added to/removed from order #{orderItem.orderId}</Modal.Dialog>
      </Modal.Body>
    </Modal>
  );
}

ItemModal.propTypes = {
  orderItem: PropTypes.shape({
    itemId: PropTypes.string,
    orderId: PropTypes.string,
  }).isRequired,
};
