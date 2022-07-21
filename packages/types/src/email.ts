import { Types } from 'mongoose';
import { BaseDocument } from './basic';

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

export type Email = EmailWithOrder & BaseDocument;
