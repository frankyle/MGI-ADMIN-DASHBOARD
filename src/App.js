import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./admin-pages/Header";
import Dashboard from "./admin-pages/Dashboard";
import CandleImages from "./admin-pages/CandleImages";
import IndicatorsConfirmations from "./admin-pages/IndicatorsConfirmations";
import Billing from "./admin-pages/Billing";
import Login from "./auth/Login";
import TradeDetailsTable from "./admin-pages/TradingDetails/TradeDetailsTable";
import TableDetailsCreate from "./admin-pages/TradingDetails/TradingDetailsCreate";
import TableDetailsDelete from "./admin-pages/TradingDetails/TradingDetailsDelete"; // Import the Delete component
import TradeDetailsView from "./admin-pages/TradingDetails/TradeDetailsView";

import TasksTable from "./admin-pages/Tasks/TasksTable";
import TaskCreate from "./admin-pages/Tasks/TaskCreate";
import TaskDetails from "./admin-pages/Tasks/TaskDetails";
import TaskUpdate from "./admin-pages/Tasks/TaskUpdate";
import TradeDetailsUpdate from "./admin-pages/TradingDetails/TradeDetailsUpdate";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Fixed Header */}
        <Header />
        {/* Main Content */}
        <main className="container mx-auto px-4 pt-32 pb-8"> {/* Adjusted top padding */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trade-details" element={<TradeDetailsTable />} />
            <Route path="/trade-details-create" element={<TableDetailsCreate />} />
            <Route path="/trade-details/:id" element={<TradeDetailsView />} />
            <Route path="/trade-details-edit/:id" element={<TradeDetailsUpdate />} />
            <Route path="/trade-details/delete/:id" element={<TableDetailsDelete />} /> {/* Delete Route */}
            
            <Route path="/tasks" element={<TasksTable />} />
            <Route path="/task-create" element={<TaskCreate />} />
            <Route path="/task-details/:id" element={<TaskDetails />} />
            <Route path="/task-edit/:id" element={<TaskUpdate />} />
            
        
        
            <Route path="/candle-images" element={<CandleImages />} />
            <Route path="/indicators-confirmations" element={<IndicatorsConfirmations />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
