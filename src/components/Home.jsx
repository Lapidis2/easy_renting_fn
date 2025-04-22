import Hero from "./Home/Hero";
import ApartmentCards from "./Appatment.cards";
import Footer from "./Footer";
import SupplyProperty from "../components/SupplyProperty";
import React, { useState } from 'react';
import AssetProperty from "./AssetProperty";

const Home = () => {
  const [filteredProperties, setFilteredProperties] = useState([]);

  const handleSearchResults = (results) => {
    setFilteredProperties(results);
  };

  return (
    <div>
      <Hero onSearchResults={handleSearchResults} />
      <ApartmentCards properties={filteredProperties} />
      <AssetProperty />
    </div>
  );
};

export default Home;
