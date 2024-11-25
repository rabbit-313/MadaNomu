import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

const QuestionDisplay = ({ id }) => {
  const [questionData, setQuestionData] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{questionData.question_name}</h2>
      <p className="text-gray-700 mb-4">{questionData.question}</p>

      <ul className="space-y-2">
        <li className="p-3 bg-gray-100 rounded hover:bg-gray-200">
          1. {questionData.choice_1}
        </li>
        <li className="p-3 bg-gray-100 rounded hover:bg-gray-200">
          2. {questionData.choice_2}
        </li>
        <li className="p-3 bg-gray-100 rounded hover:bg-gray-200">
          3. {questionData.choice_3}
        </li>
        <li className="p-3 bg-gray-100 rounded hover:bg-gray-200">
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
  return <QuestionDisplay id={parseInt(id, 10)} />;
};

export default QuestionPage;
