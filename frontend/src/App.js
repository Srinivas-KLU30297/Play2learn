import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import HomePage from "@/pages/HomePage";
import AlphabetsPage from "@/pages/AlphabetsPage";
import RhymesPage from "@/pages/RhymesPage";
import NumbersPage from "@/pages/NumbersPage";
import QuizPage from "@/pages/QuizPage";
import GamesMenuPage from "@/pages/GamesMenuPage";
import MemoryMatchGame from "@/pages/games/MemoryMatchGame";
import LetterCatchGame from "@/pages/games/LetterCatchGame";
import CountObjectsGame from "@/pages/games/CountObjectsGame";
import ShapeMatchGame from "@/pages/games/ShapeMatchGame";
import AboutPage from "@/pages/AboutPage";
import Layout from "@/components/Layout";
import "@/App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/alphabets" element={<AlphabetsPage />} />
            <Route path="/rhymes" element={<RhymesPage />} />
            <Route path="/numbers" element={<NumbersPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/games" element={<GamesMenuPage />} />
            <Route path="/games/memory-match" element={<MemoryMatchGame />} />
            <Route path="/games/letter-catch" element={<LetterCatchGame />} />
            <Route path="/games/count-objects" element={<CountObjectsGame />} />
            <Route path="/games/shape-match" element={<ShapeMatchGame />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;