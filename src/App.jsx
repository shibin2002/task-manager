import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

import FollowUpDashboard from "./components/pages/Dashboard";
import Attendance from "./components/pages/Attendance";
import Certificates from "./components/pages/Certificates";
import Mark from "./components/pages/Mark";
import Taskform from "./components/pages/add";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show footer when reaching the bottom
      setShowFooter(scrollTop + windowHeight >= documentHeight - 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Layout */}
        <div className="flex flex-1">
          {/* Sidebar (Fixed Width) */}
          <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Content Area - Adjust based on sidebar state */}
          <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"} md:ml-0`}>
            <main className="flex-1 p-6 mt-16">
              <Routes>
                <Route path="/" element={<FollowUpDashboard />} />
                <Route path="/Attendance" element={<Attendance />} />
                <Route path="/Certificates" element={<Certificates />} />
                <Route path="/Marks" element={<Mark />} />
                <Route path="/add" element={<Taskform />} />
              </Routes>
            </main>
          </div>
        </div>

        {/* Footer Appears Only When Scrolled to Bottom */}
        {showFooter && <Footer />}
      </div>
    </Router>
  );
};

export default App;
