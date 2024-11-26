import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CorrectProvider } from "./components/correct";
import { UserProvider } from "./components/usercontext";
import Home from './components/home';
import AddQuestion from './components/add_question';
import QuestionPage from './components/question_display';
import Results from './components/results';

export default function App() {
  return (
    <UserProvider>
      <CorrectProvider>
        <Router>
          <div className="bg-gray-100 min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4 shadow-md">
              <h1 className="text-xl font-bold text-center">まだ飲める？？</h1>
            </header>
            <main className="flex-1 p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add_question" element={<AddQuestion />} />
                <Route path="/question_display/:id" element={<QuestionPage />} />
                <Route path="/results" element={<Results />} />
              </Routes>
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
              <p>© 2024 MadaNomeru?</p>
            </footer>
          </div>
        </Router>
      </CorrectProvider>
    </UserProvider>
  );
}
