import React, {useState} from 'react';
import { useQuery, gql } from '@apollo/client';
import Product from './components/Product';
import './App.css';

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
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { category: selectedCategory },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }

  return (
    <div className="App">
      <h1>Product Catalog</h1>
      <div className="filters">
        <button onClick={() => setSelectedCategory(null)}>All</button>
        <button onClick={() => setSelectedCategory('Hot')}>Hot</button>
        <button onClick={() => setSelectedCategory('Iced')}>Iced</button>
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
