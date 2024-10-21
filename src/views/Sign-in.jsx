import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, signWithGoogle } = useAuth();

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const signIn = await signin(email, password);
      if(signIn){
        nav("/");
      }
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    }
  };

  const googleSignIn = async (e) => {
    try {
      await signWithGoogle()
      nav("/")
    } catch (error) {
      toast.error(error.message, { position: 'top-right' });
    }
  };

  return (
    <section className="h-screen flex items-center justify-center dark:bg-gray-800">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <Input
              value={email}
              title="Your email"
              type="email"
              placeholder="name@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              value={password}
              title="Password"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="text-white bg-[#DEAC80] py-1.5 px-4 rounded font-bold w-full"
            >
              Sign in
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                to="/register"
                className="font-medium text-[#DEAC80] hover:underline dark:text-teal-500"
              >
                Sign up
              </Link>
            </p>
          </form>

          <div className="flex items-center">
            <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <div className="px-5 text-center text-gray-500 dark:text-gray-400">
              or
            </div>
            <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
          </div>

          <form id="connect-google-button">
            <button
              className="w-full inline-flex items-center justify-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              type="button"
              onClick={googleSignIn}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_13183_10121)">
                  <path
                    d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                    fill="#3F83F8"
                  ></path>
                  <path
                    d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                    fill="#FBBC04"
                  ></path>
                  <path
                    d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                    fill="#EA4335"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_13183_10121)">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(0.5)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
