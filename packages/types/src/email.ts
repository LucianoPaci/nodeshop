import { Types } from 'mongoose';
import { BaseDocument, Timestamps } from './basic';

// Create data
export interface EmailFields {
  from: string;
  to: string;
  subject?: string;
  html: string;
}

export interface EmailWithOrder extends EmailFields {
  orderId: string | Types.ObjectId;
}

export interface IEmailsFilter {
  from?: string;
  to?: string;
}

// Fetch data
export type IEmail = EmailFields & Timestamps;

export interface IEmailWithOrder extends IEmail {
  orderId: string | Types.ObjectId;
}

export type Email = EmailWithOrder & BaseDocument;
