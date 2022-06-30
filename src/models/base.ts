/**
 * We use these base document interfaces because even though _id can be anything in MongoDB,
 * we always use ObjectId in our documents.
 */

 import { Document, Types } from 'mongoose'

 export interface BaseDocument extends Document {
   _id: Types.ObjectId
 }
 
 export interface BaseLeanDocument {
   _id: Types.ObjectId
 }
 