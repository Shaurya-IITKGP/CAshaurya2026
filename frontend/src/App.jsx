// src/App.jsx

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import WhyCA from "./components/WhyCA";
import Responsibilities from "./components/Responsibilities";
import FAQ from "./components/FAQs";
import Register from "./components/Register";
import Admin from "./components/Admin";

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const MainContent = () => {
  return (
    <div className="relative text-white bg-black min-h-screen flex flex-col font-['Inter',sans-serif] selection:bg-yellow-400 selection:text-black overflow-x-hidden">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow pt-16 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/whyca" element={<WhyCA />} />
          <Route path="/responsibilities" element={<Responsibilities />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

const App = () => (
  <Router>
    <MainContent />
  </Router>
);

export default App;

