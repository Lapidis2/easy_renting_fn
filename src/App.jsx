import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { NavBar } from './components/NavBar';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home'
import PropertyDetail from './pages/PropertyDetail';
import CreateSupplyProperty from './components/CreateSupplyProperty';
import ListingDetails from './components/Home/ListingDetails';
import SupplyProperty from './components/SupplyProperty';
import RequestProperty from './components/RequestProperty';
import RequestedProperties from './components/RequestedProperties';
import SupplyPropertyDetail from './components/SupplyDetail';
import PropertyTypeCards from './pages/PropertyTypeCards';
import AssetPropertyListByType from './pages/AssetPropertyListByType'


import './App.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/supply" element={<SupplyProperty />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/supply-property" element={<CreateSupplyProperty />} />
        <Route path="/request-property" element={<RequestProperty />} />
        <Route path="/requested-property" element={<RequestedProperties />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/details/:id" element={<ListingDetails />} />
        <Route path="/supply-property-detail/:id" element={<SupplyPropertyDetail />} />
        <Route path="/asset-property/:type" element={<AssetPropertyListByType />} />
        <Route path="/get-properties/type/:type" element={<PropertyTypeCards />} />

        {/* 404 Page Not Found */}
        <Route path="*" element={
          <div className='flex flex-col items-center shadow-md p-6 mt-25'>
            <h3 className='font-bold my-3 text-red-600'>Oooops! Requested Page Not Found!</h3>
            <Link to="/">
              <button className='py-3 px-4 rounded-lg bg-black text-white hover:bg-gray-800 transition'>
                Back | Home
              </button>
            </Link>
          </div>
        } />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
