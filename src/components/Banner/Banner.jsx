import React from 'react';

const Banner = () => {
    return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-100 via-white to-cyan-100 py-24">
      
      <div className="max-w-5xl mx-auto text-center px-4">

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-800">
          Deal Your <span className="text-purple-600">Products</span>
          <br />
          In A <span className="text-purple-600">Smart</span> Way !
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
          SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!
        </p>

        {/* Search Box */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden w-full max-w-xl">
            <input
              type="text"
              placeholder="Search For Products, Categories..."
              className="flex-grow px-5 py-3 outline-none"
            />
            <button className="bg-purple-600 text-white px-5 py-3 hover:bg-purple-700 transition">
              🔍
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
            Watch All Products
          </button>

          <button className="px-6 py-3 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition">
            Post an Product
          </button>
        </div>
      </div>

      {/* Decorative Blur Effect */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-300 opacity-20 rounded-full blur-3xl"></div>

    </div>
  )
};

export default Banner;