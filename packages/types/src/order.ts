import { BaseDocument, Timestamps } from './basic';
export interface OrderFields {
  userEmail: string;
  itemName: string;
  itemPrice: string; //https://husobee.github.io/money/float/2016/09/23/never-use-floats-for-currency.html
  itemsQuantity: number;
}

export type IOrder = OrderFields & Timestamps;

export type Order = OrderFields & BaseDocument;
