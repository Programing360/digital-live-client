import FooterSection from "@/component/FooterSection";
import Navbar from "@/component/Navbar";
import React from "react";

const layoutPage = ({ children }) => {
  return (
    <div>
      <header className="sticky top-0 z-50">
        <Navbar></Navbar>
      </header>
      <main>{children}</main>
      <FooterSection></FooterSection>
    </div>
  );
};

export default layoutPage;
