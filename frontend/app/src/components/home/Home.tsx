import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import HomeContent from "./HomeContent";

const Home: React.FC = () => {
    return (
      <div>
        <Header />
        <HomeContent />
        <Footer />
      </div>
    );
  };
  
  export default Home;
