import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Button, Form, FormControl, Container, FormLabel,
} from 'react-bootstrap';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput !== '') router.push(`/search/${searchInput}`);
    setSearchInput('');
  };
  return (
    <div id="search-row">
      <Container className="d-flex justify-content-end">
        <Form id="search-bar" onSubmit={handleSubmit}>
          <FormControl type="text" placeholder="Enter customer name or phone #" size="sm" onChange={handleChange} value={searchInput} />
          <Button id="search-btn" icon="fa-solid fa-magnifying-glass" type="submit" size="lg">🔎</Button>
        </Form>
      </Container>
    </div>
  );
}
