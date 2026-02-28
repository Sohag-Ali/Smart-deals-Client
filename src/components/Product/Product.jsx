import React from "react";
import { Link } from "react-router";

const Product = ({ product }) => {
  const { _id, title, price_min, price_max, image } = product;
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm hover:shadow-lg transition duration-300">
      {/* Image */}
      <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        {/* Price */}
        <p className="text-purple-600 font-medium">
          $ {price_min} - {price_max}
        </p>

        {/* Button */}
        <Link
          to={`/productDetails/${_id}`}
          className="block w-full mt-3 py-2 text-center border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Product;
