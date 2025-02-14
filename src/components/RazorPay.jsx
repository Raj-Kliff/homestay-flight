import { useState } from "react";
import { axios_instance } from '../Helpers/axios_hook.js';

const RazorPay = (props) => {
    console.log(props)
    const [loading, setLoading] = useState(false);

    const loadRazorpay = () => {
        return new Promise((resolve, reject) => {
            if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
                resolve(true); // Script already loaded
                return;
            }

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true);

        // Load Razorpay script dynamically (optional)
        const res = await loadRazorpay();
        if (!res) {
            alert("Razorpay SDK failed to load");
            return;
        }

        try {
            const randomFiveDigit = Math.floor(10000 + Math.random() * 90000);
            // Request backend to create an order
            const { data } = await axios_instance.post("/create-order", { amount: props.amount, currency: props.currency, orderNumber: randomFiveDigit });

            // Initialize Razorpay checkout
            const options = {
                key: "rzp_test_5yLvkiw1U8RJDK", // Replace with your Razorpay key
                amount: data.amount,
                currency: data.currency,
                name: "Hect India",
                description: "Test Transaction",
                order_id: data.id,
                handler: async function (response) {
                    // Send response to backend for verification
                    const verifyRes = await axios_instance.post("/verify-payment", response);

                    if (verifyRes.data.success) {
                        alert("Payment Verified Successfully!");
                    } else {
                        alert("Payment Verification Failed!");
                    }
                },
                prefill: {
                    name: props.name,
                    email: props.email,
                    contact: props.contact,
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            alert("Payment failed: " + error.message);
        }

        setLoading(false);
    };

    return (
        <button onClick={handlePayment} disabled={loading} className="bg-black px-10 py-5 rounded text-white float-left  cursor-pointer">
            {loading ? "Processing..." : `Pay ${props.currency}.${props.amount}`}
        </button>
    );
};

export default RazorPay;
