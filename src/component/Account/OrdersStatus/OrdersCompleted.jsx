import React from 'react';
import Orders from './Orders';

const OrdersCompleted = ({ user }) => {
  return (
    <Orders user={user} status="completed" />
  );
};

export default OrdersCompleted;
