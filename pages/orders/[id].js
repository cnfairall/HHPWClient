import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import moment from 'moment';
import OrderCard from '../../components/OrderCard';
import { getOrderDetails } from '../../api/OrdersApi';
import MenuSelect from '../../components/MenuSelect';

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState();

  useEffect(() => {
    getOrderDetails(id).then(setOrder);
  }, [id]);

  const formattedDate = moment(order?.payment?.orderDate).format('L');

  return (
    <div className="d-flex flex-column align-items-center justify-items-center">
      <OrderCard order={order} />
      {order?.isClosed === false ? (
        <>
          <MenuSelect />
          <Link passHref href={`/orders/close/${order?.id}`}>
            <Button>Close order</Button>
          </Link>
        </>
      ) : (
        <div className="column">
          <h6 style={{ color: 'white' }}>Order Total: ${order?.payment?.orderTotal}</h6>
          <h6 style={{ color: 'white' }}>Date Placed: {formattedDate}</h6>
        </div>
      )}
    </div>
  );
}
