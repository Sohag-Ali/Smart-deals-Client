import React, { use } from "react";
import Product from "../Product/Product";

const RecentProduct = ({ latestProductPromise }) => {
  const products = use(latestProductPromise);
  console.log(products);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-10">
        Recent <span className="text-purple-600">Products</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default RecentProduct;
