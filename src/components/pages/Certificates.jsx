import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/Card";

import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import Footer from "../../components/layout/Footer";

const Certificates = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      setShowFooter(scrollTop + clientHeight >= scrollHeight - 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      {/* <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> */}
      <div className="flex flex-1">
        {/* <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> */}
        <main className={`flex-1 p-4 mt-4 transition-all duration-300 ${sidebarOpen ? "ml-0" : "ml-0 md:ml-0"}`}>
          
          {/* Page Heading */}
          <h1 className="text-2xl font-bold text-center mb-6">Certificates</h1>

          {/* Content */}
          <div className="flex justify-center">
            <p className="text-gray-600">This is the Certificates page. Content will be added soon.</p>
          </div>

        </main>
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default Certificates;
