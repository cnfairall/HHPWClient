import { Image, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div style={{ padding: '20px' }} className="column">
      <h4>Hello {user.fbUser.displayName}! </h4>

      <div
        className="column-center"
      >
        <Image style={{ height: '300px', width: '300px', marginBottom: '20px' }} src="/images/logoname.png" />
        <div id="home-buttons">
          <Link passHref href="/orders">
            <Button className="home-btn" variant="danger">View Orders</Button>
          </Link>
          <Link passHref href="/orders/new">
            <Button className="home-btn" variant="warning">Start Order</Button>
          </Link>
          <Link passHref href="/revenue">
            <Button className="home-btn" variant="success">View Revenue</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
