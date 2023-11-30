// src/Product.js
import React from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const ADD_TO_CART = gql`
  mutation AddToCart($userId: ID!, $productId: ID!, $quantity: Int!) {
    addToCart(userId: $userId, productId: $productId, quantity: $quantity) {
      id
    }
  }
`;

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

function Product({ product, user }) {
  const [addToCart, { error }] = useMutation(ADD_TO_CART);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please login to add items to your cart');
      return;
    }
  
    try {
      console.log("Adding to cart:", product.id);

      await addToCart({
        variables: { userId: user.id, productId: product.id, quantity: 1 },
        refetchQueries: user ? [{ query: GET_CART, variables: { userId: user.id } }] : [],
      });
      // Additional logic if needed after successful addition
    } catch (e) {
      console.error('Error adding to cart:', e.message);
    }
  };

  return (
    <div className="product">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Ingredients: {product.ingredients.join(', ')}</p>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart}>+</button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default Product;
