import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import UserContext from '../UserContext';
import Product from './Product'; 

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const products = data.coffees;

  return (
    <div>
      <h1>Welcome, {user ? user.name : 'Guest'}</h1>
      <button onClick={() => refetch({ category: '' })}>All</button>
      <button onClick={() => refetch({ category: 'Hot' })}>Hot</button>
      <button onClick={() => refetch({ category: 'Iced' })}>Iced</button>
      <div className="products-list">
        {products.map((product) => (
          <Product key={product.id} product={product} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;