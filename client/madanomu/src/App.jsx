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
          <div className="bg-black text-gray-100 min-h-screen flex flex-col">
            <header className="bg-orange-500 shadow-lg">
              <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-wider">
                  まだ飲む？？ 
                </h1>
              </div>
            </header>
            <main className="flex-1 container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add_question" element={<AddQuestion />} />
                <Route path="/question_display/:id" element={<QuestionPage />} />
                <Route path="/results" element={<Results />} />
              </Routes>
            </main>
            <footer className="bg-gray-900 text-orange-500 py-4">
              <div className="container mx-auto text-center">
                <p className="text-sm">© 2024 MadaNomu?</p>
              </div>
            </footer>
          </div>
        </Router>
      </CorrectProvider>
    </UserProvider>
  );
}
