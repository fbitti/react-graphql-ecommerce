import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import UserContext from '../UserContext';
import Product from './Product';
import { Grid, Button, Typography } from '@mui/material';

const GET_COFFEES = gql`
  query GetCoffees($category: String) {
    coffees(category: $category) {
      id
      title
      description
      image
      ingredients
      price
      category
    }
  }
`;

function Catalog() {
  const user = useContext(UserContext);
  const { loading, error, data, refetch } = useQuery(GET_COFFEES);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error :(</Typography>;

  const products = data.coffees;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Welcome, {user ? user.name : 'Guest'}</Typography>
      <Button onClick={() => refetch({ category: '' })}>All</Button>
      <Button onClick={() => refetch({ category: 'Hot' })}>Hot</Button>
      <Button onClick={() => refetch({ category: 'Iced' })}>Iced</Button>
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Product product={product} user={user} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Catalog;