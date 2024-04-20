import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { closeOrder } from '../api/PaymentsApi';
import { getPaymentTypes } from '../api/PaymentTypesApi';

function CloseOrderForm({ order }) {
  const router = useRouter();
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [formData, setFormData] = useState({
    orderId: order.id,
    paymentTypeId: 0,
    tipAmount: '',
  });

  useEffect(() => {
    getPaymentTypes().then(setPaymentTypes);
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      orderDate: new Date(),
    };
    closeOrder(payload).then(() => router.push(`/orders/${order.id}`));
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
      <Form
        className="column"
        style={{ width: '500px' }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Select
            aria-label="Payment Type"
            name="paymentTypeId"
            onChange={handleChange}
            value={formData?.paymentTypeId}
            required
          >
            <option style={{ fontStyle: 'italic' }} value="">Payment Type</option>
            {
            paymentTypes.map((pt) => (
              <option
                key={pt.id}
                value={pt.id}
              >
                {pt.name}
              </option>
            ))
          }
          </Form.Select>
        </Form.Group>
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            name="tipAmount"
            onChange={handleChange}
            value={formData?.tipAmount}
            required
            aria-label="Amount (to the nearest dollar)"
            placeholder="Enter Tip Amount"
          />
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
        <Button style={{ justifyContent: 'center' }} className="del-btn red" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

CloseOrderForm.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    custName: PropTypes.string,
    subtotal: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.shape({
      item: PropTypes.shape({
        id: PropTypes.number,
      }).isRequired,
    })),
  }).isRequired,
};

export default CloseOrderForm;
