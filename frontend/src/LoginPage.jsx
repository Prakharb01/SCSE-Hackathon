import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const getAuth = () => typeof window !== 'undefined' && localStorage.getItem('auth');

export default function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getAuth()) {
      navigate('/app', { replace: true });
    }
  }, []);

  const handleLogin = async (event) => {
    if (event) event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const query = new URLSearchParams({ name, pass }).toString();
      const response = await fetch(`http://localhost:3000/login?${query}`);

      if (!response.ok) {
        if (response.status === 401) {
          setError("Incorrect name or password.");
        } else {
          setError("Login failed. Please try again.");
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem('auth', JSON.stringify(data.user));
      navigate('/app', { replace: true });
    } catch (fetchError) {
      setError("Unable to reach the server. Please try again later.");
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!name || !pass) {
      setError("Please enter both name and password to sign up.");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      const query = new URLSearchParams({ name, pass }).toString();
      const response = await fetch(`http://localhost:3000/signup?${query}`, {
        method: 'POST'
      });

      if (!response.ok) {
        if (response.status === 409) {
          setError("User already exists. Please try logging in.");
        } else {
          setError("Signup failed. Please try again.");
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      setError("Signup successful! You can now log in.");
      setLoading(false);
    } catch (fetchError) {
      setError("Unable to reach the server. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white font-mono overflow-hidden">
      
      {/* LEFT SIDE: HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-2/3 relative items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('cozzet-jamshedpur-blog-img1.jpg')",
        }}
      >
        {/* Animated Overlay Gradients */}
        <div className="absolute inset-0 bg-black/70 "></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-transparent"></div>
        
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

        <div className="relative text-center px-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-2 border-pink-500 mx-auto mb-8 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)]"
          >
            <div className="w-8 h-8 bg-pink-500 animate-pulse"></div>
          </motion.div>

          <motion.p 
            initial={{ letterSpacing: "0.1em" }}
            animate={{ letterSpacing: "0.4em" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            className="text-xs font-bold text-purple-400 mb-4"
          >
            NEXUS // NETWORK
          </motion.p>

          <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
              CONNECT
            </span> 
            <br />
            <span className="text-cyan-400 hover:text-cyan-300 transition-colors">NEO-JAMSHEDPUR</span>
          </h1>

          <p className="text-gray-400 mt-6 text-sm max-w-md mx-auto leading-relaxed border-l-2 border-pink-500 pl-4 bg-white/5 py-2">
            Identity verified. Signal encrypted. <br/>
            <span className="text-pink-400/80">Location: 22.8046° N, 86.2029° E</span>
          </p>

          <div className="flex justify-center gap-4 mt-10">
            {['ENCRYPTED', 'STEALTH', 'DECENTRAL'].map((tag, i) => (
              <motion.span 
                key={tag}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(236,72,153,0.2)" }}
                className="border border-pink-500/50 px-4 py-1 text-[10px] cursor-crosshair"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE: LOGIN FORM */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/3 bg-[#000000] p-8 md:p-16 flex flex-col justify-center border-l border-white/10 relative"
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-pink-500/30"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/30"></div>

        <div className="mb-12">
          <p className="text-[10px] tracking-[0.3em] text-cyan-400 mb-2">SYSTEM_AUTH_REQUIRED</p>
          <h2 className="text-4xl font-bold text-white tracking-tighter">
            USER <span className="text-pink-500">LOGIN</span>
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="group relative">
            <input
              type="text"
              placeholder="CITIZEN_ID"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 focus:border-pink-500 focus:outline-none transition-all placeholder:text-gray-600 text-cyan-400"
            />
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-pink-500 group-focus-within:w-full transition-all duration-500"></div>
          </div>

          <div className="group relative">
            <input
              type="password"
              placeholder="ACCESS_CODE"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none transition-all placeholder:text-gray-600 text-pink-400"
            />
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan-400 group-focus-within:w-full transition-all duration-500"></div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <motion.button 
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(236,72,153,0.4)" }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-pink-500 text-black font-black py-4 tracking-widest hover:bg-pink-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "CONNECTING..." : "INITIALIZE SESSION"}
          </motion.button>
        </form>

        <div className="mt-8 flex justify-between items-center text-[10px]">
          <span className="text-gray-500 hover:text-cyan-400 cursor-pointer transition-colors underline decoration-cyan-500/20">RECOVER KEY</span>
          <span className="text-gray-500 uppercase">Ver. 4.0.2-Build</span>
        </div>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <div className="relative flex justify-center text-xs"><span className="bg-[#0a0a0a] px-4 text-gray-600">LINK NEURAL BRIDGE</span></div>
        </div>

        <button className="w-full border border-cyan-400/50 py-3 text-cyan-400 text-xs tracking-widest hover:bg-cyan-400/10 transition-all uppercase">
          External Provider
        </button>

        <p className="text-[10px] text-center text-gray-500 mt-10">
          Unregistered citizen? <span className="text-pink-500 font-bold cursor-pointer hover:underline" onClick={handleSignup}>APPLY FOR CITIZENSHIP</span>
        </p>
      </motion.div>
    </div>
  );
}