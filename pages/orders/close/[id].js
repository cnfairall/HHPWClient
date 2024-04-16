import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CloseOrderForm from '../../../components/CloseOrderForm';
import { getOrderDetails } from '../../../api/OrdersApi';
import OrderItem from '../../../components/OrderItem';

export default function CloseOrder() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState({});
  useEffect(() => {
    getOrderDetails(id).then(setOrder);
  }, []);
  return (
    <div className="column-center">
      <Container id="order-summ">
        <h5>{order?.custName}</h5>
        {order?.items?.map((item) => <OrderItem item={item} key={item.id} />)}
        <h6>Subtotal: ${order?.subtotal}</h6>
      </Container>
      <CloseOrderForm order={order} />
    </div>
  );
}
