import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { createOrder, updateOrder } from '../api/OrdersApi';
import { getOrderTypes } from '../api/OrderTypeApi';

const initialState = {
  custName: '',
  custEmail: '',
  phoneNum: '',
  orderTypeId: 0,
};

function OrderForm({ order }) {
  const router = useRouter();
  const [orderTypes, setOrderTypes] = useState([]);
  const [formData, setFormData] = useState({ initialState });

  useEffect(() => {
    if (order.id) { setFormData(order); }
    getOrderTypes().then(setOrderTypes);
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (order?.id) {
      updateOrder(formData).then(() => router.push('/orders'));
    } else {
      createOrder(formData).then(() => router.push('/orders'));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form
      style={{ width: '700px' }}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter First and Last Name"
          name="custName"
          value={formData?.custName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Phone Number"
          name="phoneNum"
          value={formData?.phoneNum}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Email"
          name="custEmail"
          value={formData?.custEmail}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Select
          aria-label="Order Type"
          name="orderTypeId"
          onChange={handleChange}
          value={formData?.orderTypeId}
          required
        >
          <option value="">Order Type</option>
          {
            orderTypes.map((ot) => (
              <option
                key={ot.id}
                value={ot.id}
              >
                {ot.name}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

OrderForm.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    orderTypeId: PropTypes.number,
    custName: PropTypes.string,
    custEmail: PropTypes.string,
    phoneNum: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  order: initialState,
};

export default OrderForm;
