import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../../components/layout/Sidebar";
import Footer from "../../components/layout/Footer";
import AnalyticsDashboard from "../../components/pages/ConversionRateAnalytics";
import HistoryLog from "../../components/pages/HistoryLog";

import ChatWindow from "../../components/pages/chat";

const statusColors = {
  Pending: "bg-red-700",
  Progress: "bg-orange-600",
  Completed: "bg-green-800"
};

const FollowUpCard = ({ followUp, openChat, deleteFollowUp, newMessageCount }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.05 }} className="shadow-lg rounded-xl bg-transparent overflow-hidden transition-all duration-300">
      <Card className="relative border border-gray-200 rounded-lg shadow-md hover:shadow-xl">
        <div className={`absolute top-0 left-0 w-full h-2 ${statusColors[followUp.status]}`}></div>
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-gray-800 underline text-center">{followUp.title}</h2>
          <p className="text-gray-500 text-sm">Status: <span className="font-medium">{followUp.status}</span></p>
          <p className="text-sm text-gray-600 mt-2">Due Date: {followUp.dueDate}</p>
          <p className="text-sm text-gray-600">Department: {followUp.department}</p>
          <div className="flex justify-between items-center mt-3">
            <button 
              onClick={() => openChat(followUp)} 
              className="bg-transparent hover:bg-gray-200 transition-all duration-300 text-black px-4 py-2 rounded-lg shadow-md relative"
            >
              Open Chat
              {newMessageCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {newMessageCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2">
            <button
  onClick={() => deleteFollowUp(followUp.id)}
  className="bg-transparent hover:bg-gray-200 text-black p-2 rounded-lg shadow-md flex items-center justify-center w-10 h-10"
>
  <img
    src="https://icon-library.com/images/delete-icon/delete-icon-13.jpg"
    alt="Delete"
    className="w-5 h-4 object-contain"
  />
</button>

              <div className="relative">
                <button 
                  onClick={() => setShowOptions(!showOptions)}
                  className="bg-transparent hover:bg-gray-200 transition-all duration-300 text-white p-2 rounded-lg shadow-md flex items-center justify-center"
                >
                  <img 
                    src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/7916057/three-dots-icon-md.png" 
                    alt="Options" 
                    className="w-5 h-5"
                  />
                </button>
                {showOptions && (
                  <div className="absolute right-0 bottom-full mb-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                    <button 
                      onClick={() => window.location.href = `mailto:?subject=Follow-up: ${followUp.title}`}
                      className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded-md"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png" alt="Gmail" className="w-5 h-5" />
                      Gmail
                    </button>
                    <button 
                      onClick={() => window.location.href = `https://wa.me/?text=Follow-up: ${followUp.title}`}
                      className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded-md"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
                      WhatsApp
                    </button>
                    <button 
                      onClick={() => window.location.href = `sms:?body=Follow-up: ${followUp.title}`}
                      className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded-md"
                    >
                      <img src="https://icons.veryicon.com/png/256/business/iconpack-003/sms-14.png" alt="SMS" className="w-5 h-5" />
                      SMS
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FollowUpDashboard = () => {
  const [followUps, setFollowUps] = useState([]);
  const [filteredFollowUps, setFilteredFollowUps] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [showFooter, setShowFooter] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessageCount, setNewMessageCount] = useState(0); // State to track new message count

  useEffect(() => {
    // Load stored tasks from localStorage
    const storedFollowUps = JSON.parse(localStorage.getItem("followUps")) || [];
  
    // Merge stored data with initial data
    if (storedFollowUps.length > 0) {
      setFollowUps(storedFollowUps);
      setFilteredFollowUps(storedFollowUps);
    } else {
      // Load default hardcoded follow-ups **ONLY IF localStorage is empty**
      const initialFollowUps = [
     
      { id: "1", title: "Follow-up with Client A", department: "Telesales", status: "Pending", dueDate: "2025-06-05" },
      { id: "2", title: "Invoice Reminder", department: "Accounts", status: "Progress", dueDate: "2025-05-06" },
      { id: "3", title: "Academics Follow-up", department: "Academics", status: "Pending", dueDate: "2025-03-06" },
      { id: "4", title: "Placement Follow-up", department: "Placements", status: "Completed", dueDate: "2025-02-07" },
      { id: "5", title: "Placement Follow-up", department: "Placements", status: "Completed", dueDate: "2025-01-04" },
      { id: "6", title: "Placement Follow-up", department: "Placements", status: "Completed", dueDate: "2025-01-04" },
      { id: "7", title: "Academics Follow-up", department: "Academics", status: "Pending", dueDate: "2025-04-06" },
      { id: "8", title: "Academics Follow-up", department: "Academics", status: "Progress", dueDate: "2025-04-06" },
      { id: "9", title: "Academics Follow-up", department: "Academics", status: "Progress", dueDate: "2025-04-06" },
    ];
  
    setFollowUps(initialFollowUps);
    setFilteredFollowUps(initialFollowUps);
    localStorage.setItem("followUps", JSON.stringify(initialFollowUps));
  }
  }, []);
  

  useEffect(() => {
    let filtered = followUps.filter((followUp) => 
      (followUp.title.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      followUp.status.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      followUp.department.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      followUp.dueDate.startsWith(searchQuery)) &&
      (departmentFilter ? followUp.department === departmentFilter : true)
    );
    

    filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    setFilteredFollowUps(filtered);
  }, [searchQuery, departmentFilter, followUps]);
  
  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      setShowFooter(scrollTop + clientHeight >= scrollHeight - 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const deleteFollowUp = (id) => {
    const updatedFollowUps = followUps.filter(followUp => followUp.id !== id);
  
    // Update both state variables
    setFollowUps(updatedFollowUps);
    setFilteredFollowUps(updatedFollowUps);  // ✅ Update the filtered list too
  
    // Persist updated data in localStorage
    localStorage.setItem("followUps", JSON.stringify(updatedFollowUps));
  };
  
  

  const openChat = (followUp) => {
    setActiveChat(followUp);
  };

  const closeChat = () => {
    setActiveChat(null);
  };

  const notifyNewMessage = () => {
    toast.info("New message received!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const incrementNewMessageCount = () => {
    setNewMessageCount(newMessageCount + 1);
  };

  return (
    
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <div className="flex flex-1">
        {/* <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> */}
        <main className="flex-1 p-6 transition-all duration-300">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex space-x-2">
              {['dashboard', 'conversionRate', 'logs'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-2 mt-4 sm:mt-0">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="border p-2 rounded-lg w-40 sm:w-60 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <select 
                value={departmentFilter} 
                onChange={(e) => setDepartmentFilter(e.target.value)} 
                className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">All Departments</option>
                <option value="Telesales">Telesales</option>
                <option value="Accounts">Accounts</option>
                <option value="Academics">Academics</option>
                <option value="Placements">Placements</option>
              </select>
            </div>
          </div>

          {activeTab === "logs" && (
  <>
    <HistoryLog logs={filteredFollowUps} searchQuery={searchQuery} departmentFilter={departmentFilter} />
  </>
)}


          {activeTab === "conversionRate" && <AnalyticsDashboard followUps={filteredFollowUps} />}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Pending", "Progress", "Completed"].map(status => (
                <div key={status} className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
                  <h2 className="text-lg font-semibold mb-3 text-gray-800 underline text-center">
                    {status}
                  </h2>
                  <div className="space-y-4">
                    {filteredFollowUps.filter(followUp => followUp.status === status).map(followUp => (
                      <FollowUpCard key={followUp.id} followUp={followUp} openChat={openChat} deleteFollowUp={deleteFollowUp} newMessageCount={newMessageCount}/>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      
      {activeChat && <ChatWindow followUp={activeChat} onClose={closeChat} incrementNewMessageCount={incrementNewMessageCount} />}
      {showFooter && <Footer />}
      <ToastContainer />
    </div>
  );
};

export default FollowUpDashboard;
