import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingCart } from "react-feather";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";

const Navbar = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const nav = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();

      toast.success("Logout successful, see you again soon!", {
        position: "top-right",
      });

      nav("/");
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  const handleSignIn = () => {
    nav("/sign-in");
  };

  return (
    <div className="flex items-center justify-between py-10 font-medium">
      <Link to="/">
        <img src="/images/vinieLogo.png" alt="Logo" className="w-28" />
      </Link>

      <div className="flex items-center gap-10">
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-5 cursor-pointer scale-125" />
          <p className="absolute right-[-10px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-lg text-[10px]">
            0
          </p>
        </Link>

        <div className="group relative">
          <User className="w-5 cursor-pointer scale-125" />
          <div className="group-hover:block hidden absolute right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-2 border shadow-sm text-gray-500 rounded">
              {isAuthenticated ? (
                <p
                  className="cursor-pointer py-1 px-5 hover:bg-gray-200 hover:text-white"
                  onClick={handleLogout}
                >
                  Sign Out
                </p>
              ) : (
                <p
                  className="cursor-pointer py-1 px-5 hover:bg-gray-200 hover:text-white"
                  onClick={handleSignIn}
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
