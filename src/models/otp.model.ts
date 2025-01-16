
import mongoose, { Document, Schema } from 'mongoose';
import { IOtp } from '../interfaces';


//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface IOtpModel extends IOtp, Document {}

//DEFINE OTP SCHEMA
const OtpSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        type: {
            type: String,
            default: 'Verification'
        },
        otp: {
            type: String,
            required: true,
        },
        otpExpiration: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

//EXPORT
export default mongoose.model<IOtpModel>('Otp', OtpSchema);
