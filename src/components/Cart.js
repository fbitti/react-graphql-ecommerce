import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

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

const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($userId: ID!, $productId: ID!, $quantity: Int!) {
    updateCartItem(userId: $userId, productId: $productId, quantity: $quantity) {
      id
      quantity
    }
  }
`;

const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($userId: ID!, $productId: ID!) {
    removeCartItem(userId: $userId, productId: $productId)
  }
`;

function Cart({ userId, userName }) {
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    variables: { userId },
  });

  // Define useMutation hooks
  const [updateCartItem] = useMutation(UPDATE_CART_ITEM);
  const [removeCartItem] = useMutation(REMOVE_CART_ITEM);


  // Handle increment and decrement
  const changeItemQuantity = (productId, quantity) => {
    updateCartItem({ variables: { userId, productId, quantity } })
      .then(() => refetch());
  };

  // Handle item removal
  const handleRemoveItem = (productId) => {
    removeCartItem({ variables: { userId, productId } })
      .then(() => refetch());
  };

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
            {item.title} - ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
            <button onClick={() => changeItemQuantity(item.id, item.quantity + 1)}>+1</button>
            <button onClick={() => changeItemQuantity(item.id, item.quantity - 1)}>-1</button>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <ul>Total = ${totalCost.toFixed(2)}</ul>
    </div>
  );
}

export default Cart;
