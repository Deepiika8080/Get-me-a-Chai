"use client"
import React, { useEffect, useState } from "react"
import Script from "next/script"
import { fetchuser, fetchPayments, initiate } from "@/actions/useractions"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify"
import { useRouter } from "next/navigation"

export function PaymentPage({ username }) {
    // const { data: session } = useSession()
    const [paymentform, setpaymentform] = useState({});
    const [currentUser, setcurrentUser] = useState({})
    const [Payments, setPayments] = useState([])
    const searchParams = useSearchParams();
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if(searchParams.get("paymentdone") == "true") {
            toast('Thanks for your Donation 😍', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }
        router.push(`/${username}`);
    })
    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = fetchPayments(username);
        setPayments(dbpayments)
    }


    const pay = async (amount) => {
        // Get the orderid
        let a = await initiate(amount, username, paymentform)
        let order_id = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "GetMeaChai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }

        }

        var rzp1 = new Razorpay(options);

        rzp1.open();
    }
   
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className=" cover w-full relative">
                <img className="object-cover w-full h-[350]" src={currentUser.coverpic} alt="banner" />
                <div className="absolute right-[45%] -bottom-14 rounded-full size-32 border-gray-800 overflow-hidden">
                    <img src={currentUser.profilepic} className="rounded-full size-32 object-cover"
                        height={150} width={150} alt="profile" />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center text-center my-20 gap-1">
                <div className="font-bold text-lg"> @{username} </div>
                <div className="text-sm">Let's help {username} get a chai</div>
                <div className="text-sm">{Payments.length} Payments. {currentUser.name} is raising funds for a chai.
                     Let's help him to reach his goal </div>
            </div>
            <div className="payment flex justify-center w-[80%] ml-28 mb-4">
                <div className="paymentlist w-1/2 bg-gray-800">
                    {/* show list of all supporters as a leaderboard */}
                    <h2 className="text-center text-lg font-bold ">Supporters</h2>
                    <ul className="p-8">
                        {Payments.length == 0 && <li> No Payments yet 😭</li>}
                        {Payments.map((P, i) => {
                            // <i class="fa-solid fa-circle-user"></i>
                            return <li key={i}>
                                <img src="" alt="" />
                                <span>
                                    {P.name} donated with a {P.message}"I Support You with lots of love ❤️"
                                </span>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="paymentlist w-1/2 bg-gray-900 ">
                    <h1 className="font-bold text-lg text-center my-5 ">Make a Payment</h1>
                    <form className="max-w-sm mx-auto ">

                        <input type="text" id="name" onChange={handleChange} name="name" value={paymentform.name} aria-describedby="helper-text-explanation" className="bg-gray-50 border mb-3 border-gray
                        -300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-
                        gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:
                        " placeholder="Enter Your name" />
                        <input type="text" id="message" onChange={handleChange} name="message" value={paymentform.message} aria-describedby="helper-text-explanation" className="bg-gray-50 mb-3 border border-gray
                        -300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-
                        gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:
                        " placeholder="message" />
                        <input type="number" id="amount" onChange={handleChange} name="amount" value={paymentform.amount} aria-describedby="helper-text-explanation" className="bg-gray-50  border border-gray
                        -300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-
                        gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:
                        " placeholder="amount" />
                        <button type="button" className="text-white  mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l
                            focus:ring-4 focus:outline-none focus:ring-purple-200
                     dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:from-purple-100"
                            disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4}
                            onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} >Pay</button>
                        <div className="flex justify-evenly mt-2">
                            <button type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-
                        gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg
                        text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => pay(10)}>Pay ₹100</button>
                            <button type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-
                        gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg
                         text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => pay(20)}>Pay ₹300</button>
                            <button type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-
                        gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg
                         text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => pay(30)}>Pay ₹200</button>

                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}