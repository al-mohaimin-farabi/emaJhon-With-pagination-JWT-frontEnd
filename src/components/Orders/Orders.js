import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import useAuth from "../../hooks/useAuth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const history = useHistory();
  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user.email}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("idToken")}` },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          history.push("/login");
        }
      })
      .then((data) => setOrders(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>You have placed : {orders.length}</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.name}: {order.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
