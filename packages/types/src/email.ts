import { Types } from 'mongoose';
import { BaseDocument, BaseLeanDocument, Timestamps } from './basic';

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
export interface IEmail extends EmailFields, BaseLeanDocument {
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IEmailWithOrder extends IEmail {
  orderId: string | Types.ObjectId;
}

export type Email = EmailWithOrder & BaseDocument;
