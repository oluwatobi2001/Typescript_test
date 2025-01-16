import mongoose, { Document, Schema } from 'mongoose';
import { IProduct} from '../interfaces';


export interface IProductModel extends IProduct, Document {}
const productSchema : Schema = new Schema({
productId: {
    type: String,
    unique: true,
    required: true
},
title: {
    type: String,
    required: true,
    default: ''
},
description : {
    type: String,
    default: ""
},
quantity: {
    type: Number,
    
    default: 0
}
},  { timestamps: true })

export default mongoose.model<IProductModel>('Product', productSchema);
