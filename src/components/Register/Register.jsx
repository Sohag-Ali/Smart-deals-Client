import React, { use } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {

    const {signInWithGoogle} = use(AuthContext);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(result => {
            console.log(result.user);
            const newUser = {
                name: result.user.displyName,
                email: result.user.email,
                image: result.user.photoURL
            }

            fetch("http://localhost:3000/users",{
                method: 'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then(data => {
                console.log("dat after user save",data);
            })
        })
        .catch(error => {
            console.log(error) 
        })
    }

  // return (
  //   <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
  //     <h1 className="text-5xl font-bold">Reggister now!</h1>
  //     <div className="card-body">
  //       <fieldset className="fieldset">
  //         <label className="label">Email</label>
  //         <input type="email" className="input" placeholder="Email" />
  //         <label className="label">Password</label>
  //         <input type="password" className="input" placeholder="Password" />
  //         <div>
  //           <a className="link link-hover">Forgot password?</a>
  //         </div>
  //         <button className="btn btn-neutral mt-4">Register</button>
  //       </fieldset>
       
  //       <button
  //       onClick={handleGoogleSignIn}
  //       className="btn bg-white text-black border-[#e5e5e5]">
  //         <svg
  //           aria-label="Google logo"
  //           width="16"
  //           height="16"
  //           xmlns="http://www.w3.org/2000/svg"
  //           viewBox="0 0 512 512"
  //         >
  //           <g>
  //             <path d="m0 0H512V512H0" fill="#fff"></path>
  //             <path
  //               fill="#34a853"
  //               d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
  //             ></path>
  //             <path
  //               fill="#4285f4"
  //               d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
  //             ></path>
  //             <path
  //               fill="#fbbc02"
  //               d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
  //             ></path>
  //             <path
  //               fill="#ea4335"
  //               d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
  //             ></path>
  //           </g>
  //         </svg>
  //         Login with Google
  //       </button>
  //     </div>
  //   </div>
  // );

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-200">
    <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-xl border border-dashed border-blue-400">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-2">
        Register Now!
      </h1>

      <p className="text-center text-sm mb-6">
        Already have an account?{" "}
        <span className="text-purple-600 cursor-pointer hover:underline">
          Login Now
        </span>
      </p>

      {/* Form */}
      <div className="space-y-3">

        {/* Name */}
        <div>
          <label className="block text-sm mb-1 text-left ">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full input input-bordered"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1 text-left">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full input input-bordered"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm mb-1 text-left">Image URL</label>
          <input
            type="text"
            placeholder="Image URL"
            className="w-full input input-bordered"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1 text-left">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full input input-bordered"
          />
        </div>

        {/* Register Button */}
        <button className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition">
          Register
        </button>

        {/* OR */}
        <div className="text-center text-sm text-gray-500">OR</div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 py-2 border rounded-md bg-white hover:bg-gray-100 transition"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          Sign Up With Google
        </button>
      </div>
    </div>
  </div>
);
};

export default Register;
