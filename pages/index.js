import { Image, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div style={{ padding: '20px' }} className="column">
      <p id="greeting">Hello {user.fbUser.displayName}! </p>

      <div
        className="column-center"
      >
        <Image style={{ height: '400px', width: '400px', marginBottom: '20px' }} src="/images/logoname.png" />
        <div id="home-buttons">
          <Link passHref href="/orders">
            <div className="button">

              <div className="button-top text">VIEW ORDERS</div>
              <div className="button-bottom" />
              <div className="button-base" />
            </div>
          </Link>
          <Link passHref href="/orders/new">
            <div className="button">

              <div className="button-top text">START ORDER</div>
              <div className="button-bottom" />
              <div className="button-base" />
            </div>
          </Link>
          <Link passHref href="/revenue">
            <div className="button">

              <div className="button-top text">VIEW REVENUE</div>
              <div className="button-bottom" />
              <div className="button-base" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
