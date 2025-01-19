import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./admin-pages/Header";
import Dashboard from "./admin-pages/Dashboard";
import TradeDetails from "./admin-pages/TradeDetails";
import CandleImages from "./admin-pages/CandleImages";
import IndicatorsConfirmations from "./admin-pages/IndicatorsConfirmations";
import Billing from "./admin-pages/Billing";
import Login from "./auth/Login";

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
            <Route path="/trade-details" element={<TradeDetails />} />
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







// import React from 'react';
// import Header from './components/Header';
// import About from './components/About';
// import Services from './components/Services';
// import Portfolio from './components/Portfolio';
// import Contact from './components/Contact';
// import Footer from './components/Footer';
// import Hero from './components/Hero';
// import FloatingWhatsAppButton from './components/FloatingWhatsAppButton'; // Import the button component
// import ImageGallery from './components/ImageGallery.';

// function App() {
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       <Hero id="home" /> {/* Add an id to match the scroll */}
//       <About id="about" />
//       <Services id="services" />
//       <Portfolio id="portfolio" />
//       <Contact id="contact" />
//       <ImageGallery/>  
//       <Footer />
//       <FloatingWhatsAppButton /> {/* Add the floating button here */}
//     </div>
//   );
// }

// export default App;
