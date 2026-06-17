"use client";

import { motion } from "framer-motion";

// Custom SVG Brand Logo Icon based on design assets
const BrandLogoIcon = () => (
  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

// Social Media SVGs matching your design circle icons
const XIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export default function FooterSection() {
  
  // Frame Motion reveal setups mimicking custom layout AOS transitions
  const footerContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Smooth progressive list rendering triggers
      }
    }
  };

  const footerItemVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] } 
    }
  };

  return (
    <footer className="w-full bg-[#0B0F19] border-t border-zinc-800 text-zinc-400 font-sans selection:bg-indigo-500/30">
      
      {/* Upper Footer Links Workspace */}
      <motion.div 
        variants={footerContainerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-6"
      >
        
        {/* Column 1: Core App Brand Summary */}
        <motion.div variants={footerItemVariant} className="md:col-span-4 flex flex-col items-start gap-4">
          <div className="flex items-center gap-2 text-white">
            <BrandLogoIcon />
            <span className=" text-[1.5rem] font-extrabold tracking-tight">Digital Life Lessons</span>
          </div>
          <p className="text-xs font-medium text-zinc-400 leading-relaxed max-w-xs pr-4">
            A platform to capture, share, and grow from lifes most valuable lessons.
          </p>
        </motion.div>

        {/* Column 2: Explore Hyperlinks */}
        <motion.div variants={footerItemVariant} className="md:col-span-2 flex flex-col gap-3.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Explore</h4>
          <ul className="flex flex-col gap-2.5 text-xs font-medium">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Public Lessons</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
          </ul>
        </motion.div>

        {/* Column 3: Support Hyperlinks */}
        <motion.div variants={footerItemVariant} className="md:col-span-2 flex flex-col gap-3.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Support</h4>
          <ul className="flex flex-col gap-2.5 text-xs font-medium">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
          </ul>
        </motion.div>

        {/* Column 4: Connect Channel Metrics */}
        <motion.div variants={footerItemVariant} className="md:col-span-4 flex flex-col items-start gap-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Connect</h4>
          
          {/* Social Rounded Icon Circle List */}
          <div className="flex items-center gap-3">
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5">
              <XIcon />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5">
              <FacebookIcon />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5">
              <InstagramIcon />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5">
              <LinkedinIcon />
            </a>
          </div>

          {/* Email context metadata display */}
          <div className="flex flex-col gap-0.5 mt-2">
            <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wide">Email</span>
            <a href="mailto:support@digitallifelessons.com" className="text-xs font-semibold text-zinc-300 hover:text-indigo-400 transition-colors">
              support@digitallifelessons.com
            </a>
          </div>
        </motion.div>

      </motion.div>

      {/* Lower Footer Bottom Divider Copy Strip */}
      <div className="w-full border-t border-zinc-900/80 bg-[#090D16]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-medium text-zinc-500">
          <p>© 2026 Digital Life Lessons. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-zinc-400 transition-colors">Security</span>
            <span className="cursor-pointer hover:text-zinc-400 transition-colors">System Status</span>
          </div>
        </div>
      </div>

    </footer>
  );
}