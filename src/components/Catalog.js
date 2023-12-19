import React, { useContext, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import UserContext from '../UserContext';
import Product from './Product';
import { Typography, ToggleButtonGroup, ToggleButton, Grid } from '@mui/material';

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
  const [category, setCategory] = useState(''); // State to track the selected category

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) { // Avoid deselecting all buttons
      setCategory(newCategory);
      refetch({ category: newCategory });
    }
  };
  
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error :(</Typography>;

  const products = data.coffees;

  return (
    <div>
      <ToggleButtonGroup
        value={category}
        exclusive
        onChange={handleCategoryChange}
        aria-label="Category"
      >
        <ToggleButton value="" aria-label="All">
          All
        </ToggleButton>
        <ToggleButton value="Hot" aria-label="Hot">
          Hot
        </ToggleButton>
        <ToggleButton value="Iced" aria-label="Iced">
          Iced
        </ToggleButton>
      </ToggleButtonGroup>
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