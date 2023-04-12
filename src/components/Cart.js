import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CART = gql`
  query GetCart($userId: ID!) {
    cart(userId: $userId) {
      id
      title
      price
      quantity
    }
  }
`;

function Cart({ userId }) {
  const { loading, error, data } = useQuery(GET_CART, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const cartItems = data.cart;

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;