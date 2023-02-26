import React from "react";
import Banner from "../components/Banner";
import Nav from "../components/Navbar";
import SubjectCard from "../components/SubjectCard";
import { useRecoilValue } from "recoil";
import { infoState } from "../atoms/infoState";
import Table from "../components/Table";

const Home = () => {
  const info = useRecoilValue(infoState);
  console.log(info)
  return (
    <div>
      <Nav />
      <Banner />
      <div class="container mx-auto my-auto flex flex-wrap justify-around pt-4 pb-12 gap-2">
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
      </div>
      <div className="mt-24">{info.name}</div>
      <Table />
    </div>
  );
};

export default Home;
