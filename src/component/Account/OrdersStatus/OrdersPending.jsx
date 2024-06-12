import React from 'react';
import Orders from './Orders';

const OrdersPending = ({ user }) => {
  return (
    <Orders user={user} status="pending" />
  );
};

export default OrdersPending;
