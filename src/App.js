import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MarkAttendance from "./pages/MarkAttendance";
import SubjectPage from "./pages/SubjectPage";
import StudentPage from "./pages/StudentPage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/markAttendance/:lectureId" element={<MarkAttendance />} />
          <Route path="/subject/:subjectId" element={<SubjectPage />} />
          <Route path="/student/:sapId" element={<StudentPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
