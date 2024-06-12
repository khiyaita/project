import React from 'react';
import Orders from './Orders';

const OrdersShipped = ({ user }) => {
  return (
    <Orders user={user} status="shipped" />
  );
};

export default OrdersShipped;
