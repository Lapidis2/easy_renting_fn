import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import RequestedProperties from "../Admin/RequestedProperties";
import SupplyProperty from "../Admin/SupplyProperty";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </div>
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-center mt-10">Welcome to the Dashboard</h1>
        <p className="text-center mt-4">Manage your properties and assets here.</p>
        <p className="text-center mt-4">Use the sidebar to navigate through different sections.</p>

        <RequestedProperties />
        <SupplyProperty />
      </div>
    </div>
  );
};

export default Dashboard;