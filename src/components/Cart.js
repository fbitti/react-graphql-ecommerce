import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

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
    skip: !userId, // Skip the query if userId is not available
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
  
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  // Safely access cartItems
  const cartItems = data && data.cart ? data.cart : [];
  console.log("Cart items:", cartItems);

  // Calculate the total cost
  const totalCost = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
    <Typography variant="h4" gutterBottom>{userName}'s Shopping Cart</Typography>
    <List>
      {cartItems.map((item) => (
        <ListItem key={item.id} divider>
          <ListItemText 
            primary={`${item.title} - $${item.price.toFixed(2)}`} 
            secondary={`Quantity: ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`}
          />
            <IconButton onClick={() => changeItemQuantity(item.id, item.quantity + 1)}>
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton onClick={() => changeItemQuantity(item.id, item.quantity - 1)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
            <IconButton onClick={() => handleRemoveItem(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total = ${totalCost.toFixed(2)}</Typography>
    </div>
  );
}

export default Cart;
