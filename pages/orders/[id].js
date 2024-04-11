import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OrderCard from '../../components/OrderCard';
import { getOrderDetails } from '../../api/OrdersApi';

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState();

  useEffect(() => {
    getOrderDetails(id).then(setOrder);
  }, [id]);

  return (
    <OrderCard order={order} />
  );
}
