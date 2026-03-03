import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const MyBids = () => {
    const{user} = use(AuthContext);
    const [bids,setBids] = useState([])

    console.log('token', user.accessToken)

    useEffect(() => {
        if(user?.email){
            fetch(`http://localhost:3000/bids?email=${user.email}`, {
              headers : {
                authorization : `Bearer ${localStorage.getItem('token')}`
              }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBids(data);
            })
        }
    },[user?.email])


    // useEffect(() => {
    //     if(user?.email){
    //         fetch(`http://localhost:3000/bids?email=${user.email}`, {
    //           headers : {
    //             authorization : `Bearer ${user.accessToken}`
    //           }
    //         })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setBids(data);
    //         })
    //     }
    // },[user?.email])

    const handleDeleteBids = (_id) => {
        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    fetch(`http://localhost:3000/bids/${_id}`,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
    const remaingBids = bids.filter(bid => bid._id !== _id);
    setBids(remaingBids);
  }
});
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
      
      {/* Title */}
      <h2 className="text-4xl font-bold text-center mb-12">
        My Bids:{" "}
        <span className="text-purple-600">
          {bids.length.toString().padStart(2, "0")}
        </span>
      </h2>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* Table Head */}
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-3">SL No</th>
                <th className="p-3">Product</th>
                <th className="p-3">Seller</th>
                <th className="p-3">Bid Price</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {bids.map((bid, index) => (
                <tr
                  key={bid._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* SL */}
                  <td className="p-4">{index + 1}</td>

                  {/* Product */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gray-300 rounded-md"></div>
                      <div>
                        <p className="font-medium">{bid.product_title || "Product"}</p>
                        <p className="text-sm text-gray-500">
                          ${bid.product_price || "0"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Seller */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="font-medium">{bid.seller_name || "Seller"}</p>
                        <p className="text-sm text-gray-500">
                          {bid.seller_email || ""}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Bid Price */}
                  <td className="p-4 font-semibold text-gray-800">
                    ${bid.bid_price}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span className="px-3 py-1 text-xs bg-yellow-400 rounded-full text-white">
                      {bid.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-4">
                    <button
                    onClick={() => handleDeleteBids(bid._id)} className="px-3 py-1 text-sm border border-red-500 text-red-600 rounded hover:bg-red-50">
                      Remove Bid
                    </button>
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

export default MyBids;