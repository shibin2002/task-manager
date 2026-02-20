import React from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed inset-y-0 left-0 bg-[#002147] text-white w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Sidebar</h2>
        {/* Add your sidebar content here */}
      </div>
      <button onClick={toggleSidebar} className="md:hidden absolute top-4 right-4 text-white">
        {isOpen ? "Close" : "Open"}
      </button>
      <ul className="mt-15 w-full space-y-2">
        {[
          { name: "Add", link: "/add" },
          { name: "Dashboard", link: "/" },
          { name: "Attendance", link: "/Attendance" },
          { name: "Marks", link: "/Marks" },
          { name: "Certificates", link: "/Certificates" }
        ].map((item) => (
          <li key={item.name} className="w-full">
            <Button
              variant="ghost"
              className="w-full text-white hover:bg-white hover:text-[#002147] py-2 px-4 transition duration-200 text-left"
              onClick={() => (window.location.href = item.link)}
            >
              {item.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
