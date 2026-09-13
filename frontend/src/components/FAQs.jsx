import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

const faqs = [
  {
    question: "WHO IS ELIGIBLE TO APPLY FOR SHAURYA CAMPUS AMBASSADOR?",
    answer: "Any active undergraduate, postgraduate, or diploma student enrolled in a recognized university or college across India is eligible to apply for the Campus Ambassador role.",
  },
  {
    question: "IS THERE ANY REGISTRATION FEE TO BECOME A CA?",
    answer: "No! Application and participation in the Shaurya Campus Ambassador Program is 100% free of charge.",
  },
  {
    question: "WHAT IS THE WEEKLY TIME COMMITMENT REQUIRED?",
    answer: "The program requires around 3 to 5 hours per week, flexibly dedicated to social media posting, campus outreach, and contingent management.",
  },
  {
    question: "HOW DO I EARN POINTS AND CLIMB THE LEADERBOARD?",
    answer: "Points are awarded based on athlete registrations through your unique referral code/link, social media task submissions, poster distribution, and contingent size.",
  },
  {
    question: "DO I RECEIVE AN OFFICIAL CERTIFICATE FROM IIT KHARAGPUR?",
    answer: "Yes! All active Campus Ambassadors who achieve the Bronze Tier threshold (100+ points) will receive an official Certificate of Participation from Technology Students' Gymkhana, IIT Kharagpur.",
  },
];

const FAQ = () => {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 50 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 50 });
  const backgroundX = useTransform(smoothX, [0, typeof window !== "undefined" ? window.innerWidth : 1000], ["-2%", "2%"]);
  const backgroundY = useTransform(smoothY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], ["-2%", "2%"]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const [activeIndex, setActiveIndex] = useState(null);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    question: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyDigits = value.replace(/\D/g, '');
      setForm({ ...form, [name]: onlyDigits });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.phone.match(/^\d{10}$/)) newErrors.phone = "Phone number must be 10 digits.";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.question.trim()) newErrors.question = "Please enter your question.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/faq`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        throw new Error('Failed to submit');
      }

      setErrors({});
      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', question: '' });
      toast.success('Thank you! Your question has been submitted.', { icon: "✅" });
    } catch (err) {
      setSubmitted(false);
      toast.error('There was an error sending your question. Please try again.', { icon: "⚠️" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full relative flex flex-col items-center py-6 text-left min-h-screen overflow-hidden">
      <ToastContainer 
        position="bottom-center" 
        autoClose={4000} 
        hideProgressBar={false} 
        newestOnTop={true}
        closeOnClick
        theme="dark"
        toastStyle={{ 
          backgroundColor: "#000", 
          color: "#fff", 
          border: "1px solid rgba(250, 204, 21, 0.4)",
          borderRadius: "12px",
          boxShadow: "0 10px 25px -5px rgba(250, 204, 21, 0.1), 0 8px 10px -6px rgba(250, 204, 21, 0.1)"
        }}
        progressStyle={{ background: "#facc15" }}
      />
      {/* 🎬 Fixed 100% Viewport Edge-to-Edge Background Image Layer (No zoom on content expand) */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none max-w-full" style={{ transform: "translateZ(0)" }}>
        <motion.img
          style={{ x: backgroundX, y: backgroundY, scale: 1.05 }}
          src="/images/C0016T01.JPG"
          alt="FAQs Background"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-100"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Centered Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-8 space-y-12 flex flex-col items-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center w-full max-w-4xl mx-auto space-y-3 pt-6"
        >
          <span className="text-xs font-extrabold text-yellow-400 uppercase tracking-widest block">
            NEED CLARIFICATION?
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight font-['Barlow_Condensed',sans-serif]">
            <span className="block text-white">FREQUENTLY ASKED</span>
            <span className="block text-yellow-400">QUESTIONS</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about the Shaurya Campus Ambassador Program, tasks, and reward structure.
          </p>
        </motion.div>

        {/* ACCORDION LIST */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="w-full max-w-4xl space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              className="bg-black border border-yellow-500/20 hover:border-yellow-400 rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center text-sm sm:text-base font-extrabold uppercase font-['Inter',sans-serif] text-white hover:text-yellow-400 transition-colors"
                onClick={() => toggle(index)}
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 text-xl font-bold text-yellow-400"
                >
                  {activeIndex === index ? '−' : '+'}
                </motion.span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/10 mt-2">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* ASK QUESTION FORM BOX */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl mt-4 p-8 rounded-2xl bg-black border border-yellow-500/20 hover:border-yellow-400/50 shadow-2xl transition-all duration-300 space-y-6"
        >
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-black text-yellow-400 font-['Barlow_Condensed',sans-serif] uppercase">
              HAVE A QUESTION? ASK US DIRECTLY
            </h3>
            <p className="text-xs text-gray-300">
              Submit your query and our Campus Ambassador team will respond shortly.
            </p>
          </div>


          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-yellow-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Rahul Sharma"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#121216] border border-yellow-500/20 rounded-xl text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-yellow-400 mb-1">
                  Phone Number (10 Digits)
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="e.g. 9876543210"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={10}
                  className="w-full px-4 py-3 bg-[#121216] border border-yellow-500/20 rounded-xl text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-yellow-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. rahul@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#121216] border border-yellow-500/20 rounded-xl text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-yellow-400 mb-1">
                Your Question
              </label>
              <textarea
                name="question"
                rows={3}
                placeholder="Type your inquiry here..."
                value={form.question}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#121216] border border-yellow-500/20 rounded-xl text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
              />
              {errors.question && <p className="text-red-400 text-xs mt-1">{errors.question}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded font-extrabold text-xs tracking-wider uppercase text-black bg-yellow-400 hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20 cursor-pointer"
            >
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT QUESTION'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;

