import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);  
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   
  
    // Validate form fields
    if (!email || !password) {
      setError('Email and password are required');
      toast.error('Email and password are required');
      return;
    }
  
    if (!isChecked) {
      setError('You must agree to the terms and conditions');
      toast.error('You must agree to the terms and conditions');
      return;
    }
  
    setError('');
  
    const userData = { email, password };
  
    try {
      const response = await axios.post('http://192.168.1.32:3005/api/login', userData);
  
      // Check if the response has a token
      if (response.data.token) {
        // Show success toast
        toast.success('Login successful!');
        
        // Store the token in local storage
        localStorage.setItem('authToken', response.data.token);
        
        // You can redirect the user or perform additional actions here
      } else {
        // If no token is present, show error toast
        toast.error('Invalid email or password');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again later.');
    }
  };
  

  return (
    <div className="relative min-h-screen">
      
      {/* Flexbox Container with Image and Form */}
      <div className="flex min-h-screen">
        
        {/* Left side (Image) */}
        <div className="w-2/3 hidden md:block bg-cover bg-center"
          style={{
            backgroundImage: `url('https://thumbs.dreamstime.com/b/traveling-luggage-airport-terminal-building-jet-plane-fly-flying-over-urban-scene-81373668.jpg')`
          }}>
        </div>
        
        {/* Right side (Form) */}
        <div className="w-full md:w-1/3 flex items-center justify-center bg-white bg-opacity-30">
          <div className="p-8 w-11/12 sm:w-9/12 md:w-12/12 lg:w-6/12 xl:w-12/12">
            
            {/* Center the Logo Image */}
            <div className="flex items-center justify-center h-full mb-6">
              {/* <img 
                src="https://api.vedaacademy.in/storage/1739952199843-75412582-logo.png" 
                alt="Logo" 
                className="max-w-full max-h-full object-contain" 
              /> */}
              <h1 className='font-bold text-3xl'>Login</h1>
            </div>

            {/* Display error message if any */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">

                {/* Email Input */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold text-black">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md text-black bg-white"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-semibold text-black">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md text-black bg-white"
                    required
                  />
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
                  <label htmlFor="terms" className="text-sm text-black">
                    I agree to the <a href="/terms" className="text-blue-400">terms and conditions</a>.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-teal-700"
              >
                Login
              </button>

              {/* Signup Link */}
              <div className="mt-4 text-center text-black">
                <p>
                  Don't have an account? <Link to="/signup" className="text-blue-400">Sign up now</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
