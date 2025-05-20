import React, { useState } from 'react';
import Hero from "./Home/Hero";
import ApartmentCards from "./Appatment.cards";
import Footer from "./Footer";
import AssetProperty from "./AssetProperty";
import SearchBar from "./Home/SearchBar";
import { NavBar } from "./NavBar";

const Home = () => {
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchResults = (results) => {
    setIsLoading(true);
    setIsSearching(true);

    // Simulate API/data fetching delay
    setTimeout(() => {
      setFilteredAssets(results.assets);
      setFilteredProperties(results.properties);
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading simulation
  };

  return (
    <div className="bg-gray-50 mt-20">
      <NavBar />
      <Hero />
      <SearchBar onSearchResults={handleSearchResults} />

      <div className="p-6 space-y-6">
        {isSearching ? (
          <>
            <ApartmentCards
              properties={filteredProperties}
              isLoading={isLoading}
            />
            <AssetProperty
              assets={filteredAssets}
              isLoading={isLoading}
            />
          </>
        ) : (
          <>
            <ApartmentCards />
            <AssetProperty />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
