import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
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
            title: 'Tên Sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mã Khách hàng',
            dataIndex: 'customerCode',
            key: 'customerCode',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'productCode',
            key: 'productCode',
        },
        {
            title: 'Ngày chứng từ',
            dataIndex: 'documentDate',
            key: 'documentDate',
            render: (text: any) => text ? new Date(text).toLocaleDateString() : 'N/A',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (text: any) => `${text.toLocaleString()} VND`,
        },
        {
            title: 'Thành Tiền',
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
            key: 'Số thứ tự',
            render: (text: any, record: IOrder, index: number) => `${index + 1}`,
        },
        {
            title: 'Tổng tiền',
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
