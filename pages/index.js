import { Image, Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div style={{ padding: '10px' }}>
      <h4>Hello {user.fbUser.displayName}! </h4>

      <div
        className="text-center d-flex flex-column align-content-center align-items-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <Image style={{ height: '200px', width: '200px' }} src="/images/logoname.png" />
        <div id="home-buttons">
          <Button variant="danger">View Orders</Button>
          <Button variant="warning">Start Order</Button>
          <Button variant="success">View Revenue</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
