import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./usercontext";

const App = () => {
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserId } = useUserContext();

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
        setUserId(data.id);
        console.log(data.id);
        setUserName("");
        alert("名前の送信に成功しました！");
        navigate("/question_display/1");
      } else {
        alert("名前の送信に失敗しました。");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("名前の送信中にエラーが発生しました。");
    }
  };

  const handleNavigateAddQuestion = () => {
    navigate("/add_question");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
      <button
        type="button"
        onClick={handleNavigateAddQuestion}
        className="absolute top-20 right-4 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200"
      >
        質問ページへ
      </button>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-orange-500 mb-4">
          数学の問題を解いてお酒の失敗をなくそう！
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            名前を入力してね:
          </label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="なまえ"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition duration-200"
        >
          スタート！
        </button>
      </form>
    </div>
  );
};

export default App;
