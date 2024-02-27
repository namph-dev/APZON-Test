import React from "react";
import Buy from "./component/Buy";
import Order from "./component/Order";

const App: React.FC = () => {
  return (
    <>
      {/* Danh sách bán hàng và tạo đơn bán hàng */}
      <Order />
      {/* Danh sách nhập hàng và tạo đơn nhập hàng */}
      <Buy />
    </>
  );
};

export default App;
