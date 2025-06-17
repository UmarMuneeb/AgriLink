import React, { useState } from 'react';
import loginimage from "../Assets/loginimage.jpg";
import logo from "../Assets/logo.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
      email,
      password,
    });
    
    const userId = response.data?.user?._id;

    if (userId) {
      localStorage.setItem("userId", userId);
      console.log("User ID stored:", userId);
      alert(response.data.message);
      navigate("/home"); 
    } else {
      alert("Login succeeded but user info is missing.");
    }
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className='w-full h-screen flex flex-row font-poppins flex-wrap'>
      <div className='sm:w-7/12 w-full'>
        <div className='w-full pl-10 py-7 flex flex-row justify-start items-center gap-5'>
          <img src={logo} width="70px" alt="logo" />
          <p className='text-3xl font-bold tracking-wide'>AgriLink</p>
        </div>
        <div className='flex w-full h-3/6 pt-20 justify-center items-center flex-col gap-5'>
          <div>
            <p className='text-xl font-poppins'>Welcome Back!</p>
            <p className='font-poppins text-2xl font-bold'>Login To Our Website</p>

            <div className='pt-4'>
              <p className='pb-1'>Email</p>
              <input
                type='email'
                placeholder='Example@gmail.com'
                className='w-64 border-2 border-black p-1 pl-2 rounded-md'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='pt-4'>
              <p className='pb-1'>Password</p>
              <input
                type='password'
                placeholder='*********'
                className='w-64 border-2 border-black p-1 pl-2 rounded-md'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='pt-4'>
              <button
                className='w-64 bg-green-500 text-white font-extrabold rounded-md border-black p-1 border-2'
                onClick={handleLogin}
              >
                Login
              </button>
            </div>

            <div className='pt-2'>
              <p className='text-sm font-bold'>
                Don’t have an account?{' '}
                <button className='text-blue-600' onClick={() => navigate('/SignUp')}>
                  SignUp
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='sm:w-5/12'>
        <div
          className="bg-cover rounded-l-2xl shadow-lg bg-no-repeat bg-center w-full h-full top-0 left-0"
          style={{
            backgroundImage: `url(${loginimage})`,
            filter: 'brightness(75%)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
