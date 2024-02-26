export interface ILineItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface IOrder {
  id: number;
  items: ILineItem[];
  totalAmount: number;
}
