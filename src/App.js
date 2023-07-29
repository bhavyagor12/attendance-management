import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LecturePage from "./pages/LecturePage";
import SubjectPage from "./pages/SubjectPage";
import StudentPage from "./pages/StudentPage";
import ReportPage from "./pages/ReportPage";
function App() {
  function getDaysDate(day) {
    const mapDayToNumber = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6
    }
    day = mapDayToNumber[day.toLowerCase()];
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // Sunday is 0, Monday is 1, and so on.
    const daysUntilDay = currentDayOfWeek === day-1 ? 6 : day - currentDayOfWeek;
    // Calculate the date of Monday by subtracting the number of days from today.
    const dayDate = new Date(today);
    dayDate.setDate(today.getDate() + daysUntilDay);
    return dayDate;
  }
  const dayDate = getDaysDate("wednesday");
  console.log(dayDate.toDateString()); // Output: The date of the current week's Monday
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/lecture/:lectureId" element={<LecturePage />} />
          <Route path="/subject/:subjectId" element={<SubjectPage />} />
          <Route path="/student/:sapId" element={<StudentPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
