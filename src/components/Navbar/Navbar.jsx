import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser().then().catch();
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allProducts">All Products</NavLink>
      </li>
      {/* <li><NavLink to="/register">Register</NavLink></li> */}
      {user && (
        <>
          <li>
            <NavLink to="/myProducts">My Products</NavLink>
          </li>
          <li>
            <NavLink to="/myBids">My Bids</NavLink>
          </li>
        </>
      )}
    </>
  );

  // return (
  //   <div className="navbar bg-base-100 shadow-sm">
  //     <div className="navbar-start">
  //       <div className="dropdown">
  //         <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="h-5 w-5"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             {" "}
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M4 6h16M4 12h8m-8 6h16"
  //             />{" "}
  //           </svg>
  //         </div>
  //         <ul
  //           tabIndex="-1"
  //           className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
  //         >
  //           {links}
  //         </ul>
  //       </div>
  //       <a className="btn btn-ghost text-xl">
  //         Smart <span>Deals</span>
  //       </a>
  //     </div>
  //     <div className="navbar-center hidden lg:flex">
  //       <ul className="menu menu-horizontal px-1">{links}</ul>
  //     </div>
  //     <div className="navbar-end">
  //       {user ? (
  //         <a className="btn" onClick={handleDignOut}>
  //           Sign Out
  //         </a>
  //       ) : (
  //         <Link to={"/register"}>LogIn</Link>
  //       )}
  //     </div>
  //   </div>
  // );
 return (
    <div className="bg-gray-100 border-b">
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* Left - Logo */}
        <div className="navbar-start">
          <Link to="/" className="text-2xl font-bold">
            Smart
            <span className="text-purple-600">Deals</span>
          </Link>
        </div>

        {/* Center - Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6 text-sm font-medium">
            {links}
          </ul>
        </div>

        {/* Right - Auth Buttons */}
        <div className="navbar-end gap-3">

          {user ? (
            <button
              onClick={handleSignOut}
              className="px-4 py-1 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 transition"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );

};

export default Navbar;
