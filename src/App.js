import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Product from './components/Product';
import './App.css';

const GET_PRODUCTS = gql`
  query GetHotCoffees {
    coffees {
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

function App() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }

  return (
    <div className="App">
      <h1>Product Catalog</h1>
      <div className="products">
        {data.coffees.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
