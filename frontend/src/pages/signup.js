import React, { useState } from 'react';
import loginimage from "../Assets/loginimage.jpg";
import logo from "../Assets/logo.jpg";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        navigate('/login');
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className='w-full h-screen flex flex-row font-poppins'>
      <div className='sm:w-7/12 w-full'>
        <div className='w-full pl-10 py-6 flex flex-row justify-start items-center gap-5'>
          <img src={logo} width="70px" alt="logo" />
          <p className='text-3xl font-bold tracking-wide'>AgriLink</p>
        </div>

        <div className='flex w-full h-3/6 pt-24 justify-center items-center flex-col gap-5'>
          <div>
            <p className='text-xl'>Welcome!</p>
            <p className='text-2xl font-bold'>Sign Up To Our Website</p>

            <div className='pt-4'>
              <p className='pb-1'>Email</p>
              <input type='email' placeholder='Example@gmail.com'
                className='w-64 border-2 border-black p-1 pl-2 rounded-md'
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='pt-4'>
              <p className='pb-1'>Password</p>
              <input type='password' placeholder='*********'
                className='w-64 border-2 border-black p-1 pl-2 rounded-md'
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className='pt-4'>
              <p className='pb-1'>Confirm Password</p>
              <input type='password' placeholder='*********'
                className='w-64 border-2 border-black p-1 pl-2 rounded-md'
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            {error && <p className="text-red-600 pt-2">{error}</p>}

            <div className='pt-4'>
              <button className='w-64 bg-green-500 text-white font-extrabold rounded-md border-black p-1 border-2'
                onClick={handleSignup}>SignUp</button>
            </div>

            <div className='pt-2'>
              <p className='text-sm font-bold'>Already a user?
                <button className='text-blue-600' onClick={() => navigate('/Login')}> Login</button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='sm:w-5/12 '>
        <div className="bg-cover rounded-l-2xl shadow-lg bg-no-repeat bg-center w-full h-full"
          style={{ backgroundImage: `url(${loginimage})`, filter: 'brightness(75%)' }}></div>
      </div>
    </div>
  );
};

export default Signup;