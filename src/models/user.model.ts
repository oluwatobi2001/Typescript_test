import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../interfaces'

//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface IUserModel extends IUser, Document {}

//DEFINE USER SCHEMA
const UserSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            default: '',
        },
        lastName: {
            type: String,
            default: '',
        },
       
        dateOfBirth: {
            type: Date,
            default: null,
        },
        residence: {
            type: String,
            default: '',
        },
        
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        role: {
            type: String,
           
        },
        
    },
    { timestamps: true }
);

//EXPORT
export default mongoose.model<IUserModel>('User', UserSchema);
