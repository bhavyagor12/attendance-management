import React from 'react'
import Nav from "../components/Navbar";
import Banner from "../components/StudentBanner";
import StudentSubject from "../components/StudentSubject";

const StudentPage = () => {
  return (
    <div>
        <Nav />
        <Banner />
        <div class="my-auto flex flex-wrap justify-around pt-2 pb-12 gap-24">
            <StudentSubject />
            <StudentSubject />
            <StudentSubject />
        </div>
    </div>
  )
}

export default StudentPage