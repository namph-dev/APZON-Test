import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { IBuy } from '../../types';

const ListBuyItem: React.FC = () => {
    const [buy, setbuy] = useState<IBuy[]>([]);

    useEffect(() => {
        const savedBuy = localStorage.getItem('buy');
        if (savedBuy) {
            setbuy(JSON.parse(savedBuy));
        }
    }, []);

    const itemColumns = [
        {
            title: 'Tên mặt hàng',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mã Nhà Cung Cấp',
            dataIndex: 'customerCode',
            key: 'customerCode',
        },
        {
            title: 'Tên Nhà Cung Cấp',
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

    const expandedRowRender = (order: IBuy) => {
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
            title: 'Số Thứ Tự',
            key: 'no',
            render: (text: any, record: IBuy, index: number) => `${index + 1}`,
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
            dataSource={buy}
            rowKey="id"
            expandedRowRender={expandedRowRender}
            expandable={{
                rowExpandable: order => order.items.length > 0,
            }}
        />
    );
};

export default ListBuyItem;
