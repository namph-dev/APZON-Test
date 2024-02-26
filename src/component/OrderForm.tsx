import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ILineItem } from '../types';

const OrderForm: React.FC = () => {
    const [lineItems, setLineItems] = useState<ILineItem[]>([]);

    const addLineItem = () => {
        const newItem: ILineItem = {
            id: uuidv4(),
            name: 'New Item',
            quantity: 1,
            price: 0,
            total: 0,
        };
        setLineItems([...lineItems, newItem]);
    };

    const updateLineItem = (id: string, field: keyof ILineItem, value: string | number) => {
        const newLineItems = lineItems.map(item => {
            if (item.id === id) {
                const newValue = field === 'quantity' || field === 'price' ? Number(value) : value;
                return { ...item, [field]: newValue, total: field === 'price' ? item.quantity * Number(value) : item.total };
            }
            return item;
        });
        setLineItems(newLineItems);
    };


    const saveOrder = () => {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const newOrder = {
            id: Date.now(),
            items: lineItems,
            totalAmount: lineItems.reduce((sum, item) => sum + item.total, 0),
        };
        localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
        setLineItems([]);
    };

    return (
        <div>
            <h2>Create Order</h2>
            {lineItems.map((item, index) => (
                <div key={item.id}>
                    <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateLineItem(item.id, 'name', e.target.value)}
                    />
                    <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(item.id, 'quantity', e.target.value)}
                    />
                    <input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateLineItem(item.id, 'price', e.target.value)}
                    />

                    <span>{item.total}</span>
                </div>
            ))}
            <button onClick={addLineItem}>Add Item</button>
            <button onClick={saveOrder}>Save Order</button>
        </div>
    );
};

export default OrderForm;
