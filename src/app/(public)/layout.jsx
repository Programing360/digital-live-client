import FooterSection from "@/component/FooterSection";
import Navbar from "@/component/Navbar";
import React from "react";

const layoutPage = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main>{children}</main>
      <FooterSection></FooterSection>
    </div>
  );
};

export default layoutPage;
