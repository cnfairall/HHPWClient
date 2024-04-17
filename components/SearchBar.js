import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';

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
    <Form className="spread" onSubmit={handleSubmit}>
      <FormGroup>
        <FormLabel style={{ color: 'white' }}>Search Orders</FormLabel>
        <FormControl id="search-bar" type="text" placeholder="Enter customer name or phone" size="sm" onChange={handleChange} value={searchInput} />
      </FormGroup>
      <Button icon="fa-solid fa-magnifying-glass" type="submit" size="sm" variant="dark">🔎</Button>
    </Form>
  );
}
