import React from "react";
import { useCorrect } from "./correct"; // Context を利用

const Results = () => {
  const { correct } = useCorrect(); // 正解数を取得

  // メッセージを正解数に応じて動的に変更
  const getMessage = () => {
    if (correct === 10) {
      return "Perfect score! Excellent work!";
    } else if (correct >= 7) {
      return "Great job! You did really well.";
    } else if (correct >= 4) {
      return "Good effort! Keep practicing.";
    } else {
      return "Don't worry, try again!";
    }
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
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
      <p className="text-lg text-gray-700 mb-4">Correct Answers: {correct}/10</p>
      <p className="text-md text-gray-600 italic">{getMessage()}</p>
      <div className="mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => (window.location.href = "/")}
        >
          Retry Quiz
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={postCorrectScore}
        >
          Submit Score
        </button>
      </div>
    </div>
  );
};

export default Results;
