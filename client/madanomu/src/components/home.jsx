import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("名前を入力してください。");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:8080/post_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserName("");
      } else {
        alert("Failed to submit the name.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the name.");
    }
  };

  const handleNavigate = () => {
    navigate('/question');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        type="button"
        onClick={handleNavigate}
        className="absolute top-20 right-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
      >
        Go to Question Page
      </button>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h1 className="text-2xl font-bold text-center mb-4">あなたの酔っぱらい度合いは？</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            名前を入力してね:
          </label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="なまえ"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Start !
        </button>
      </form>
    </div>
  );
};

export default App;
