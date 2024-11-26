import React from "react";
import { useCorrect } from "./correct"; // Context を利用

const Results = () => {
  const { correct } = useCorrect(); // 正解数を取得

  // メッセージを正解数に応じて動的に変更
  const getMessage = () => {
    return "酔っ払い度を測定しました！みんなに共有しよう！";
  };

  const postCorrectScore = async () => {
    try {
      const response = await fetch("http://localhost:8080/post_correct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correct }),
      });

      if (response.ok) {
        alert("Score submitted successfully!");
      } else {
        alert("Failed to submit the score.");
      }
    } catch (error) {
      console.error("Error submitting score:", error);
      alert("An error occurred while submitting the score.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-lg w-full bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Result</h1>
        <p className="text-lg text-gray-700 mb-4">あなたの正解数は: {correct}/10 です</p>
        <p className="text-md text-gray-600 italic">{getMessage()}</p>
        <div className="mt-6 space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => (window.location.href = "/")}
          >
            ホームに戻る
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={postCorrectScore}
          >
            Lineグループに通知する
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
