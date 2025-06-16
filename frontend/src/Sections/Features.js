import React from 'react'
import store from '../Assets/store.png'
import chart from "../Assets/chart.png"
import packagesearch from "../Assets/package-search.png"
const Features = () => {
  return (
    <div>
        <div className='pl-10 font-bold text-3xl font-poppins py-10'>Features</div>
         <div className='w-10/12 m-auto flex flex-row items-center justify-center gap-10 flex-wrap'>
            <div className='flex flex-col w-1/4 h-50 bg-green-600 text-white px-3 py-5 rounded-xl shadow-lg min-w-52'>
                <div>
                    <h2 className='font-bold text-xl'>Direct Market Access</h2>
                </div>
                <div className='flex flex-row justify-between pt-2'>
                    <div className='w-3/4'>
                        <p className='text-sm '>Connect with trusted buyers and sell your produce at fair prices.</p>
                    </div>
                    <div>
                        
                        <img src={store} width={"30px"} height={"30px"} className='pt-2 invert'></img>
                    </div>
                </div>
            </div>
              <div className='flex flex-col w-1/4 h-50 bg-green-600 text-white px-3 py-5 rounded-xl shadow-lg min-w-52'>
                <div>
                    <h2 className='font-bold text-xl'>Tools & Resources</h2>
                </div>
                <div className='flex flex-row justify-between pt-2'>
                    <div className='w-3/4'>
                        <p className='text-sm '>Explore high-quality seeds, fertilizers, and farming tools with verified reviews.</p>
                    </div>
                    <div>
                        
                        <img src={packagesearch} width={"30px"} height={"30px"} className='pt-2 invert'></img>
                    </div>
                </div>
            </div>
             <div className='flex flex-col w-1/4 h-50 bg-green-600 text-white px-3 py-5 rounded-xl shadow-lg min-w-52'>
                <div>
                    <h2 className='font-bold text-xl'>Crop Price Trends</h2>
                </div>
                <div className='flex flex-row justify-between pt-2'>
                    <div className='w-3/4'>
                        <p className='text-sm '>Monitor daily price changes for popular crops to sell at the right time.</p>
                    </div>
                    <div>
                        <img src={chart} width={"30px"} height={"30px"} className='pt-2 invert'></img>
                    </div>
                </div>
            </div>
            
        </div>
        <div className='mt-24 flex justify-center items-center py-20 bg-gray-200 '>
            <div className='w-2/4 flex flex-col items-center justify-center'>
                <div className='font-bold text-2xl text-center'>
                    <p>Follow the Latest Trends</p>
                </div>
                <div className='text-lg text-slate-600'>
                    <p>With our NewsLetter</p>
                </div>
                <div className='flex justify-center'>
                    <input type='email' className='w-52 p-2 border-2 border-gray-500' placeholder='Example@gmail.com'></input>
                    <button className='bg-green-600 text-sm ml-2 rounded-md p-1 text-white hover:bg-green-400'>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features