import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Input, InputNumber, Button, Table, message, Form } from 'antd';
import { ValueType } from 'rc-input/lib/interface';
import FormItem from 'antd/es/form/FormItem';

interface IOrderItem {
    id: string;
    customerCode: string;
    productCode: string;
    documentDate: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
}



const OrderForm: React.FC = () => {
    const [lineItems, setLineItems] = useState<IOrderItem[]>([
        { id: uuidv4(), customerCode: 'C001', productCode: 'P001', documentDate: '2024-02-27', name: 'Cheese - Swiss Sliced', quantity: 1, price: 1000, total: 1000 },
        { id: uuidv4(), customerCode: 'C002', productCode: 'P002', documentDate: '2024-02-27', name: 'Cheese - Swiss Sliced', quantity: 2, price: 1000, total: 2000 },
        { id: uuidv4(), customerCode: 'C003', productCode: 'P003', documentDate: '2024-02-27', name: 'Cheese - Swiss Sliced', quantity: 3, price: 1000, total: 3000 },
    ]);

    const addLineItem = () => {
        const newItem: IOrderItem = {
            id: uuidv4(),
            customerCode: '',
            productCode: '',
            name: 'New Item',
            quantity: 1,
            price: 0,
            total: 0,
            documentDate: new Date().toISOString().split('T')[0],
        };
        setLineItems([...lineItems, newItem]);
    };


    const updateLineItem = (id: string, field: keyof IOrderItem, value: string | number) => {
        const newLineItems = lineItems.map(item => {
            if (item.id === id) {
                let updatedValue = value;
                if (field === 'quantity' || field === 'price') {
                    updatedValue = Number(value);
                }
                const updatedItem = { ...item, [field]: updatedValue };

                if (field === 'quantity' || field === 'price') {
                    updatedItem.total = updatedItem.quantity * updatedItem.price;
                }
                return updatedItem;
            }
            return item;
        });
        setLineItems(newLineItems);
    };


    const saveOrder = () => {
        try {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            const newOrder = {
                id: uuidv4(),
                items: lineItems,
                totalAmount: lineItems.reduce((sum, item) => sum + item.total, 0),
            };
            localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
            setLineItems([]);
        } catch (error) {
            console.error('Failed to save order:', error);
        }
    };


    const calculateTotal = () => {
        return lineItems.reduce((sum, item) => sum + item.total, 0);
    };


    const handleAddLineItem = () => {
        const newItem: IOrderItem = {
            id: uuidv4(),
            name: '',
            customerCode: '',
            documentDate: '',
            productCode: '',
            quantity: 1,
            price: 0,
            total: 0,
        };
        setLineItems([...lineItems, newItem]);
    };

    const handleSaveOrder = () => {
        saveOrder();
        message.success('Order saved successfully!');
    };
    const firstLineItem = lineItems[0] || {};
    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            render: (text: any, record: any, index: number) => index + 1,
        },
        {
            title: 'Tên mặt hàng',
            dataIndex: 'name',
            key: 'name',
            render: (text: ValueType, record: { id: string; }) => (
                <Input
                    value={text}
                    onChange={(e) => updateLineItem(record.id, 'name', e.target.value)}
                />
            ),
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text: number, record: { id: string; }) => (
                <InputNumber
                    min={1}
                    value={text}
                    onChange={(value: number | null) => updateLineItem(record.id, 'quantity', value ?? 0)}
                />
            ),
        },
        {
            title: 'Tiền',
            dataIndex: 'price',
            key: 'price',
            render: (text: number, record: { id: string; }) => (
                <InputNumber
                    min={0}
                    formatter={value => `${value} VND`}
                    parser={value => value ? parseFloat(value.replace(' VND', '')) : 0}
                    value={text}
                    onChange={(value: number | null) => updateLineItem(record.id, 'price', value ?? 0)}
                />
            ),
        },

        {
            title: 'Thành tiền',
            dataIndex: 'total',
            key: 'total',
            render: (text: number) => `${text.toLocaleString()} VND`,
        },
        {
            title: 'Tiện ích',
            key: 'action',
            render: (text: any, record: { id: string; }) => (
                <Button
                    danger
                    onClick={() => setLineItems(lineItems.filter(item => item.id !== record.id))}
                >
                    Xóa
                </Button>
            ),
        },
    ];


    return (
        (
            <div className="order-form">
                <Form layout="vertical">
                    <div className='head-order'>
                        <FormItem label="Mã khách hàng">
                            <Input
                                value={firstLineItem.customerCode}
                                onChange={(e) => updateLineItem(firstLineItem.id, 'customerCode', e.target.value)}
                            />
                        </FormItem>
                        <FormItem label="Tên khách hàng ">
                            <Input
                                value={firstLineItem.productCode}
                                onChange={(e) => updateLineItem(firstLineItem.id, 'productCode', e.target.value)}
                            />
                        </FormItem>
                        <FormItem label="Ngày chứng từ">
                            <Input
                                value={firstLineItem.documentDate}
                                onChange={(e) => updateLineItem(firstLineItem.id, 'documentDate', e.target.value)}
                            />
                        </FormItem>
                    </div>
                    <Table dataSource={lineItems} columns={columns} rowKey="id" pagination={false} />
                    <FormItem>
                        <Button onClick={handleAddLineItem} type="dashed">
                            Thêm cột
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button onClick={handleSaveOrder} type="primary">
                            Lưu
                        </Button>
                    </FormItem>
                    <FormItem>
                        <div>
                            <div className="order-total">
                                <strong>Tổng tiền :</strong> {calculateTotal().toLocaleString()} VND
                            </div>
                        </div>
                    </FormItem>
                </Form>
            </div>
        ))
};

export default OrderForm;
