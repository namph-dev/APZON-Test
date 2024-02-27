import { Button, Modal } from "antd";
import React, { useState } from "react";
import ListOrderItem from "./ListItem";
import OrderForm from "./OrderForm";
const Order: React.FC = () => {
    const [isModalOrderVisible, setIsModalOrderVisible] = useState(false);
    const showOrderModal = () => {
        setIsModalOrderVisible(true);
    };

    const handleCancel = () => {
        setIsModalOrderVisible(false);
    };

    return (
        <>
            <div style={{ paddingLeft: "10px" }}>
                <h3 >Danh sách bán hàng </h3>
            </div>
            <Button
                type="primary"
                onClick={showOrderModal}
                style={{ margin: "10px" }}
            >
                Đơn bán hàng
            </Button>
            <Modal
                title="Đơn bán hàng"
                visible={isModalOrderVisible}
                footer={null}
                onCancel={handleCancel}
                width={800}
            >
                <OrderForm />
            </Modal>
            <ListOrderItem />
        </>
    );
};
export default Order;
