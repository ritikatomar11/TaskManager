import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center">
        Welcome to Task Manager
      </h1>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition duration-300"
        >
          Sign Up
        </button>

        <button
          onClick={() => navigate("/login")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default MainPage;
