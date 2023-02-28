import { BaseDocument, Timestamps } from './basic';

export enum OrderStatus {
  PENDING = 'pending',
  DELIVERED = 'delivered',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}
export interface OrderFields {
  userEmail: string;
  itemName: string;
  itemPrice: string; //https://husobee.github.io/money/float/2016/09/23/never-use-floats-for-currency.html
  itemsQuantity: number;
  status: OrderStatus;
}

export type IOrder = OrderFields & Timestamps;

export type Order = OrderFields & BaseDocument;
