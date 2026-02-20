import { Menu } from "lucide-react";
import { Button } from "../ui/button";

const Header = ({ toggleSidebar }) => {
  console.log("Header component rendered"); // Debugging

  return (
    <header className="bg-[#002147] text-white p-4 flex justify-between items-center fixed w-full top-0 shadow-md z-50 h-20">
      <div className="flex items-center gap-4">
        <Menu className="md:hidden cursor-pointer" size={24} onClick={toggleSidebar} />
        <h1 className="text-lg font-bold">Follow-Up Management</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img src="/2.jpg" alt="User Profile - Shibin" className="w-10 h-10 rounded-full border-2 border-white" />
          <span className="text-white font-semibold">Shibin</span>
        </div>
        <Button className="border border-white bg-[#002147] text-white px-4 py-2 hover:bg-white hover:text-[#002147]">
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
