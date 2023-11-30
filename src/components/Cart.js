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

function Cart({ userId, userName }) {
  const { loading, error, data } = useQuery(GET_CART, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const cartItems = data.cart;
  console.log("Cart items:", cartItems);

  // Calculate the total cost
  const totalCost = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      <h1>{userName}'s Shopping Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} - ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <ul>Total = ${totalCost.toFixed(2)}</ul>
    </div>
  );
}

export default Cart;
