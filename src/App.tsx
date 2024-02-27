// App.js
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import OrderForm from './component/Order/OrderForm';
import BuyForm from './component/Buy/BuyForm';
import ListOrderItem from './component/Order/ListItem';
import ListBuyItem from './component/Buy/ListBuyItem';

const App: React.FC = () => {
  const [isModalOrderVisible, setIsModalOrderVisible] = useState(false);
  const [isModalBuyVisible, setIsModalBuyVisible] = useState(false);


  const showOrderModal = () => {
    setIsModalOrderVisible(true);
  };
  const showBuyModal = () => {
    setIsModalBuyVisible(true);
  };
  const handleCancel = () => {
    setIsModalOrderVisible(false);
    setIsModalBuyVisible(false);

  };

  return (
    <>
      {/* Danh sách bán hàng và tạo đơn bán hàng */}
      <div>
        <Button type="primary" onClick={showOrderModal} style={{ margin: "10px" }}>
          Đơn bán hàng
        </Button>
        <Modal title="Đơn bán hàng" visible={isModalOrderVisible} footer={null} onCancel={handleCancel} width={800}>
          <OrderForm />
        </Modal>
        <ListOrderItem />
      </div>
      {/* Danh sách nhập hàng và tạo đơn nhập hàng */}
      <div>
        <Button type="primary" onClick={showBuyModal} style={{ margin: "10px" }}>
          Đơn mua hàng
        </Button>
        <Modal title="Đơn mua hàng" visible={isModalBuyVisible} footer={null} onCancel={handleCancel} width={800}>
          <BuyForm />
        </Modal>
        <ListBuyItem />

      </div>
    </>
  );
};

export default App;
