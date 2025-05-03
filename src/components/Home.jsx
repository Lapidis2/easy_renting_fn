import React, { useState } from 'react';
import Hero from "./Home/Hero";
import ApartmentCards from "./Appatment.cards";
import Footer from "./Footer";
import AssetProperty from "./AssetProperty";
import SearchBar from "./Home/SearchBar";
import {NavBar} from "./NavBar"
import FAQSection from './FAQSection';

const Home = () => {
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchResults = (results) => {
    setFilteredAssets(results.assets);
    setFilteredProperties(results.properties);
    setIsSearching(true);
  };
  
  
  return (
    <div className="bg-gray-50 mt-20">
      <NavBar />
      <Hero />
      <SearchBar onSearchResults={handleSearchResults} />
      {isSearching ? (
        <div className="p-6 space-y-6">
          <ApartmentCards properties={filteredProperties} />
          <AssetProperty assets={filteredAssets} />
        </div>
      ) : (
        <>
          <ApartmentCards />
          <AssetProperty />
        </>
      )}

      <FAQSection />
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-10">
        <h3 className="text-xl font-semibold mb-4">Support / Help Center Configuration</h3>
        <p>If you have any questions, feel free to reach out to us!</p>
      </div>


      <Footer />
      </div>
  );
};

export default Home;
