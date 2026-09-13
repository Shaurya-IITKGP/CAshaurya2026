import React, { useState } from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const [activeCard, setActiveCard] = useState(null);

  const contacts = [
    {
      name: 'Angothu Gopichand',
      role: 'PUBLICITY & MARKETING HEAD',
      image: '/logos/Gopichand.jpg',
      linkedin: 'https://www.linkedin.com/in/gopichand-angothu-a0a231324?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      instagram: 'https://www.instagram.com/mr_gopi_chand9?stkn=MTQ2dnJmeTB2cDJ6eA==',
      email: 'angothugopichand.shaurya.iitkgp@gmail.com',
    },
    {
      name: 'Sutirtha Jana',
      role: 'PUBLICITY & MARKETING HEAD',
      image: '/logos/sutirtha.jpg',
      linkedin: 'https://www.linkedin.com/in/sutirtha-jana-768548321?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      instagram: 'https://www.instagram.com/s.jana_107?stkn=MWFxMDJwdzJ3bmg4Yg==',
      email: 'sutirthajana.shaurya.iitkgp@gmail.com',
    },
    {
      name: 'Aravind Naik Kethavath',
      role: 'PUBLICITY & MARKETING HEAD',
      image: '/logos/Arvind.jpg',
      linkedin: 'https://www.linkedin.com/in/aravind-naik-kethavath-67a5b8350?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      instagram: 'https://www.instagram.com/aravindnaik__?stkn=MWJlbDBqZjNobXIxaQ%3D%3D&utm_source=qr',
      email: 'aravindnaik.shaurya.iitkgp@gmail.com',
    },
  ];

  // Helper function to open Gmail compose link
  const getGmailLink = (email) =>
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  const handleCardClick = (index, e) => {
    // If link inside card is tapped, allow opening link without toggling
    if (e.target.closest('a')) return;
    setActiveCard((prev) => (prev === index ? null : index));
  };

  return (
    <footer className="relative z-30 w-full bg-black border-t border-yellow-500/30 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-white font-['Inter',sans-serif] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-12 xl:gap-16">

        {/* 🏛️ LEFT SECTION — Organization Info (Logo -> Small Desc -> Contact Icons) */}
        <div className="w-full lg:w-auto flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 max-w-md">
          {/* 1. Logo on top */}
          <img src="/logos/Shaurya_Logo_footer.png" alt="Shaurya IIT Kharagpur Logo" loading="lazy" className="w-44 sm:w-48 h-auto" />

          {/* 2. Description in small font */}
          <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed max-w-md">
            Shaurya is the premier annual sports festival organized by the Technology Students' Gymkhana, IIT Kharagpur — celebrating athletic excellence, sportsmanship, and student leadership across 500+ universities nationwide.
          </p>

          {/* 3. Contact & Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.instagram.com/shaurya.iitkgp/"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="p-2.5 rounded-full bg-black border border-yellow-500/30 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all text-base shadow-md"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/shaurya-iit-kharagpur/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="p-2.5 rounded-full bg-black border border-yellow-500/30 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all text-base shadow-md"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.youtube.com/@ShauryaIITKharagpur"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
              className="p-2.5 rounded-full bg-black border border-yellow-500/30 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all text-base shadow-md"
            >
              <FaYoutube />
            </a>
            <a
              href={getGmailLink("shaurya@iitkgp.ac.in")}
              target="_blank"
              rel="noopener noreferrer"
              title="Email Us"
              className="p-2.5 rounded-full bg-black border border-yellow-500/30 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all text-base shadow-md"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* 👤 RIGHT SECTION — Contact Heads (Photo flush at top in normal state -> Expands to cover full card on hover/tap) */}
        <div className="w-full lg:w-auto flex flex-wrap gap-4 items-center justify-center">
          {contacts.map((person, index) => {
            const isActive = activeCard === index;
            return (
              <div
                key={index}
                onClick={(e) => handleCardClick(index, e)}
                className={`group relative overflow-hidden rounded-sm border bg-[#08080a] w-44 sm:w-48 xl:w-52 h-[265px] flex flex-col justify-between items-center cursor-pointer shadow-2xl transition-colors duration-500 shrink-0 ${
                  isActive ? 'border-yellow-500/50' : 'border-zinc-800 hover:border-yellow-500/50'
                }`}
              >
                {/* Photo Container: Flush at top in normal state -> Expands down (h-full) on hover or tap */}
                <div
                  className={`absolute top-0 left-0 right-0 overflow-hidden transition-all duration-500 ease-in-out z-0 bg-zinc-900 ${
                    isActive ? 'h-full' : 'h-48 group-hover:h-full'
                  }`}
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    loading="lazy"
                    className={`w-full h-full object-cover object-top transform transition-transform duration-700 ease-out ${
                      isActive ? 'scale-105' : 'group-hover:scale-105'
                    }`}
                  />
                  {/* Simple Black/50 Overlay (Fades in on hover or tap) */}
                  <div
                    className={`absolute inset-0 bg-black/50 transition-opacity duration-500 z-10 pointer-events-none ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </div>

                {/* Flow spacer holding top photo height */}
                <div className="w-full h-48 flex-shrink-0 pointer-events-none" />

                {/* Text Info & Icons: Centered lower in non-hover state, shifts up on hover or tap */}
                <div
                  className={`relative z-20 w-full flex flex-col items-center text-center space-y-0.5 pb-2 px-2 transition-transform duration-500 ease-out ${
                    isActive ? '-translate-y-7' : 'translate-y-2.5 group-hover:-translate-y-7'
                  }`}
                >
                  <h3 className="text-sm font-bold text-white tracking-wide font-['Poppins'] drop-shadow-md">
                    {person.name}
                  </h3>
                  <p className="text-[10px] font-bold text-yellow-400 tracking-wider uppercase font-['Poppins'] leading-tight max-w-[170px] drop-shadow-md">
                    {person.role}
                  </p>

                  {/* 3 Circular Outlined Social Icons */}
                  <div
                    className={`flex items-center justify-center gap-2.5 pt-1.5 transition-all duration-500 delay-100 transform ${
                      isActive
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto'
                    }`}
                  >
                    <a
                      href={person.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram"
                      className="w-7 h-7 rounded-full border border-gray-300/80 hover:border-yellow-400 text-white hover:text-yellow-400 flex items-center justify-center text-xs transition-all bg-black/40 hover:bg-black/90 shadow-md hover:scale-110"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href={getGmailLink(person.email)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Email"
                      className="w-7 h-7 rounded-full border border-gray-300/80 hover:border-yellow-400 text-white hover:text-yellow-400 flex items-center justify-center text-xs transition-all bg-black/40 hover:bg-black/90 shadow-md hover:scale-110"
                    >
                      <FaEnvelope />
                    </a>
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      className="w-7 h-7 rounded-full border border-gray-300/80 hover:border-yellow-400 text-white hover:text-yellow-400 flex items-center justify-center text-xs transition-all bg-black/40 hover:bg-black/90 shadow-md hover:scale-110"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;