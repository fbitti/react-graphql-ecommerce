import React from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';

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
    <Card className="product-card">
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        style={{
          height: 'auto', // Adjust height automatically
          width: '100%', // Full width of the card
          aspectRatio: '10 / 8' // Width to height ratio
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2">
          Ingredients: {product.ingredients.join(', ')}
        </Typography>
        <Typography variant="body1">
          Price: ${Number(product.price).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center', marginTop: 'auto' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddToCart}
          style={{ width: '40%' }} // Adjust the width as needed
        >
          Add to Cart
        </Button>
      </CardActions>
      {error && <Typography color="error">Error: {error.message}</Typography>}
    </Card>
  );
}

export default Product;
