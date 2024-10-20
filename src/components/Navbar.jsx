import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingCart } from "react-feather";
import { auth } from "../services/firebase";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Loading from "./loading";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.uid === "jquHPh7atrQG5RxB0i40ET7rhh53") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setLoading(false);
  }, [currentUser]);

  if (loading) {
    return <Loading />
  }

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("formData");
      nav("/");
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex items-center justify-between py-10 font-medium">
      <Link to="/">
        <img src="/images/vinieLogo.png" alt="Logo" className="w-28" />
      </Link>

      <div className="flex items-center gap-4 lg:gap-10 ">
        {isAdmin && (
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => nav("/upload")}
          >
            Upload
          </button>
        )}

        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 cursor-pointer scale-125" />
          <p className="absolute right-[-10px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-lg text-[10px]">
            0
          </p>
        </Link>

        <div className="group relative">
          <User className="w-6 cursor-pointer scale-125" />
          <div className="group-hover:block hidden absolute right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-2 border shadow-sm text-gray-500 rounded">
              {currentUser ? (
                <p
                  className="cursor-pointer py-1 px-5 hover:bg-gray-200 hover:text-white"
                  onClick={handleLogout}
                >
                  Sign Out
                </p>
              ) : (
                <p
                  className="cursor-pointer py-1 px-5 hover:bg-gray-200 hover:text-white"
                  onClick={() => nav("/sign-in")}
                >
                  Sign In
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
