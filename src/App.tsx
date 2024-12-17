import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import CodeComplexityAnalyzer, { ComplexityResult } from "./algorithms";
import { algoExamplesList } from "./data/algorithms-example";
import { Loader } from "lucide-react";
import { CodeComplexityDialog } from "./components/result-modal";
import History from "./pages/History";
import AlgorithmComparison from "./pages/AlgorithmComparison";
import Learning from "./pages/Learning";

function HomePage() {
  const [code, setCode] = useState("");
  const [results, setResults] = useState<ComplexityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const answer = CodeComplexityAnalyzer.analyzeCode(code);

    console.log(answer);

    setTimeout(() => {
      setResults(answer);
      setLoading(false);
      setIsDialogOpen(true);
    }, 1500);
  };

  return (
    <div className="max-w-2xl min-h-screen flex items-center justify-center flex-col mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Code Complexity Analyzer</h1>
      <img src="/vite.svg" alt="Vite logo"/>
      <form onSubmit={handleSubmit} className="space-y-4 w-full mt-4">
        <Textarea
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-48 p-2 border border-gray-300 rounded"
        />

        <div className="flex flex-wrap gap-2">
          {algoExamplesList.map((algo) => (
            <Badge
              key={algo.key}
              onClick={() => setCode(algo.code)}
              className="cursor-pointer"
            >
              {algo.title}
            </Badge>
          ))}
        </div>
        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800"
          loading={loading}
        >
          Analyze Complexity
          <Loader className={loading ? "" : "hidden"} />
        </Button>
      </form>

      {results && (
        <CodeComplexityDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          data={results}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black">
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">
              Complexity Analyzer
            </Link>
            <div className="space-x-4">
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
              <Link to="/history" className="hover:text-gray-300">
                History
              </Link>
              <Link to="/compare" className="hover:text-gray-300">
                Compare
              </Link>
              <Link to="/learn" className="hover:text-gray-300">
                Learn
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<History />} />
          <Route path="/compare" element={<AlgorithmComparison />} />
          <Route path="/learn" element={<Learning />} />
        </Routes>
      </div>
    </Router>
  );
}
