import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SubjectPage from "./pages/SubjectPage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/subject/:subjectId" element={<SubjectPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
