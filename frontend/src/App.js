import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import TestListPage from "./pages/TestListPage";
import LanguageTest from "./pages/LanguageTest";
import MemoryTest from "./pages/MemoryTest";
import AttentionTest from "./pages/AttentionTest";
import ResultsPage from "./pages/ResultsPage";
import OrientationTest from "./pages/OrientationTest";
import VisualTest from "./pages/VisualTest";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tests" element={<TestListPage />} />
          <Route path="/test/language" element={<LanguageTest />} />
          <Route path="/test/memory" element={<MemoryTest />} />
          <Route path="/test/attention" element={<AttentionTest />} />
          <Route path="/test/orientation" element={<OrientationTest />} />
          <Route path="/test/visual" element={<VisualTest />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;