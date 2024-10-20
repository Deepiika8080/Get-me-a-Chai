"use client"
import React, { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { fetchuser, updateProfile } from "@/actions/useractions"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify"

const Dashboard = () => {
    const { data: session } = useSession()
    const router = useRouter();
    const [form, setform] = useState({});
    useEffect(() => {
        if (!session) {
            router.push("/login");
        } else {
            getData()
        }
    }, [router, session]);

    const getData = () => {
        // let u = User.findOne
    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }
    const handlesubmit = async (e) => {

        let a = await updateProfile(e, session.user.name)
        toast('Profile Updated', {
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
            <div>
                <div >
                    <form className="max-w-sm mx-auto" action={handlesubmit}>
                        <div className="mb-5 pt-[2rem]">
                            <label htmlFor="name" className="block mb-2 text-md font-bold text-white dark:text-white">Name</label>
                            <input type="text" id="name" name="name" value={form.name ? form.name : " "} onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:
                     placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your name" required />
                        </div>
                        <div className="mb-5 ">
                            <label htmlFor="email" className="block mb-2 text-md font-bold text-white dark:text-white"> Email </label>
                            <input type="email" onChange={handlechange} name="email" value={form.email ? form.email : " "} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:
                    ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder
                    -gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com"
                                required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-md font-bold text-white dark:text-white"> Username </label>
                            <input type="password" onChange={handlechange} name="password" value={form.password ? form.password : " "} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:
                     placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="profilepic" className="block mb-2 text-md font-bold text-white dark:text-white"> Profile Picture </label>
                            <input type="text" onChange={handlechange} name="profilepic" value={form.profilepic ? form.profilepic : " "} id="profilepic"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:place
                     holder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="coverpic" className="block mb-2 text-md font-bold text-white dark:text-white"> Cover Picture </label>
                            <input type="text" onChange={handlechange} name="coverpic" value={form.coverpic ? form.coverpic : " "} id="coverpic"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:place
                     holder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-5 ">
                            <label htmlFor="razorpayid" className="block mb-2 text-md font-bold text-white dark:text-white">RazorPay Id </label>
                            <input type="text" onChange={handlechange} id="razorpayid" name="razorpayid" value={form.razorpayid ? form.razorpayid : " "} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:place
                     holder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-5 pb-[2rem]">
                            <label htmlFor="razorpaysecret" className="block mb-2 text-md font-bold text-white dark:text-white"> RazorPay Secret</label>
                            <input type="text" onChange={handlechange} id="razorpaysecret" name="razorpaysecret" value={form.razorpaysecret ? form.razorpaysecret : " "} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:place
                     holder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <p id="helper-text-explanation" className="my-2 text-sm pb-10 text-[rgb(182,185,190,1)] dark:text-gray-400">We’ll never share your details.
                            Read our <a href="#" className="font-medium text-white hover:underline dark:text-blue-500">Privacy Policy</a>.</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Dashboard;