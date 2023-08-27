import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LecturePage from "./pages/LecturePage";
import SubjectPage from "./pages/SubjectPage";
import ReportPage from "./pages/ReportPage";
import { infoState } from "./atoms/infoState";
import { useRecoilValue } from "recoil";
function App() {
  const userinfo = useRecoilValue(infoState);
  console.log(userinfo.ID === undefined || userinfo.ID === "");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {userinfo.ID === undefined || userinfo.ID === "" ? (
            <>
              <Route path="*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </>
          ) : (
            <>
              <Route path="/lecture/:lectureId" element={<LecturePage />} />
              <Route path="/subject/:subjectId" element={<SubjectPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<LoginPage />} /> */}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
