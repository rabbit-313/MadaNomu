import React from "react";
import { useCorrect } from "./correct";
import { useUserContext } from "./usercontext";

const Results = () => {
  const { correct } = useCorrect();
  const { userId } = useUserContext();

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
        body: JSON.stringify({"user_id": userId ,"correct":correct }),
      });

      if (response.ok) {
        alert("スコアの送信に成功しました！");
      } else {
        alert("スコアの送信に失敗しました。");
      }
    } catch (error) {
      console.error("Error submitting score:", error);
      alert("スコア送信中にエラーが発生しました。");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <div className="p-8 max-w-lg w-full bg-white text-gray-800 rounded-lg shadow-xl text-center">
        <h1 className="text-3xl font-extrabold text-orange-500 mb-6">結果発表！</h1>
        <p className="text-xl font-semibold mb-4">
          あなたの正解数は: <span className="text-orange-500">{correct}/10</span> です
        </p>
        <p className="text-md text-gray-600 italic mb-6">{getMessage()}</p>
        <div className="mt-8 flex justify-center space-x-4">
          <button
            className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition duration-300"
            onClick={() => (window.location.href = "/")}
          >
            ホームに戻る
          </button>
          <button
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-300"
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
