import React from 'react';
import Banner from '../Banner/Banner';
import RecentProduct from '../RecenntProduct/RecentProduct';



const latestProductPromise = fetch('http://localhost:3000/latest-products').then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner></Banner>
 
            <RecentProduct latestProductPromise={latestProductPromise}></RecentProduct>
            
            
        </div>
    );
};

export default Home;