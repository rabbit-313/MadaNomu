import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddQuestion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question_name: "",
    question: "",
    level: "",
    answer: "",
    choice_1: "",
    choice_2: "",
    choice_3: "",
    choice_4: "",
  });

  // エラーメッセージを管理する状態
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" }); // 入力があるとエラーをクリア
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // 必須フィールドのバリデーション
    if (!formData.question_name) newErrors.question_name = "Question name is required.";
    if (!formData.question) newErrors.question = "Question is required.";
    if (!formData.answer) newErrors.answer = "Answer is required.";
    if (!formData.level) newErrors.level = "Level is required.";
    if (!formData.choice_1) newErrors.choice_1 = "Choice 1 is required.";
    if (!formData.choice_2) newErrors.choice_2 = "Choice 2 is required.";
    if (!formData.choice_3) newErrors.choice_3 = "Choice 3 is required.";
    if (!formData.choice_4) newErrors.choice_4 = "Choice 4 is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // エラーを設定
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/post_question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("Question posted successfully!");
      setFormData({
        question_name: "",
        question: "",
        level: "",
        answer: "",
        choice_1: "",
        choice_2: "",
        choice_3: "",
        choice_4: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to post the question.");
    }
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        type="button"
        onClick={handleNavigate}
        className="absolute top-20 right-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
      >
        Go to Home Page
      </button>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Post a Question</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="question_name"
              className="block text-gray-700 font-medium mb-2"
            >
              Question Name:
            </label>
            <input
              type="text"
              id="question_name"
              name="question_name"
              value={formData.question_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the question"
            />
            {errors.question_name && (
              <p className="text-red-500 text-sm">{errors.question_name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="question"
              className="block text-gray-700 font-medium mb-2"
            >
              Question:
            </label>
            <input
              type="text"
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the question"
            />
            {errors.question && (
              <p className="text-red-500 text-sm">{errors.question}</p>
            )}
          </div>
          <div>
            <label htmlFor="level" className="block text-gray-700 font-medium mb-2">
              Level:
            </label>
            <input
              type="number"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the level"
            />
            {errors.level && (
              <p className="text-red-500 text-sm">{errors.level}</p>
            )}
          </div>
          <div>
            <label htmlFor="answer" className="block text-gray-700 font-medium mb-2">
              Answer:
            </label>
            <input
              type="number"
              id="answer"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the answer"
            />
            {errors.answer && (
              <p className="text-red-500 text-sm">{errors.answer}</p>
            )}
          </div>
          <div>
            <label htmlFor="choice_1" className="block text-gray-700 font-medium mb-2">
              Choice 1:
            </label>
            <input
              type="text"
              id="choice_1"
              name="choice_1"
              value={formData.choice_1}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter choice 1"
            />
            {errors.choice_1 && (
              <p className="text-red-500 text-sm">{errors.choice_1}</p>
            )}
          </div>
          <div>
            <label htmlFor="choice_2" className="block text-gray-700 font-medium mb-2">
              Choice 2:
            </label>
            <input
              type="text"
              id="choice_2"
              name="choice_2"
              value={formData.choice_2}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter choice 2"
            />
            {errors.choice_2 && (
              <p className="text-red-500 text-sm">{errors.choice_2}</p>
            )}
          </div>
          <div>
            <label htmlFor="choice_3" className="block text-gray-700 font-medium mb-2">
              Choice 3:
            </label>
            <input
              type="text"
              id="choice_3"
              name="choice_3"
              value={formData.choice_3}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter choice 3"
            />
            {errors.choice_3 && (
              <p className="text-red-500 text-sm">{errors.choice_3}</p>
            )}
          </div>
          <div>
            <label htmlFor="choice_4" className="block text-gray-700 font-medium mb-2">
              Choice 4:
            </label>
            <input
              type="text"
              id="choice_4"
              name="choice_4"
              value={formData.choice_4}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter choice 4"
            />
            {errors.choice_4 && (
              <p className="text-red-500 text-sm">{errors.choice_4}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
