import { Image, Navbar } from 'react-bootstrap';

export default function Footer() {
  return (
    <Navbar fixed="bottom" id="footer">
      <Image
        src="/images/spin.jpg"
        style={{ width: '30vw', height: '150px'}}
      />
    </Navbar>
  );
}
