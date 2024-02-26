import React, { useState, useEffect } from 'react';
import { IOrder } from '../types';

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    return (
        <div>
            <h2>Order List</h2>
            {orders.map(order => (
                <div key={order.id}>
                    <h3>Order ID: {order.id}</h3>
                    <p>Total Amount: {order.totalAmount}</p>
                    <details>
                        <summary>Items</summary>
                        {order.items.map(item => (
                            <div key={item.id}>
                                <span>{item.name}</span>
                                <span>{item.quantity}</span>
                                <span>{item.price}</span>
                                <span>{item.total}</span>
                            </div>
                        ))}
                    </details>
                </div>
            ))}
        </div>
    );
};

export default OrderList;
