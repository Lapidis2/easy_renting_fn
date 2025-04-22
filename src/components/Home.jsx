import Hero from "./Home/Hero";
import ApartmentCards from "./Appatment.cards";
import Footer from "./Footer";
import React from 'react'
import AssetProperty from "./AssetProperty";

const Home = () => {
  return (
    <div>
        <Hero />
        <ApartmentCards />    
		<AssetProperty />
    <Footer />
    </div>
  )
}

export default Home
