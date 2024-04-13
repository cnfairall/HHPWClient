import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function OrderItem({ item }) {
  return (
    <Card className="order-item">
      <h6>{item?.item.itemName}</h6>
      <div>${item?.item.itemPrice}</div>
    </Card>
  );
}

OrderItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    orderId: PropTypes.number,
    itemId: PropTypes.number,
    item: PropTypes.shape({
      id: PropTypes.number,
      itemName: PropTypes.string,
      itemPrice: PropTypes.number,
    }).isRequired,
  }).isRequired,
};
