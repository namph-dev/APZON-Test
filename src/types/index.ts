export interface IOrderItem {
  id: string;
  customerCode: string;
  productCode: string;
  documentDate: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface IOrder {
  id: number;
  items: IOrderItem[];
  totalAmount: number;
}
export interface IBuyItem {
  id: string;
  customerCode: string;
  productCode: string;
  documentDate: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface IBuy {
  id: number;
  items: IBuyItem[];
  totalAmount: number;
}
