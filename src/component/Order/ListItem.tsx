import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { IOrder } from '../../types';

const ListOrderItem: React.FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    const itemColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Customer Code',
            dataIndex: 'customerCode',
            key: 'customerCode',
        },
        {
            title: 'Product Code',
            dataIndex: 'productCode',
            key: 'productCode',
        },
        {
            title: 'Document Date',
            dataIndex: 'documentDate',
            key: 'documentDate',
            render: (text: any) => text ? new Date(text).toLocaleDateString() : 'N/A',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text: any) => `${text.toLocaleString()} VND`,
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (text: any) => `${text.toLocaleString()} VND`,
        },
    ];

    const expandedRowRender = (order: IOrder) => {
        return (
            <Table
                columns={itemColumns}
                dataSource={order.items}
                pagination={false}
                rowKey="id"
            />
        );
    };

    const columns = [
        {
            title: 'No.',
            key: 'no',
            render: (text: any, record: IOrder, index: number) => `${index + 1}`,
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (text: number) => `${text.toLocaleString()} VND`,
        },];

    return (
        <Table
            columns={columns}
            dataSource={orders}
            rowKey="id"
            expandedRowRender={expandedRowRender}
            expandable={{
                rowExpandable: order => order.items.length > 0,
            }}
        />
    );
};

export default ListOrderItem;
