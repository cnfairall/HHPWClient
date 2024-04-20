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
    <div className="column-center">
      <h1 className="title">FAST STATS</h1>
      <Container id="rev-box">
        <div>
          <h4>Closed Orders: <span>
            {payments.length}</span>
          </h4>
        </div>
        <div>
          <h4>Total Revenue: <span>
            ${revenue}
          </span>
          </h4>
        </div>
        <div>
          <h4>Total Tips: <span>
            ${tips}
          </span>
          </h4>
        </div>
      </Container>
    </div>
  );
}
