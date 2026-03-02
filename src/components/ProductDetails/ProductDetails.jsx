import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const product = useLoaderData();
  const [bids, setBids] = useState([]);
  const bidModalRef = useRef(null);
  const { user } = useContext(AuthContext);

  const {
    _id,
    title,
    image,
    price_min,
    price_max,
    description,
    condition,
    usage_time,
    seller_name,
    seller_email,
    location,
    category,
    posted_date,
  } = product;

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${_id}`,{
      headers: {
        authorization : `Bearer ${user.accessToken}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for product", data);
        setBids(data);
      });
  }, [_id, user]);

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const image = e.target.image.value;
    const bid = e.target.bid.value;
    const contract = e.target.contract.value;
    console.log(_id, name, email, bid);

    const newBids = {
      product: _id,
      buyer_name: name,
      buyer_image: image,
      buyer_email: email,
      bid_price: bid,
      buyer_contact: contract,
      status: "pending",
    };
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBids),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Bid has been saved",
            showConfirmButton: false,
            timer: 1500,
          });

          //add the new bid 
          newBids._id = data.insertedId
          const newBid = [...bids, newBids];
          newBid.sort((a,b) => b.bid_price - a.bid_price)
          setBids(newBid);
          e.target.reset();
        }
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div>
          <div className="w-full h-[400px] bg-gray-200 rounded-xl overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Product Description</h3>

            <div className="flex justify-between text-sm mb-3">
              <p>
                <span className="text-purple-600 font-medium">Condition :</span>{" "}
                {condition}
              </p>

              <p>
                <span className="text-purple-600 font-medium">
                  Usage Time :
                </span>{" "}
                {usage_time}
              </p>
            </div>

            <hr className="my-3" />

            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <Link
            to="/allProducts"
            className="text-sm text-gray-600 hover:text-purple-600"
          >
            ← Back To Products
          </Link>

          <h1 className="text-4xl font-bold mt-4 mb-2">{title}</h1>

          <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
            {category}
          </span>

          {/* Price Box */}
          <div className="bg-white p-5 rounded-xl shadow mt-6">
            <h2 className="text-2xl font-bold text-green-600">
              ${price_min} - {price_max}
            </h2>
            <p className="text-sm text-gray-500">Price starts from</p>
          </div>

          {/* Product Info */}
          <div className="bg-white p-5 rounded-xl shadow mt-6">
            <h3 className="text-lg font-semibold mb-3">Product Details</h3>

            <p className="text-sm text-gray-600">
              <strong>Product ID:</strong> {_id}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              <strong>Posted:</strong> {posted_date}
            </p>
          </div>

          {/* Seller Info */}
          <div className="bg-white p-5 rounded-xl shadow mt-6">
            <h3 className="text-lg font-semibold mb-4">Seller Information</h3>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-medium">{seller_name}</p>
                <p className="text-sm text-gray-500">{seller_email}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              <strong>Location:</strong> {location}
            </p>

            <p className="text-sm mt-2">
              <span className="bg-yellow-400 text-xs px-3 py-1 rounded-full">
                On Sale
              </span>
            </p>
          </div>

          {/* Buy Button */}
          <button
            onClick={handleBidModalOpen}
            className="w-full mt-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold rounded-md hover:opacity-90 transition"
          >
            I Want Buy This Product
          </button>

          <dialog ref={bidModalRef} className="modal modal-middle">
            <div className="modal-box max-w-2xl">
              {/* Title */}
              <h3 className="text-xl font-bold text-center mb-6">
                Give Seller Your Offered Price
              </h3>

              {/* Form */}
              <form onSubmit={handleBidSubmit} className="space-y-4">
                {/* Buyer Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Buyer Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={user?.displayName || ""}
                      readOnly
                      className="input input-bordered w-full mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Buyer Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={user?.email || ""}
                      readOnly
                      className="input input-bordered w-full mt-1"
                    />
                  </div>
                </div>

                {/* Buyer Image */}
                <div>
                  <label className="text-sm font-medium">Buyer Image URL</label>
                  <input
                    type="text"
                    name="image"
                    placeholder="https://your_img_url"
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                {/* Offered Price */}
                <div>
                  <label className="text-sm font-medium">
                    Place your Price
                  </label>
                  <input
                    type="number"
                    name="bid"
                    placeholder="Enter your offer price"
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label className="text-sm font-medium">Contact Info</label>
                  <input
                    type="text"
                    name="contract"
                    placeholder="e.g. +1-555-1234"
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => bidModalRef.current.close()}
                    className="px-5 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-md hover:opacity-90 transition"
                  >
                    Submit Bid
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>

      <div className="mt-16 bg-white p-6 rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-8">
          Bids For This Products:{" "}
          <span className="text-purple-600">
            {bids.length.toString().padStart(2, "0")}
          </span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-3">SL No</th>
                <th className="p-3">Product</th>
                <th className="p-3">Seller</th>
                <th className="p-3">Bid Price</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bids.map((bid, index) => (
                <tr
                  key={bid._id}
                  className="border-t-1 border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* SL */}
                  <td className="p-4">{index + 1}</td>

                  {/* Product */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gray-300 rounded-md overflow-hidden">
                        <img
                          src={image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{title}</p>
                        <p className="text-sm text-gray-500">${price_min}</p>
                      </div>
                    </div>
                  </td>

                  {/* Seller */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                        <img
                          src={bid.buyer_image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{bid.buyer_name}</p>
                        <p className="text-sm text-gray-500">
                          {bid.buyer_email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Bid Price */}
                  <td className="p-4 font-semibold text-gray-800">
                    ${bid.bid_price}
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm border border-green-500 text-green-600 rounded hover:bg-green-50">
                        Accept Offer
                      </button>

                      <button className="px-3 py-1 text-sm border border-red-500 text-red-600 rounded hover:bg-red-50">
                        Reject Offer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
