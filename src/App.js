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
import TradingDetailsUpdate from "./admin-pages/TradingDetails/TradingDetailsUpdate";
import TradeDetailsView from "./admin-pages/TradingDetails/TradeDetailsView";

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
            <Route path="/trade-details-edit/:id" element={<TradingDetailsUpdate />} /> {/* Edit Route */}
            <Route path="/trade-details/:id" element={<TradeDetailsView />} />{/* Read Single item Route */}
            <Route path="/trade-details/delete/:id" element={<TableDetailsDelete />} /> {/* Delete Route */}
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
