import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { searchOrders } from '../../api/OrdersApi';
import OrderCard from '../../components/OrderCard';

export default function Search() {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const router = useRouter();
  const { searchInput } = router.query;

  const searchAllOrders = () => {
    searchOrders(searchInput).then(setFilteredOrders);
  };

  useEffect(() => {
    searchAllOrders();
    return () => {
      setFilteredOrders([]);
    };
  }, [searchInput]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)}
      </div>
    </>

  );
}
