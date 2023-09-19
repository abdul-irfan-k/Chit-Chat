import React from 'react'

const Login = () => {
  return (
    <div className="flex flex-col w-[100%] p-10  sm:p-20  md:w-[50%] md:p-10 lg:w-[40%]">
    <div className="flex items-center gap-5">
      <div></div>
      <div className="font-bold text-xl text-slate-950 dark:text-slate-50 md:text-2xl xl:text-4xl">
        CHITCHAT
      </div>
    </div>

    <div className="mt-5 font-medium text-slate-950 text-base  dark:text-slate-50 md:text-lg">
      Hello Everyone. We are Chidlren
    </div>
    <div className="font-light text-slate-800 text-sm dark:text-slate-200 md:text-base ">
      Welcome chitchat please login account
    </div>

 
    <div className="mt-5 flex flex-col gap-3">
      <div className="font-medium text-slate-900 text-sm dark:text-slate-100 md:text-xs ">
        Email Address
      </div>
      <input
        type="text"
        className="px-3 py-2 border-2 border-stone-300  text-base "
      />
    </div>
    <div className="mt-5 flex flex-col gap-3">
      <div className="font-medium text-slate-900 text-sm dark:text-slate-100 md:text-xs ">
        Passwords
      </div>
      <input
        type="text"
        className="px-3 py-2 border-2 border-stone-300  text-base "
      />
    </div>

    <div className="mt-10 gap-10 text-lg flex items-center justify-center">
      <div className="px-6 py-3 rounded-md bg-blue-500 text-slate-950   dark:text-slate-50">
        Signup
      </div>
      <div className="px-6 py-3 rounded-md  bg-stone-900 text-slate-50    dark:text-slate-50">
        Login
      </div>
    </div>

    <div className="mt-10 text-center text-slate-950 dark:text-slate-50">
      Or connect with
    </div>
    <div className="mt-10 gap-5 flex items-center justify-center">
      <div className="w-10 flex items-center justify-center bg-red-500 aspect-square rounded-full ">
        d
      </div>
      <div className="w-10 flex items-center justify-center bg-red-500 aspect-square rounded-full ">
        d
      </div>
      <div className="w-10 flex items-center justify-center bg-red-500 aspect-square rounded-full ">
        d
      </div>
    </div>

    <div className="mt-10 text-center">term and policy</div>
  </div>
  )
}

export default Login