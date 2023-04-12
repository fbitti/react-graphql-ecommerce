import React, {useState} from 'react';
import { useQuery, gql } from '@apollo/client';
import Product from './components/Product';
import './App.css';

const GET_PRODUCTS = gql`
  query GetProducts {
    coffees {
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
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterProducts = (products) => {
    let filteredProducts = products;
  
    if (selectedCategory !== 'All') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
  
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, 'i');
      filteredProducts = filteredProducts.filter(
        (product) =>
          searchRegex.test(product.title) ||
          searchRegex.test(product.description) ||
          product.ingredients.some((ingredient) => searchRegex.test(ingredient))
      );
    }
  
    return filteredProducts;
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }

  return (
    <div className="App">
      <h1>Product Catalog</h1>
      <div className="filters">
        <button onClick={() => setSelectedCategory('All')}>All</button>
        <button onClick={() => setSelectedCategory('Hot')}>Hot</button>
        <button onClick={() => setSelectedCategory('Iced')}>Iced</button>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="products">
        {filterProducts(data.coffees).map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
