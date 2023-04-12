import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import './App.css';
import Product from './components/Product';

const GET_PRODUCTS = gql`
  query GetProducts($category: String) {
    coffees(category: $category) {
      id
      title
      description
      ingredients
      category
      price
      image
    }
  }
`;

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { category: selectedCategory },
  });

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
    refetch({ category });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <h1>Product Catalog</h1>
      <div className="filters">
        <button onClick={() => handleButtonClick(null)}>All</button>
        <button onClick={() => handleButtonClick('Hot')}>Hot</button>
        <button onClick={() => handleButtonClick('Iced')}>Iced</button>
      </div>
      <div className="products">
        {data && data.coffees.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
