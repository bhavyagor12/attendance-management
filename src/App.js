import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LecturePage from "./pages/LecturePage";
import SubjectPage from "./pages/SubjectPage";
import StudentPage from "./pages/StudentPage";
import ReportPage from "./pages/ReportPage";
import { getDaysDateTime } from "./utils/helpers";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/lecture/:lectureId" element={<LecturePage />} />
          <Route path="/subject/:subjectId" element={<SubjectPage />} />
          <Route path="/student/:sapId" element={<StudentPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
