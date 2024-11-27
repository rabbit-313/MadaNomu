import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCorrect } from "./correct";

const QuestionDisplay = ({ id }) => {
  const [questionData, setQuestionData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { correct, setCorrect } = useCorrect();

  useEffect(() => {
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
      <div className="text-red-500 text-center mt-4 text-lg font-semibold">
        エラー: {error}
      </div>
    );
  }

  if (!questionData) {
    return (
      <div className="text-gray-400 text-center mt-4 text-lg font-semibold">
        問題を読み込み中...
      </div>
    );
  }

  const handleNextQuestion = (choice) => {
    if (choice === questionData.answer) {
      setCorrect(correct + 1);
    }
    const nextId = id + 1;
    if (nextId > 10) {
      navigate("/results");
      return;
    }
    navigate(`/question_display/${nextId}`);
  };

  return (
    <div className="p-6 max-w-lg w-full bg-black text-gray-100 rounded-lg shadow-2xl flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-extrabold text-orange-500 mb-4">
          {questionData.question_name}
        </h2>
        <p className="text-gray-300 mb-6">{questionData.question}</p>
      </div>

      <ul className="space-y-3">
        {[1, 2, 3, 4].map((num) => (
          <li
            key={num}
            className="p-4 bg-gray-800 text-gray-100 rounded-lg hover:bg-orange-500 hover:text-black transition duration-300 cursor-pointer"
            onClick={() => handleNextQuestion(num)}
          >
            {num}. {questionData[`choice_${num}`]}
          </li>
        ))}
      </ul>

      <div className="mt-6 text-sm text-gray-400 flex justify-between">
        <span>レベル: {questionData.level}</span>
        <span>ID: {questionData.id}</span>
      </div>
      <div className="mt-2 text-xs text-gray-500 text-right">
        作成日時: {new Date(questionData.created_at).toLocaleString()}
      </div>
    </div>
  );
};

const QuestionPage = () => {
  const { id } = useParams();
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-gray-100">
      <QuestionDisplay id={parseInt(id, 10)} />
    </div>
  );
};

export default QuestionPage;
