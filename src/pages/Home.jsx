import React from "react";
import Banner from "../components/Banner";
import Nav from "../components/Navbar";
import SubjectCard from "../components/SubjectCard";

const Home = () => {
  return (
    <div>
      <Nav />
      <Banner />
      <div class="container mx-auto my-auto flex flex-wrap justify-around pt-4 pb-12 gap-2">
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
      </div>
    </div>
  );
};

export default Home;
