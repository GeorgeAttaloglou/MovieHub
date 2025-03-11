import React from "react";

const LandingPage = () => {
  return (
    <div className="relative bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-8">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://source.unsplash.com/1600x900/?movie,cinema')] bg-cover bg-center opacity-30"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">Welcome to MovieHub</h1>
        <p className="text-xl mb-6 max-w-2xl mx-auto drop-shadow-md">
          Track, review, and discover movies and series tailored to your preferences.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition transform hover:scale-105">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
