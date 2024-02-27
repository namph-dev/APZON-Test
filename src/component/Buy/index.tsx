import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import BuyForm from './BuyForm';
import ListBuyItem from './ListBuyItem';
const Buy: React.FC = () => {
    const [isModalBuyVisible, setIsModalBuyVisible] = useState(false);
    const showBuyModal = () => {
        setIsModalBuyVisible(true);
    };
    const handleCancel = () => {
        setIsModalBuyVisible(false);

    };

    return (
        <>
            <div style={{ paddingLeft: "10px" }}>
                <h3 >Danh sách nhập hàng </h3>
            </div>
            <Button type="primary" onClick={showBuyModal} style={{ margin: "10px" }}>
                Đơn bán hàng
            </Button>
            <Modal title="Đơn bán hàng" visible={isModalBuyVisible} footer={null} onCancel={handleCancel} width={800}>
                <BuyForm />
            </Modal>
            <ListBuyItem />
        </>
    )
}
export default Buy;
