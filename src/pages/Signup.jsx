import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'; // Use `useNavigate` instead of `useHistory`

const SignupForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);  // State for terms checkbox
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Use `useNavigate` for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!firstName || !lastName || !email || !mobile || !address || !country || !password) {
            setError('All fields are required');
            return;
        }

        if (!isChecked) {
            setError('You must agree to the terms and conditions');
            toast.error('You must agree to the terms and conditions');
            return;
        }

        setError('');

        const userData = {
            first_name: firstName,
            last_name: lastName,
            email,
            mobile,
            address,
            country,
            password,
        };

        try {
            const response = await axios.post('http://192.168.1.32:3005/api/signup', userData);

            if (response.data.message === "User already exists") {
                toast.error('User already exists! Please try another email or mobile number.');
            } else if (response.data.message === "User created successfully") {
                toast.success('Signup successful!');

                // Optionally, if the backend returns a token, you can store it
                // if (response.data.token) {
                //   localStorage.setItem('authToken', response.data.token);
                // }

                // Navigate to the login page after successful signup
                navigate('/login');  // Use `navigate()` instead of `history.push()`
            }
        } catch (err) {
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://hips.hearstapps.com/hmg-prod/images/gettyimages-1677184597.jpg')`,
                    zIndex: -1, // Set background to be behind content
                }}
            ></div>

            {/* Signup Title */}
            <h2 className="absolute top-5 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-center text-white z-10">
                Sign-up
            </h2>

            {/* Form container */}
            <div className="flex items-center justify-center min-h-screen pt-20  lg:pt-10 lg:px-10">
                <div className="bg-black bg-opacity-30 px-8 py-3 rounded-lg shadow-lg w-11/12 sm:w-9/12 md:w-7/12 lg:w-7/12 xl:w-7/12 z-10 opacity-70">

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="mb-2">
                                <label htmlFor="first_name" className="block text-sm font-semibold text-white">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-black bg-white"
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="last_name" className="block text-sm font-semibold text-white">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-black bg-white"
                                    required
                                />
                            </div>

                            {/* Email and Mobile */}
                            <div className="mb-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-black bg-white"
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="mobile" className="block text-sm font-semibold text-white">
                                    Mobile
                                </label>
                                <input
                                    type="text"
                                    id="mobile"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-black bg-white"
                                    required
                                />
                            </div>

                            {/* Address and Country */}
                            <div className="mb-2">
                                <label htmlFor="address" className="block text-sm font-semibold text-white">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-black bg-white"
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="country" className="block text-sm font-semibold text-white">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-black bg-white"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-black bg-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Terms and Conditions Checkbox */}
                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="terms" className="text-sm text-white">
                                I agree to the <a href="/terms" className="text-blue-400">terms and conditions</a>.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-teal-700"
                        >
                            Signup
                        </button>
                    </form>

                    {/* Link to Login page */}
                    <div className="mt-4 text-center text-white">
                        <p>
                            Already have an account? <Link to="/login" className="text-blue-400">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default SignupForm;
