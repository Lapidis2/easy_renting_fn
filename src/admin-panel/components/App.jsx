import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import PropertyDetail from './pages/PropertyDetail';
import CreateSupplyProperty from './components/CreateSupplyProperty';
import ListingDetails from './components/Home/ListingDetails';
import RequestPropertiesForm from './components/RequestPropertyForm';
import PropertyTypeCards from './pages/PropertyTypeCards';
import AssetPropertyListByType from './pages/AssetPropertyListByType'

import PropertyRequested from "./pages/RequestedProperty"
import PropertySupplied from "./pages/SupplyProperty"


import Dashboard from './components/Admin/Dashboard';
import SupplyProperty from './components/Admin/SupplyProperty';
import SupplyDetail from './components/Admin/SupplyDetail';
import RequestedPropertyDetail from './components/Admin/RequestedPropertyDetail';
import RequestedProperties from './components/Admin/RequestedProperties';
import './App.css';
import AssetDetailPage from './pages/AssetDetail';

// //admin-panel imports
import DashboardPanel from './admin-panel/pages/Dashboard';
import Properties from './admin-panel/pages/Properties';
import CreateNewProperty from './admin-panel/pages/CreateNewProperty'
import Users from './admin-panel/pages/Users';
import Transactions from './admin-panel/pages/Transactions';
import Reports from './admin-panel/pages/Reports';
import Settings from './admin-panel/pages/Settings';
import Support from './admin-panel/pages/Support';
import Messages from './admin-panel/pages/Messages';
import UserProfilePage from './admin-panel/pages/UserProfilePage';
import UserDetail from './admin-panel/pages/UserDetail';

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-supply-property" element={<CreateSupplyProperty />} />
        <Route path="/create-request-property" element={<RequestPropertiesForm />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/details/:id" element={<ListingDetails />} />
        <Route path="/asset-property/:type" element={<AssetPropertyListByType />} />
        <Route path="/asset/:id" element={<AssetDetailPage />} />
        <Route path="/get-properties/type/:type" element={<PropertyTypeCards />} />
        <Route path="/property-requested" element={<PropertyRequested />} />
		<Route path="/supplied-property" element={<PropertySupplied />} />
		  
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/requested-properties" element={<RequestedProperties />} />
          <Route path="/admin/supply-properties" element={<SupplyProperty />} />
          <Route path="/admin/supply-detail/:id" element={<SupplyDetail />} />
          <Route path="/requested-property-detail/:id" element={<RequestedPropertyDetail />} />
        
          <Route path="/supply-property-detail/:id" element={<SupplyDetail />} />
          <Route path="/get-properties/type/:type" element={<PropertyTypeCards />} />
          
      <Route path="/users/:id" element={<UserDetail />} />   
      <Route path="/admin-panel" element={<DashboardPanel />} />
      <Route path="/admin-panel/properties" element={<Properties />} />
      <Route path="/admin-panel/create-new-property" element={<CreateNewProperty />} />
      <Route path="/admin-panel/users" element={<Users />} />
      <Route path="/admin-panel/transactions" element={<Transactions />} />
      <Route path="/admin-panel/reports" element={<Reports />} />
      <Route path="/admin-panel/settings" element={<Settings />} />
      <Route path="/admin-panel/support" element={<Support />} />
      <Route path="/admin-panel/messages" element={<Messages />} />
      <Route path="/admin-panel/users/:id" element={<UserProfilePage />} /> 
          {/* 404 Page Not Found */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center shadow-md p-6 mt-25">
                <h3 className="font-bold my-3 text-red-600">
                  Oooops! Requested Page Not Found!
                </h3>
                <Link to="/">
                  <button className="py-3 px-4 rounded-lg bg-black text-white hover:bg-gray-800 transition">
                    Back | Home
                  </button>
                </Link>
              </div>
            }
          />
        </Routes>
    </Router>
  );
}

export default App;
