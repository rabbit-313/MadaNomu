import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCorrect } from "./correct"; // Context を利用

const QuestionDisplay = ({ id }) => {
  const [questionData, setQuestionData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { correct, setCorrect } = useCorrect();

  useEffect(() => {
    // エンドポイントからデータを取得
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:8080/get_question/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch question data");
        }
        const data = await response.json();
        setQuestionData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchQuestion();
  }, [id]);

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">
        Error: {error}
      </div>
    );
  }

  if (!questionData) {
    return (
      <div className="text-gray-500 text-center mt-4">
        Loading question...
      </div>
    );
  }

  const handleNextQuestion = (choice) => {
    // 選択肢と正解を比較
    if (choice === questionData.answer) {
      setCorrect(correct + 1); // 正解数をインクリメント
    }
    console.log(correct);
    const nextId = id + 1; // 次の問題 ID を計算
    if (nextId > 10) {
      navigate("/results"); // 最後の問題の後にトップページに遷移
      return;
    }
    navigate(`/question_display/${nextId}`);
  };

  return (
    <div
      className="p-6 max-w-lg w-full bg-white rounded-lg shadow-md flex flex-col justify-between"
      style={{ minHeight: "400px" }} // 高さを固定
    >
      <div>
        <h2 className="text-2xl font-bold mb-4">{questionData.question_name}</h2>
        <p className="text-gray-700 mb-4">{questionData.question}</p>
      </div>

      <ul className="space-y-2">
        <li
          className="p-3 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => handleNextQuestion(1)}
        >
          1. {questionData.choice_1}
        </li>
        <li
          className="p-3 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => handleNextQuestion(2)}
        >
          2. {questionData.choice_2}
        </li>
        <li
          className="p-3 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => handleNextQuestion(3)}
        >
          3. {questionData.choice_3}
        </li>
        <li
          className="p-3 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => handleNextQuestion(4)}
        >
          4. {questionData.choice_4}
        </li>
      </ul>

      <div className="mt-4 text-sm text-gray-500">
        Level: {questionData.level} | ID: {questionData.id}
      </div>
      <div className="mt-2 text-xs text-gray-400">
        Created at: {new Date(questionData.created_at).toLocaleString()}
      </div>
    </div>
  );
};

const QuestionPage = () => {
  const { id } = useParams(); // URLからidを取得
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <QuestionDisplay id={parseInt(id, 10)} />
    </div>
  );
};

export default QuestionPage;
