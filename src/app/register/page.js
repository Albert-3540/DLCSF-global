"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [fellowship, setFellowship] = useState("");
  const [message, setMessage] = useState("");


  const handleRegister = async (e) => {
    e.preventDefault();


    if(password !== confirmPassword){
      setMessage("Passwords do not match");
      return;
    }


    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
            country,
            fellowship
          })
        }
      );


      const data = await response.json();


      if(response.ok){

        setMessage("Registration successful");

        setTimeout(()=>{
          window.location.href="/login";
        },1500);

      }else{

        setMessage(data.message || "Registration failed");

      }


    } catch(error){

      setMessage("Server connection failed");

    }

  };


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>


        <form 
          onSubmit={handleRegister}
          className="space-y-4"
        >


          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>



          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>



          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>



          <div>
            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>



          <div>
            <label className="block mb-2 font-medium">
              Country
            </label>

            <input
              type="text"
              placeholder="Enter your country"
              value={country}
              onChange={(e)=>setCountry(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>



          <div>
            <label className="block mb-2 font-medium">
              Fellowship
            </label>

            <input
              type="text"
              placeholder="DLCSF Fellowship"
              value={fellowship}
              onChange={(e)=>setFellowship(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>



          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition duration-300"
          >
            Register
          </button>


        </form>



        {message && (
          <p className="text-center mt-4 text-blue-700">
            {message}
          </p>
        )}



        <p className="text-center mt-5">
          Already have an account?{" "}

          <Link 
            href="/login" 
            className="text-blue-700 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>


      </div>

    </main>
  );
}