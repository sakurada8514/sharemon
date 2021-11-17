import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Link
        to="/regist"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-8"
      >
        Regist
      </Link>
      <Link
        to="/login"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded ml-8"
      >
        login
      </Link>
    </div>
  );
};

export default NavBar;
