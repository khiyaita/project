import React, { useState, useEffect } from "react";
import { getOrders } from "../../../api/Orders";
import { getOrdersItems } from "../../../api/OrderItems";
import { getProducts } from "../../../api/Products";

const Orders = ({ user, status }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrdersAndItems = async () => {
      try {
        const ordersResponse = await getOrders();
        const productResponse = await getProducts();
        const orderItemsResponse = await getOrdersItems();
        const filteredOrders = ordersResponse.filter(
          (data) => data.user_id === user.id && (!status || data.status === status)
        );
        setOrders(filteredOrders);
        setProducts(productResponse);
        const orderItemsData = orderItemsResponse;
        setOrderItems(
          orderItemsData.filter((data) =>
            filteredOrders.map((fo) => fo.id).includes(data.order_id)
          )
        );
      } catch (error) {
        console.error("Error fetching orders and order items:", error);
      }
    };

    fetchOrdersAndItems();
  }, [user.id, status]);

  return (
    <div className="overflow-x-auto p-4 bg-white shadow-md rounded-lg ml-10">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="mb-8 p-4 border rounded-lg">
            <div className="flex mb-4">
              <div className="flex flex-col mx-3">
                <span className="font-semibold">Total:</span>
                <p className="mb-1">${order.total}</p>
              </div>
              <div className="flex flex-col mx-3">
                <span className="font-semibold">Status:</span>
                <p className="mb-1">{order.status}</p>
              </div>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Subtotal</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.filter((item) => item.order_id === order.id)
                  .length > 0 ? (
                  orderItems
                    .filter((item) => item.order_id === order.id)
                    .map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2 px-4 flex">
                          {" "}
                          <img
                            src={
                              products.filter(
                                (product) => product.id === item.product_id
                              )[0].thumbnail
                            }
                            alt=""
                            className="mr-3"
                            width={"30px"}
                            height={"30px"}
                          />
                          {
                            products.filter(
                              (product) => product.id === item.product_id
                            )[0].title
                          }
                        </td>
                        <td className="py-2 px-4">${item.price}</td>
                        <td className="py-2 px-4">{item.quantity}</td>
                        <td className="py-2 px-4">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-2 px-4">{order.status}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-2 px-4 text-center">
                      No Items
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <h2 className="text-2xl font-bold mb-4">No orders</h2>
      )}
    </div>
  );
};

export default Orders;
