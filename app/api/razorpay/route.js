import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDb";
import User from "@/app/models/User";

export const Post = async (req) => {
    await connectDB();
    let body = await req.formData()
    body = Object.fromEntries(body)

    // check if razorpay id is present on our server 
    let p = Payment.findOne({oid:body.razorpay_order_id})

    if(!p) {
        return NextResponse.json({success: false,message:"Order Id not found"});
    }
    // fetch the secret of the user who is getting the payment
    let user = await User.findOne({username: p.to_user})
    const secret = user.razorpaysecret;
    // vetify the payment
    let xx = validatePaymentVerification({"order_id":body.razorpay_order_id, "razorpay_payment_id"
         : body.razorpay_payment_id},body.razorpay_signature, secret)
     
    if(xx) {
        // update the payment status 
        const updatedPayment = await Payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:true},{new:true})
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/${updatedPayment.to_user}?paymentdone:true`)
    }else {
        return NextResponse.json({success: false,message:"Payment verification failed :)"});
        
    }
}