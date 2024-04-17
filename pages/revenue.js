import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getRevenue, getPayments } from '../api/PaymentsApi';

export default function ViewRevenue() {
  const [revenue, setRevenue] = useState('');
  const [payments, setPayments] = useState([]);
  const [tips, setTips] = useState('');

  const getTips = () => {
    let totalTips = 0;
    const tipAmounts = payments.map((payment) => payment.tipAmount);
    for (let i = 0; i < tipAmounts.length; i++) {
      totalTips += tipAmounts[i];
    }
    setTips(totalTips);
  };

  useEffect(() => {
    getRevenue().then(setRevenue);
    getPayments().then(setPayments).then(getTips);
  }, []);

  return (
    <Container style={{ backgroundColor: 'white', margin: '20px' }}>
      <div>
        <h4>Closed Orders:</h4>
        <h3>{payments.length}</h3>
      </div>
      <div>
        <h4>Total Revenue:</h4>
        <h3>${revenue}</h3>
      </div>
      <div>
        <h4>Total Tips:</h4>
        <h3>${tips}</h3>
      </div>
    </Container>
  );
}
