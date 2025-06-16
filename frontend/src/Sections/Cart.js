import React from 'react'
import { useState } from 'react'

const Cart = ({ cart, clearCart }) => {
  const [dropdown,setDropdown]=useState(null)
  const [confirmed,setConfirmed]=useState(false)
  const toggleDrop=()=>{
    setDropdown(1);
  }
  const cancelDrop=()=>{
    setDropdown(null);
  }
  const confirmorder=()=>{
    setDropdown(null);
    setConfirmed(true)
  }
  const resetOrder=()=>{
    setConfirmed(false)
    clearCart();
  }
  return (
    <>
    <div className='text-center font-bold text-4xl font-poppins py-10'>Cart</div>
    <hr className='border-t-2 border-black'></hr>
    <div className='w-full px-10 pt-5 min-h-96 bg-gray-200 font-poppins flex flex-row'>
      <div className='w-3/4 bg-white '>
        <div className='text-center bg-orange-700 font-bold text-3xl p-4 rounded-md'>
            Your Order
        </div>
        <div className='flex flex-col gap-5 p-5 flex-wrap'>
        {
          cart.map(item=>(
            <div className='flex flex-row justify-between w-full bg-gray-400 rounded-lg border border-solid p-5 gap-2 font-bold flex-wrap'>
              <div>
                <img src={item.image} height='100px' width="100px"></img>
              </div>
              <div className='w-3/12 flex items-center pl-2 md:pl-4 lg:pl-6 border rounded-md flex-wrap'>
                {item.name}
              </div>
              <div className='px-4 flex items-center border rounded-md'>
                Price: {item.price}
              </div>
              <div className='px-4 flex items-center border rounded-md'>
                Quantity: {item.quantity}
              </div>
              <div className='px-4 flex items-center border rounded-md'>
                Delivery After: {item.deliverytime} Hours
              </div>
              
            </div>
          ))
        }
        </div>
      </div>
      <div className='w-3/12 bg-white border-l-2 border-black border-solid rounded-md flex justify-center items-center flex-col'>
        <div className='w-11/12 lg:text-2xl md:text-xl flex justify-center text-md'>Total Price: <span className='font-bold pl-2'>{cart.reduce((price,item)=>price+=item.price,0)}</span></div>
        <div>
          <button className='flex text-sm font-bold mt-20 py-4 px-4 md:px-8 bg-orange-600 text-white rounded-lg' onClick={toggleDrop}>Checkout</button>
        </div>
        {
          dropdown!==null &&(
            <div className='absolute gap-2 w-60 h-60 flex justify-center items-center bg-slate-400 flex-wrap flex-col rounded-md shadow-md'>
              <div>
                <label>Enter Home adddress:</label>
              </div>
              <div>
                 <input type='Address' placeholder='Enter your Address'></input>
              </div>
              <div className='flex justify-between flex-row gap-5 pt-4'>
                <button className='bg-green-600 rounded-md shadow-lg p-2' onClick={confirmorder} >Submit</button>
                <button className='bg-red-500 rounded-md shadow-lg p-2' onClick={cancelDrop} >Cancel</button>
              </div>
            </div>
          )
        }
        {
          confirmed===true &&(
            <div className='flex fixed w-full h-full inset-0 justify-center items-center'>
              <div className='flex h-80 w-80 justify-center items-center bg-slate-400 flex-col'>
                <div className='text-3xl font-bold'>Order confirmed</div>
                <button className='bg-green-600 rounded-md shadow-lg p-5 mt-10 text-3xl' onClick={resetOrder} >Close</button>
              </div>
              </div>
              
            
          )
        }
      </div>
    </div>
    </>
  )
}

export default Cart