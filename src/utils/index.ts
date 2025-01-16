import * as jwt from 'jsonwebtoken';
import otpMaster from '../models/otp.model';


// USED TO GENERATE JWT WITH PAYLOAD AND OPTIONS AS PARAMETERS.
// THE PAYLOAD CONTAINS THE DATA WHICH WILL BE SET AS JWT PAYLOAD.
// OPTIONS CONTAIN JWT OPTIONS
const generateJWT = function (
    payload: object = {},
    options: object = {}
): string {
    const privateKey: any = process.env.JWT_SECRETS;
    ;
    const defaultOptions: object = {
        expiresIn: '1h',
    };

    return jwt.sign(
        payload,
        privateKey,
        Object.assign(defaultOptions, options)
    );
};
const generateOtp = function (len: number): string {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < len; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }

    return OTP;
};
const verifyOtp = async function (
    userId: any,
    otp: string,
    type: string
): Promise<any> {
    let existOtp = await otpMaster.findOne({
        userId,
        otp,
        type,
    });
    const currentDate = new Date();
    if (!existOtp ||  existOtp.otpExpiration == null || existOtp.otpExpiration < currentDate ) {
        return null;
    }

    return existOtp._id;
};


export {generateJWT, generateOtp, verifyOtp}