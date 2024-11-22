import React, { useState } from "react";

const App = () => {
  const [username, setUserName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/post_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      if (response.ok) {
        alert("Name submitted successfully!");
        const data = await response.json();
        console.log('サーバーからのレスポンス:', data);
        setUserName("");
      } else {
        alert("Failed to submit the name.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the name.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
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
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Start
        </button>
      </form>
    </div>
  );
};

export default App;
