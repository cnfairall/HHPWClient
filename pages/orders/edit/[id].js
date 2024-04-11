import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OrderForm from '../../../components/OrderForm';
import { getOrderDetails } from '../../../api/OrdersApi';

export default function EditOrder() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getOrderDetails(id).then(setEditItem);
  }, [id]);

  return (
    <OrderForm order={editItem} />
  );
}
