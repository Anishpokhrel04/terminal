import "../index.css";
import { FaTerminal } from "react-icons/fa"; // Terminal icon
import { IoMdCodeWorking } from "react-icons/io"; // Floating code icon

function Header() {
  return (
    <div className="relative flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 border-b-2 border-indigo-700 shadow-lg animate-gradient">
      <FaTerminal className="text-white text-3xl mr-2 animate-pulse" />
      <h1 className="text-white text-2xl font-bold tracking-widest">
        Welcome to Anish Pokhrel's Terminal
      </h1>

      {/* Floating Icons */}
      <IoMdCodeWorking className="absolute top-4 left-10 text-white opacity-50 animate-float" />
      <IoMdCodeWorking className="absolute bottom-8 right-10 text-white opacity-50 animate-float-reverse" />
    </div>
  );
}

export default Header;
