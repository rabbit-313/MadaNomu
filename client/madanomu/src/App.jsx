import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Question from './components/question';


export default function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <h1 className="text-xl font-bold text-center">MadaNomu</h1>
        </header>
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/question" element={<Question />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>© 2024 MadaNomu</p>
        </footer>
      </div>
    </Router>
  );
}
