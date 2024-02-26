import React from 'react';
import OrderForm from './component/OrderForm';
import OrderList from './component/ListItem';

const App: React.FC = () => {
  return (
    <div>
      <OrderForm />
      <OrderList />
    </div>
  );
};

export default App;
