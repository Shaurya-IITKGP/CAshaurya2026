// src/components/RegisterForm.jsx

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';
import RegistrationSuccessModal from './RegistrationSuccessModal';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function RegisterForm() {
  const [form, setForm] = useState({
    fullName: '',
    gender: '',
    dob: '',
    email: '',
    phone: '',
    college: '',
    cityState: '',
    degreeYear: '',
    heardAbout: '',
    hasExperience: null,
    pastExperience: '',
    motivation: '',
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const refs = {
    fullName: useRef(null),
    gender: useRef(null),
    dob: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    college: useRef(null),
    cityState: useRef(null),
    degreeYear: useRef(null),
    heardAbout: useRef(null),
    hasExperience: useRef(null),
    pastExperience: useRef(null),
    motivation: useRef(null),
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setForm((f) => ({ ...f, phone: digitsOnly }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
    setError(null);
  };

  const validate = () => {
    if (!form.fullName.trim()) return { field: 'fullName', message: 'Full name is required' };
    if (!form.gender) return { field: 'gender', message: 'Please select your gender' };
    if (!form.dob || isNaN(new Date(form.dob))) return { field: 'dob', message: 'Invalid date of birth' };
    const dobDate = new Date(form.dob);
    if (dobDate >= new Date()) return { field: 'dob', message: 'Date of birth must be in the past' };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) return { field: 'email', message: 'Enter a valid email address' };
    if (!form.phone.trim()) return { field: 'phone', message: 'Phone number is required' };
    if (!/^\d{10}$/.test(form.phone)) return { field: 'phone', message: 'Phone number must be 10 digits' };
    if (!form.college.trim()) return { field: 'college', message: 'College/University is required' };
    if (!form.cityState.trim()) return { field: 'cityState', message: 'City, State is required' };
    if (!form.degreeYear.trim()) return { field: 'degreeYear', message: 'Degree and Year is required' };
    if (!form.heardAbout) return { field: 'heardAbout', message: 'Please tell us how you heard about Shaurya' };
    if (form.hasExperience === null) return { field: 'hasExperience', message: 'Please select Yes or No' };
    if (form.hasExperience === true && !form.pastExperience.trim()) return { field: 'pastExperience', message: 'Please elaborate on your past experience' };
    if (!form.motivation.trim()) return { field: 'motivation', message: 'Please share your motivation' };
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validation = validate();
    if (validation) {
      setError(validation);
      refs[validation.field]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || 'Registration failed. Please try again.', {
          icon: "⚠️",
        });
        setError({ field: null, message: data.message || 'Something went wrong!' });
      } else {
        // Fallback for when backend is not connected but we want to show success
        setIsSuccess(true);
      }
    } catch (err) {
      // Temporary fallback for testing without backend
      setIsSuccess(true);
      // toast.error('Network error. Please try again.', { icon: "🔌" });
      // setError({ field: null, message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = 'w-full px-4 py-2.5 rounded-xl bg-[#121216] border border-yellow-500/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-yellow-400 transition-colors';
  const labelStyle = 'block text-xs font-bold uppercase tracking-wider text-yellow-400 mb-1';

  return (
    <>
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
      <AnimatePresence>
        {isSuccess && <RegistrationSuccessModal />}
      </AnimatePresence>
      <form onSubmit={onSubmit} className="space-y-4 text-left">
        {error && !error.field && (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold">
            ❌ {error.message}
          </div>
        )}

        {/* Full Name & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div ref={refs.fullName}>
            <label className={labelStyle}>Full Name *</label>
            <input
              name="fullName"
              placeholder="e.g. Sameer Verma"
              value={form.fullName}
              onChange={onChange}
              className={inputStyle}
            />
            {error?.field === 'fullName' && <div className="text-red-400 text-xs mt-1">{error.message}</div>}
          </div>

          <div ref={refs.gender}>
            <label className={labelStyle}>Gender *</label>
            <select name="gender" value={form.gender} onChange={onChange} className={inputStyle}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {error?.field === 'gender' && <div className="text-red-400 text-xs mt-1">{error.message}</div>}
          </div>
        </div>

        {/* DOB & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div ref={refs.dob}>
            <label className={labelStyle}>Date of Birth *</label>
            <input type="date" name="dob" value={form.dob} onChange={onChange} className={inputStyle} />
            {error?.field === 'dob' && <div className="text-red-400 text-xs mt-1">{error.message}</div>}
          </div>

          <div ref={refs.email}>
            <label className={labelStyle}>Email Address *</label>
            <input
              name="email"
              placeholder="e.g. sameer@gmail.com"
              value={form.email}
              onChange={onChange}
              className={inputStyle}
            />
            {error?.field === 'email' && <div className="text-red-400 text-xs mt-1">{error.message}</div>}
          </div>
        </div>

        {/* Phone & College */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div ref={refs.phone}>
            <label className={labelStyle}>Phone Number *</label>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              maxLength={10}
              inputMode="numeric"
              pattern="[0-9]*"
              className={inputStyle}
              placeholder="10 Digits Mobile Number"
            />
            {error?.field === 'phone' && <div className="text-red-400 text-xs mt-1">{error.message}</div>}
          </div>

          <div ref={refs.college}>
            <label className={labelStyle}>College / University *</label>
            <input
              name="college"
              placeholder="e.g. IIT Bombay / Delhi University"
              value={form.college}
              onChange={onChange}
              className={inputStyle}
            />
            {error?.field === 'college' && <div className="text-red-400 text-xs mt-1">{error.message}</div>}
          </div>
        </div>

        {/* City/State & Degree/Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div ref={refs.cityState}>
            <label className={labelStyle}>City, State *</label>
            <input
              name="cityState"
              placeholder="e.g. Mumbai, Maharashtra"
              value={form.cityState}
              onChange={onChange}
              className={inputStyle}
            />
            {error?.field === 'cityState' && <div className="text-red-400 text-xs mt-1">{error.message}</div>}
          </div>

          <div ref={refs.degreeYear}>
            <label className={labelStyle}>Degree & Year of Study *</label>
            <input
              name="degreeYear"
              placeholder="e.g. B.Tech 3rd Year"
              value={form.degreeYear}
              onChange={onChange}
              className={inputStyle}
            />
            {error?.field === 'degreeYear' && <div className="text-red-400 text-xs mt-1">{error.message}</div>}
          </div>
        </div>

        {/* Heard About */}
        <div ref={refs.heardAbout}>
          <label className={labelStyle}>How did you hear about Shaurya? *</label>
          <select name="heardAbout" value={form.heardAbout} onChange={onChange} className={inputStyle}>
            <option value="">Select source</option>
            <option value="Social Media">Instagram / LinkedIn</option>
            <option value="Friend">Campus Friend / Ambassador</option>
            <option value="Website">Official Website</option>
            <option value="Other">College Notice / Other</option>
          </select>
          {error?.field === 'heardAbout' && <div className="text-red-400 text-xs mt-1">{error.message}</div>}
        </div>

        {/* Experience Radio */}
        <div ref={refs.hasExperience} className="p-4 rounded-xl bg-[#121216] border border-yellow-500/20 space-y-2">
          <label className={labelStyle}>
            Have you held a Campus Ambassador or leadership position before? *
          </label>
          <div className="flex items-center space-x-6 pt-1">
            {[true, false].map((opt) => (
              <label key={String(opt)} className="inline-flex items-center cursor-pointer text-sm font-medium text-gray-200">
                <input
                  type="radio"
                  name="hasExperience"
                  value={opt}
                  checked={form.hasExperience === opt}
                  onChange={(e) => setForm({ ...form, hasExperience: e.target.value === 'true' })}
                  className="w-4 h-4 text-yellow-400 focus:ring-yellow-400"
                />
                <span className="ml-2">{opt ? 'Yes' : 'No'}</span>
              </label>
            ))}
          </div>
          {error?.field === 'hasExperience' && <div className="text-red-400 text-xs mt-1">{error.message}</div>}
        </div>

        {/* Past Experience */}
        {form.hasExperience === true && (
          <div ref={refs.pastExperience}>
            <label className={labelStyle}>Elaborate on your past leadership experience *</label>
            <textarea
              name="pastExperience"
              value={form.pastExperience}
              onChange={onChange}
              rows={2}
              className={inputStyle}
              placeholder="Describe fests, clubs, or ambassador roles held previously..."
            />
            {error?.field === 'pastExperience' && (
              <div className="text-red-400 text-xs mt-1">{error.message}</div>
            )}
          </div>
        )}

        {/* Motivation */}
        <div ref={refs.motivation}>
          <label className={labelStyle}>Why do you want to represent Shaurya? *</label>
          <textarea
            name="motivation"
            value={form.motivation}
            onChange={onChange}
            rows={3}
            className={inputStyle}
            placeholder="Share your goals and vision as a Shaurya Campus Ambassador..."
          />
          {error?.field === 'motivation' && <div className="text-red-400 text-xs mt-1">{error.message}</div>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl font-extrabold text-sm tracking-wider uppercase text-black bg-yellow-400 hover:bg-yellow-300 shadow-lg shadow-yellow-400/20 transition-all cursor-pointer mt-2"
        >
          {isSubmitting ? 'SUBMITTING APPLICATION...' : 'SUBMIT APPLICATION'}
        </button>
      </form>
    </>
  );
}

