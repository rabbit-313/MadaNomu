import React, { createContext, useState, useContext } from "react";

// Context を作成
const CorrectContext = createContext();

// Context プロバイダーを定義
export const CorrectProvider = ({ children }) => {
  const [correct, setCorrect] = useState(0);

  return (
    <CorrectContext.Provider value={{ correct, setCorrect }}>
      {children}
    </CorrectContext.Provider>
  );
};

// Context を利用するカスタムフック
export const useCorrect = () => {
  return useContext(CorrectContext);
};
