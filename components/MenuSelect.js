import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getMenuItems } from '../api/ItemsApi';
import { addItem } from '../api/OrdersApi';

export default function MenuSelect() {
  const [menuItems, setMenuItems] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const initialState = {
    orderId: id,
    itemId: 0,
  };
  const [formData, setFormData] = useState(initialState);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setFormData(initialState);
    setShow(false);
    window.location.reload();
  };

  useEffect(() => {
    getMenuItems().then(setMenuItems);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(formData).then(handleShow);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Modal.Dialog>{menuItems[formData?.itemId - 1]?.itemName} has been added to order #{formData.orderId}</Modal.Dialog>
        </Modal.Body>
      </Modal>
      <Form className="spread align-content-center flex-wrap" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Select
            aria-label="Menu Item"
            name="itemId"
            onChange={handleChange}
            value={formData.itemId}
            required
          >
            <option value="">Select Menu Item</option>
            {
            menuItems.map((mi) => (
              <option
                key={mi.id}
                value={mi.id}
              >
                {mi.itemName} ${mi.itemPrice}
              </option>
            ))
          }
          </Form.Select>
        </Form.Group>
        <Button type="submit">Add</Button>
      </Form>
    </>
  );
}

MenuSelect.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
