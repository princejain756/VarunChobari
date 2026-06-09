import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Menu, 
  X, 
  Award, 
  Compass, 
  Briefcase, 
  Cpu, 
  Sparkles, 
  Send, 
  Clock, 
  ChevronRight, 
  Volume2, 
  CheckCircle,
  ShieldCheck,
  Zap,
  Layers,
  Check,
  TrendingUp,
  Sliders,
  Maximize2
} from "lucide-react";
import { projects, processSteps, experienceMilestones, awards, testimonials, corePhilosophy } from "./data";
import { Project } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("HOME");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Custom interactive cursor tracking state
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  
  // AI Double Consultation chat state
  const [aiInquiry, setAiInquiry] = useState("");
  const [aiContext, setAiContext] = useState("Brand Strategy");
  const [aiChat, setAiChat] = useState<Array<{ role: "user" | "model"; text: string }>>([
    {
      role: "model",
      text: "Welcome. I am Aaron's digital twin. Provide me with your brand's core concept, or present a creative challenge. I will design a high-prestige strategic direction for you."
    }
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [formName, setFormName] = useState("");
  const [formMessage, setFormMessage] = useState("");
  
  // Navigation scrolling logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveTab(sectionId.toUpperCase());
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Chat request to Aaron's AI Creative Double
  const handleAiConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInquiry.trim()) return;

    const userMsg = aiInquiry;
    setAiInquiry("");
    setAiChat((prev) => [...prev, { role: "user", text: userMsg }]);
    setAiLoading(true);

    try {
      const response = await fetch("/api/curator-consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          context: aiContext,
          chatHistory: aiChat
        })
      });

      const data = await response.json();
      if (data.reply) {
        setAiChat((prev) => [...prev, { role: "model", text: data.reply }]);
      } else {
        setAiChat((prev) => [
          ...prev,
          { role: "model", text: "The Creative Double remains in contemplative silence. Verify your parameter metrics." }
        ]);
      }
    } catch (err) {
      console.error(err);
      setAiChat((prev) => [
        ...prev,
        { role: "model", text: "A silent network interval occurred. Let us re-evaluate when presence reconnects." }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail || !formName || !formMessage) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormName("");
      setFormEmail("");
      setFormMessage("");
    }, 4500);
  };

  return (
    <div className="relative min-h-screen bg-film-grain overflow-hidden selection:bg-[#F5F5F0] selection:text-black font-sans text-[#F5F5F0]">
      
      {/* Cinematic ambient lighting flares - Muted Elegant Dark tones */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white/5 rounded-full filter blur-[120px] pointer-events-none ambient-glow" />
      <div className="absolute bottom-1/4 left-[-10vw] w-[40vw] h-[40vw] bg-stone-500/5 rounded-full filter blur-[150px] pointer-events-none ambient-glow" />

      {/* Floating Interactive Custom Cursor for Elite Vibe (Desktop Only) */}
      <div 
        className="hidden md:block fixed pointer-events-none z-50 transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      >
        <div className={`rounded-full border border-[#F5F5F0]/60 transition-all duration-300 ${isHoveringLink ? "w-16 h-16 bg-white/5 scale-110" : "w-10 h-10 bg-transparent"}`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#F5F5F0] rounded-full" />
      </div>

      {/* Modern High-End Floating Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick("home")}
            onMouseEnter={() => setIsHoveringLink(true)}
            onMouseLeave={() => setIsHoveringLink(false)}
          >
            <span className="font-serif tracking-widest text-[#F5F5F0] font-medium text-lg md:text-xl uppercase">Aaron Vega</span>
            <span className="w-1 h-1 bg-[#F5F5F0] rounded-full animate-ping" />
          </div>

          {/* Desktop Luxury Navigation links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {["home", "work", "about", "process", "expertise", "consult"].map((item) => (
              <span
                key={item}
                onClick={() => handleNavClick(item)}
                onMouseEnter={() => setIsHoveringLink(true)}
                onMouseLeave={() => setIsHoveringLink(false)}
                className={`mono-tag text-[10px] cursor-pointer tracking-[0.3em] uppercase transition-all duration-300 ${
                  activeTab === item.toUpperCase() ? "text-[#F5F5F0] opacity-100 font-semibold" : "text-stone-400 opacity-60 hover:opacity-100 hover:text-white"
                }`}
              >
                {item}
              </span>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <span className="font-mono text-[10px] uppercase text-stone-500 tracking-[0.2em] border border-white/10 px-3 py-1 bg-white/[0.02]">
              Standard / NYC
            </span>
            <button 
              onClick={() => handleNavClick("contact")}
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
              className="px-5 py-2.5 bg-transparent hover:bg-[#F5F5F0] text-[#F5F5F0] hover:text-[#0A0A0A] border border-[#F5F5F0]/30 hover:border-transparent tracking-widest text-[10px] uppercase font-mono transition-all duration-300"
            >
              Contact
            </button>
          </div>

          {/* Menu Toggle for Mobile */}
          <button 
            className="md:hidden text-stone-300 hover:text-[#F5F5F0] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Slide-in Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 pt-24 bg-[#0A0A0A] px-6 md:hidden flex flex-col space-y-6"
          >
            {["home", "work", "about", "process", "expertise", "consult", "contact"].map((item) => (
              <span
                key={item}
                onClick={() => handleNavClick(item)}
                className="font-serif text-3xl font-light tracking-wide text-stone-300 hover:text-[#F5F5F0] uppercase py-2 border-b border-white/10"
              >
                {item}
              </span>
            ))}
            <div className="pt-12 text-stone-500 text-xs font-mono space-y-2 uppercase tracking-widest">
              <div>Aaron Vega Portfolio</div>
              <div>Digital Creative Director</div>
              <div>Available Worldwide</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">

        {/* 1. HERO SECTION: Dramatic Cinematic Opening */}
        <section id="home" className="relative min-h-[95vh] flex items-center justify-center py-20 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center relative">
            
            {/* Cinematic background flare specific to Hero */}
            <div className="absolute -top-20 -left-20 w-[40vw] h-[40vw] bg-white/[0.02] rounded-full filter blur-[100px] pointer-events-none" />

            {/* Left Margin Sidebar Column: Camera Stats & Status (Luxury Film Motif) */}
            <div className="hidden lg:flex col-span-1 select-none flex-col justify-between h-[450px] text-stone-500 text-[10px] font-mono py-4 tracking-[0.25em] uppercase border-r border-white/10 pr-6">
              <div className="space-y-1">
                <span className="text-[#F5F5F0] font-semibold block">01 / HOME</span>
                <span className="opacity-40 block text-[9px]">SCENE_01 / ROLL_A</span>
              </div>
              <div className="transform rotate-90 origin-left translate-x-3 whitespace-nowrap opacity-55 tracking-[0.35em]">
                AETHER & MASTERCLASS STRATEGY
              </div>
              <div className="space-y-1 opacity-45">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span>PRESTIGE_V.10</span>
                </div>
                <span>NYC // HQ</span>
              </div>
            </div>

            {/* Middle Main Column: Dynamic Luxury Headings & Core CTAs */}
            <div className="col-span-1 lg:col-span-6 flex flex-col justify-center space-y-10 z-10 lg:pl-4">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="inline-flex items-center space-x-2.5 bg-white/[0.03] border border-white/10 px-3.5 py-1.5 rounded-sm">
                  <span className="w-1.5 h-1.5 bg-[#F5F5F0] rounded-sm" />
                  <span className="text-[#F5F5F0] font-mono text-[9px] uppercase tracking-[0.3em] font-medium">
                    The Art of Absolute Restraint
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-serif font-light leading-[0.9] tracking-tight text-[#F5F5F0]">
                  Commanding <br />
                  <span className="italic font-normal font-serif text-[#F5F5F0]/75">attention.</span><br/>
                  <span className="font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-300 to-stone-500 block mt-3">
                    Carving distinction.
                  </span>
                </h1>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-stone-400 font-sans font-light text-base md:text-lg max-w-lg leading-relaxed"
              >
                I translate ambitious brand philosophies into sharp, uncompromising digital artifacts. Built for visionaries who understand that looking beautiful is only the entry tax—prestige is the real separator.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <button 
                  onClick={() => handleNavClick("work")}
                  onMouseEnter={() => setIsHoveringLink(true)}
                  onMouseLeave={() => setIsHoveringLink(false)}
                  className="px-8 py-4 bg-[#F5F5F0] text-[#0A0A0A] font-bold uppercase text-[10px] font-mono tracking-[0.3em] hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2.5 rounded-sm shadow-xl"
                >
                  <span>View Case Studies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                
                <button 
                  onClick={() => handleNavClick("contact")}
                  onMouseEnter={() => setIsHoveringLink(true)}
                  onMouseLeave={() => setIsHoveringLink(false)}
                  className="px-8 py-4 bg-transparent text-[#F5F5F0] border border-white/20 hover:border-white hover:bg-white/5 font-bold uppercase text-[10px] font-mono tracking-[0.3em] transition-all duration-300 flex items-center justify-center space-x-2 rounded-sm"
                >
                  <span>Schedule Consultation</span>
                  <Sparkles className="w-3.5 h-3.5 opacity-60" />
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.45 }}
                className="grid grid-cols-2 gap-8 pt-10 border-t border-white/10"
              >
                <div>
                  <span className="text-stone-500 text-[9px] font-mono uppercase tracking-[0.3em] block">Sovereign Base</span>
                  <span className="text-[#F5F5F0] font-serif italic text-base mt-1.5 block">Manhattan, NY</span>
                </div>
                <div>
                  <span className="text-stone-500 text-[9px] font-mono uppercase tracking-[0.3em] block">Avail Strategy</span>
                  <span className="text-[#F5F5F0]/85 font-mono text-[10px] mt-2 block uppercase tracking-wider flex items-center">
                    <span className="w-2 h-2 bg-[#F5F5F0] rounded-full inline-block mr-2 animate-pulse" />
                    SELECT ENGAGEMENTS ONLY
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Epic Hero Portrait Image Block (High-End Masterclass Frame) */}
            <div className="col-span-1 lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-sm lg:max-w-md aspect-[3/4] bg-[#141414] border border-white/10 p-3 group overflow-hidden shadow-2xl"
              >
                {/* Modern subtle ambient lens vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/30 opacity-70 z-10 transition-opacity duration-500 group-hover:opacity-40 pointer-events-none" />
                
                {/* Premium curated executive portfolio portrait from Unsplash with smooth cinematic zoom */}
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" 
                  alt="Aaron Vega Principal Portrait" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms] ease-out"
                />
                
                {/* Framing Metadata overlays closely conveying luxury cinema */}
                <div className="absolute top-6 left-6 z-20 bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 px-3 py-1 text-[8px] font-mono uppercase text-stone-300 tracking-[0.25em]">
                  SYS_CORD NY_40.7128_N
                </div>
                
                <div className="absolute bottom-6 right-6 z-20 bg-[#F5F5F0] text-black font-semibold text-[8px] font-mono uppercase tracking-[0.3em] px-3.5 py-2 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping" />
                  <span>CAM_85MM f/1.2</span>
                </div>

                {/* Vertical aesthetic barcode visualizer */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col space-y-1 opacity-25 group-hover:opacity-60 transition-opacity duration-500">
                  <div className="w-8 h-0.5 bg-white" />
                  <div className="w-5 h-0.5 bg-white" />
                  <div className="w-7 h-0.5 bg-white" />
                  <div className="w-2 h-0.5 bg-white" />
                  <div className="w-6 h-0.5 bg-white" />
                </div>
              </motion.div>
            </div>

          </div>
        </section>


        {/* 2. SIGNATURE STATEMENT SECTION: Luxury Editorial Manifesto */}
        <section className="bg-gradient-to-b from-stone-950 to-[#0A0A0A] py-28 select-none border-y border-white/5 relative overflow-hidden">
          
          {/* Faint Grid Background Blueprint representing math/precision */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            
            {/* Left Column: Interactive Golden Ratio Visual & Manifesto Heading */}
            <div className="col-span-1 lg:col-span-5 flex flex-col justify-between space-y-10">
              <div className="space-y-4">
                <span className="text-[#F5F5F0] font-mono text-[10px] uppercase tracking-[0.4em] font-semibold block opacity-50">
                  — SIGNATURE MANIFESTO
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-[#F5F5F0] leading-tight">
                  The Sovereign <br />
                  <span className="italic font-normal">Aesthetic Law</span>
                </h2>
                <div className="w-16 h-px bg-[#F5F5F0]/30 mt-4" />
              </div>

              {/* Refined visual element: Interactive Typographic/Acoustic balance wheel indicating creative synergy */}
              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-sm space-y-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] rounded-full filter blur-xl pointer-events-none" />
                
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-stone-500">System Formula Metrics</span>
                  <div className="h-2 w-2 rounded-full bg-[#F5F5F0] animate-pulse" />
                </div>

                {/* Animated Concentric Circles mimicking perfect focal symmetry */}
                <div className="flex items-center justify-center py-6">
                  <div className="relative flex items-center justify-center flex-col">
                    <motion.div 
                      style={{ originX: "50%", originY: "50%" }}
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                      className="w-28 h-28 rounded-full border border-dashed border-white/10 flex items-center justify-center p-3"
                    >
                      <div className="w-full h-full rounded-full border border-dotted border-[#F5F5F0]/20 flex items-center justify-center">
                        <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest">Prestige</span>
                      </div>
                    </motion.div>
                    
                    <div className="absolute w-20 h-20 rounded-full border border-white/5 flex items-center justify-center">
                      <div className="text-center">
                        <span className="font-serif italic text-lg text-white font-light block">ø</span>
                        <span className="font-mono text-[8px] text-[#F5F5F0]/50 tracking-wider">1.618 ratio</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-[9px] font-mono text-stone-500 uppercase tracking-widest">
                  <div>
                    <span>NEG_SPACE:</span>
                    <span className="text-stone-300 block font-bold mt-1">62% BALANCED</span>
                  </div>
                  <div>
                    <span>RESTRAINT:</span>
                    <span className="text-stone-300 block font-bold mt-1">ABSOLUTE LAW</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Confident, Intelligent Manifesto Text (Avoids resume speak) */}
            <div className="col-span-1 lg:col-span-7 flex flex-col justify-center space-y-8">
              <span className="font-serif text-2xl md:text-3.5xl font-light text-stone-300 leading-relaxed italic border-l-2 border-white/20 pl-6 block">
                "The greatest risk in the modern era is to be easily forgotten."
              </span>
              
              <div className="space-y-6 text-[#F5F5F0]/85 font-mono text-xs md:text-sm tracking-wide leading-relaxed">
                <div className="indent-8 font-serif italic text-base font-light text-stone-300">
                  <span className="font-serif not-italic text-3xl font-light text-[#F5F5F0] mr-2">D</span>ecoration is a symptom of insecurity; absolute restraint is the ultimate high-status separator. In a digital landscape hyper-saturated with momentary hype and generic blocks, I subtract the unessential until only pure strategy, majestic typography, and cinematic atmosphere remain.
                </div>
                <p>
                  As an Interactive Art Director and Creative Technologist, I spent over a decade guiding digital prestige with brands looking to exist with high-status power. Fusing high-status creative direction with uncompromising technical execution, I do not design to blend into modern patterns—I construct environments where typography commands attention.
                </p>
                <p className="text-stone-400 font-sans">
                  We built our system for leaders who understand that beautiful interfaces are not just aesthetic decorations—they are the primary driver of digital authority.
                </p>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/15">
                <div className="flex items-center space-x-3.5">
                  <span className="text-[10px] font-mono uppercase text-stone-500 tracking-[0.2em]">DIRECTIVE AUTHORITY:</span>
                  <span className="font-serif italic text-sm text-[#F5F5F0] font-light">Aaron Vega Core Standard</span>
                </div>
                <span className="text-[9px] font-mono text-stone-600 block text-right">
                  MAN_SET_RULE_06.B
                </span>
              </div>
            </div>

          </div>
        </section>


        {/* 3. SELECTED WORK SECTION: High-End Case-Study Grid */}
        <section id="work" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto space-y-20 relative">
          
          <div className="absolute top-10 right-10 w-[30rem] h-[30rem] bg-white/[0.01] rounded-full filter blur-[150px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 relative z-10">
            <div className="space-y-4">
              <span className="text-[#F5F5F0] font-mono text-[10px] uppercase tracking-[0.43em] block opacity-50">
                02 / SELECTED CAMPAIGNS
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight">
                Selected <span className="italic font-normal">Case Studies</span>
              </h2>
            </div>
            <p className="text-stone-400 font-sans font-light text-xs md:text-sm tracking-wide max-w-xs mt-4 md:mt-0 leading-relaxed">
              An uncompromised archive of digital interfaces and physical-feeling web assets shaped with absolute precision.
            </p>
          </div>

          {/* Luxury Editorial Campaign Grid (Balanced Bento-Box Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="bg-[#050505] border border-white/10 p-7 flex flex-col justify-between group cursor-pointer transition-all duration-[800ms] rounded-sm hover:border-[#F5F5F0]/30 hover:shadow-2xl relative overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                {/* Micro tech grid overlay inside each card on hover */}
                <div className="absolute inset-0 bg-radial-gradient from-white/[0.015] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] pointer-events-none" />

                <div className="space-y-6">
                  {/* Image Container with Luxury aspect ratio and micro coordinate stamp */}
                  <div className="relative aspect-[4/5] bg-[#101010] border border-white/10 overflow-hidden rounded-sm">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale brightness-[0.85] saturate-50 group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
                    />
                    
                    {/* Absolute Overlays representing campaign stats */}
                    <div className="absolute top-4 left-4 bg-[#0A0A0A]/90 backdrop-blur-md px-3 py-1 text-[8px] font-mono text-[#F5F5F0] tracking-[0.25em] uppercase border border-white/5">
                      INDUSTRY // {project.category}
                    </div>

                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[7.5px] font-mono text-stone-400 tracking-[0.2em]">
                      YR: {project.year}
                    </div>
                  </div>

                  {/* High-status metadata stack */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[9px] font-mono text-stone-500 uppercase tracking-widest">
                      <span>ROLE: {project.role}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif italic text-white font-medium group-hover:text-[#F5F5F0] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-stone-400 text-xs font-light leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Preloaded Outcomes/Prestige Marker (Mandate requirement) */}
                    <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-sm space-y-1.5 transition-colors group-hover:bg-white/[0.04]">
                      <span className="block font-mono text-[8px] text-stone-500 tracking-[0.2em] uppercase">
                        KEY OUTCOME (METRIC)
                      </span>
                      <span className="block font-serif text-sm italic text-[#F5F5F0] font-light group-hover:pl-1 transition-all duration-300">
                        {project.keyOutcome}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive CTA Anchor */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[9.5px] font-mono tracking-[0.3em] uppercase text-stone-500 group-hover:text-[#F5F5F0] group-hover:tracking-[0.35em] transition-all duration-500">
                    View Case Study
                  </span>
                  
                  <div className="h-8 w-8 rounded-sm bg-white/[0.02] border border-white/10 flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:bg-[#F5F5F0] group-hover:text-black transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </section>


        {/* 4. ABOUT SECTION: Beautiful Editorial Biography */}
        <section id="about" className="bg-stone-950 py-24 select-none">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="col-span-1 lg:col-span-5 relative">
              <div className="relative aspect-[3/4] bg-[#141414] border border-white/10 p-2 overflow-hidden max-w-sm mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
                  alt="Aaron Vega Creative Pose" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-90 saturate-50"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#0A0A0A]/95 border border-white/10 p-4 text-center">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500">PHILOSOPHICAL PILL</span>
                  <span className="block font-serif text-sm text-stone-300 italic mt-1">"Elegance is refusing to decorate."</span>
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-[#F5F5F0] font-mono text-[10px] uppercase tracking-[0.4em] block opacity-45">
                  03 / IDENTITY & BIOGRAPHY
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-[#F5F5F0]">
                  An Uncompromising <span className="italic font-normal">Aesthetic Stand</span>
                </h2>
              </div>

              <div className="space-y-6 text-stone-400 font-light leading-relaxed text-sm md:text-base">
                <p>
                  As an Interactive Art Director and Creative Technologist based in New York City, I spent over a decade guiding digital prestige with brands looking to exist with high-status power.
                </p>
                <p>
                  My vision combines precise mathematical layouts with atmospheric filmmaking logic. I conceptualize websites, checkout experiences, and branding as narrative reels. Every margin is considered, every type sizing represents absolute intent, and all motion has a structural reason for existence.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center lg:text-left">
                <div>
                  <span className="block font-mono text-[10px] text-stone-500 tracking-[0.2em] uppercase">Years</span>
                  <span className="block font-serif text-3xl md:text-4xl text-[#F5F5F0] font-light mt-1">10+</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] text-stone-500 tracking-[0.2em] uppercase">Brands</span>
                  <span className="block font-serif text-3xl md:text-4xl text-[#F5F5F0]/80 font-light mt-1">50+</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] text-stone-500 tracking-[0.2em] uppercase">Accolades</span>
                  <span className="block font-serif text-3xl md:text-4xl text-[#F5F5F0] font-light mt-1">12</span>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* 5. EXPERTISE SECTION: Clean Typographic Cards */}
        <section id="expertise" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[#F5F5F0] font-mono text-[10px] uppercase tracking-[0.4em] block opacity-45">
              — SYSTEM EXPERTISE
            </span>
            <h2 className="text-4xl font-serif font-light text-white">
              Areas of <span className="italic font-normal">Presence</span>
            </h2>
            <p className="text-stone-400 font-sans font-light text-xs md:text-sm">
              Applying premium vision across product architecture, digital storytelling, and modern brand design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#0A0A0A] border border-white/10 p-8 space-y-6 transition-all duration-300 hover:border-white/20">
              <div className="w-12 h-12 rounded-sm bg-white/[0.03] flex items-center justify-center border border-white/10">
                <Compass className="w-5 h-5 text-[#F5F5F0]" />
              </div>
              <h3 className="text-xl font-serif italic text-white">Creative Direction</h3>
              <p className="text-stone-400 text-xs leading-relaxed font-light">
                Setting the tone, visual parameters, motion vocabulary, and narrative script for premium brands that command high-status space in modern markets.
              </p>
              <ul className="text-[10px] font-mono text-stone-500 space-y-2 uppercase tracking-wider">
                <li>• Visual Architecture</li>
                <li>• Content Sabbaticals</li>
                <li>• High-Contrast Styling</li>
              </ul>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-8 space-y-6 transition-all duration-300 hover:border-white/20">
              <div className="w-12 h-12 rounded-sm bg-white/[0.03] flex items-center justify-center border border-white/10">
                <Briefcase className="w-5 h-5 text-[#F5F5F0]" />
              </div>
              <h3 className="text-xl font-serif italic text-white">Immersive Interface Design</h3>
              <p className="text-stone-400 text-xs leading-relaxed font-light">
                Crafting custom web applications with majestic spacing, tailored interaction states, dynamic grids, and responsiveness.
              </p>
              <ul className="text-[10px] font-mono text-stone-500 space-y-2 uppercase tracking-wider">
                <li>• Desktop-First Precision</li>
                <li>• Custom Motion Canvas</li>
                <li>• Modular Web Design</li>
              </ul>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-8 space-y-6 transition-all duration-300 hover:border-white/20">
              <div className="w-12 h-12 rounded-sm bg-white/[0.03] flex items-center justify-center border border-white/10">
                <Cpu className="w-5 h-5 text-[#F5F5F0]" />
              </div>
              <h3 className="text-xl font-serif italic text-white">Prestige Tech Engineering</h3>
              <p className="text-stone-400 text-xs leading-relaxed font-light">
                Engineering fast full-stack applications with high scalability. Translating creative visions into bug-free production-grade layouts.
              </p>
              <ul className="text-[10px] font-mono text-stone-500 space-y-2 uppercase tracking-wider">
                <li>• React & Express Fullstack</li>
                <li>• Vite Build Optimization</li>
                <li>• Ultra Low-Latency Logic</li>
              </ul>
            </div>

          </div>
        </section>


        {/* 6. PROCESS SECTION: Premium Timeline Step Flow */}
        <section id="process" className="bg-stone-950 py-24 select-none">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
              <div className="space-y-4">
                <span className="text-[#F5F5F0] font-mono text-[10px] uppercase tracking-[0.4em] block opacity-45">
                  04 / EXECUTION SYSTEM
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-white">
                  The Strategic <span className="italic font-normal">Method</span>
                </h2>
              </div>
              <p className="text-stone-400 font-sans font-light text-xs max-w-xs mt-4 md:mt-0">
                Every project commands an uncompromised methodology. No shortcuts allowed.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {processSteps.map((step, idx) => (
                <div key={idx} className="relative bg-[#0A0A0A] border border-white/10 p-6 space-y-4 flex flex-col justify-between transition-all duration-300 hover:border-white/20">
                  <div className="space-y-3">
                    <span className="block font-mono text-2xl text-[#F5F5F0] font-light">
                      {step.number}
                    </span>
                    <h3 className="text-lg font-serif text-white uppercase tracking-wider">
                      {step.title}
                    </h3>
                    <p className="text-[#F5F5F0]/80 font-sans font-medium text-[11px] tracking-wide leading-relaxed">
                      {step.tagline}
                    </p>
                    <p className="text-stone-400 text-xs font-light leading-relaxed pt-2">
                      {step.description}
                    </p>
                  </div>
                  <div className="w-full h-1 bg-white/10 mt-4" />
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* 7 & 8. CREDIBILITY AND TIMELINE SECTION Combined beautifully */}
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Experience timeline column */}
          <div className="col-span-1 lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[#F5F5F0] font-mono text-[10px] uppercase tracking-[0.4em] block opacity-45">
                05 / HISTORICAL ARCHIVES
              </span>
              <h2 className="text-3xl font-serif font-light text-white">
                Experience & <span className="italic font-normal">Campaigns</span>
              </h2>
            </div>

            <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
              {experienceMilestones.map((job, idx) => (
                <div key={idx} className="relative pl-8 space-y-2 group">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-[#0A0A0A] border border-[#F5F5F0]/60 group-hover:bg-[#F5F5F0] transition-colors" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <span className="text-[#F5F5F0]/80 font-mono text-xs uppercase tracking-wider block md:inline mr-3">
                        {job.period}
                      </span>
                      <h4 className="text-lg font-serif italic text-white inline-block">
                        {job.role}
                      </h4>
                    </div>
                    <span className="text-stone-500 font-mono text-xs">
                      {job.company} — {job.location}
                    </span>
                  </div>
                  <p className="text-stone-400 text-xs leading-relaxed font-light max-w-2xl">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Credibility / Awards stamp list */}
          <div className="col-span-1 lg:col-span-5 space-y-8">
            <h3 className="text-xl font-serif text-[#F5F5F0] tracking-wider uppercase font-medium">
              Global Accolades & Credibility
            </h3>

            <div className="space-y-4">
              {awards.map((award, idx) => (
                <div key={idx} className="bg-[#0A0A0A] border border-white/10 p-4 flex items-center justify-between hover:border-[#F5F5F0]/30 transition-all duration-300">
                  <div className="space-y-1">
                    <span className="text-[#F5F5F0]/70 font-mono text-[10px] tracking-widest block uppercase">
                      {award.institution}
                    </span>
                    <span className="text-white font-serif text-sm block">
                      {award.title}
                    </span>
                    <span className="text-stone-500 text-[10px] block font-mono uppercase tracking-wider">
                      {award.category}
                    </span>
                  </div>
                  <span className="font-serif text-stone-500 block text-lg font-semibold">
                    {award.year}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#0A0A0A] border border-white/10 flex items-center space-x-4">
              <Award className="w-10 h-10 text-[#F5F5F0] flex-shrink-0 opacity-80" />
              <div>
                <span className="font-serif text-xs text-stone-300 italic block">
                  "Uncompromised attention to typography pairings, spacing rhythms, and high-contrast composition rules."
                </span>
                <span className="font-mono text-[9px] uppercase text-stone-500 block mt-1">
                  — Jury Statement, Awwwards Edition
                </span>
              </div>
            </div>
          </div>

        </section>


        {/* 9. TESTIMONIALS SECTION: Premium Styled Quotes */}
        <section className="bg-stone-950 py-24 select-none">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
            <div className="text-center space-y-2">
              <span className="text-[#F5F5F0] font-mono text-[10px] uppercase tracking-[0.4em] block opacity-45">
                — PRESTIGE WITNESSES
              </span>
              <h2 className="text-3xl font-serif font-light text-white">
                Client <span className="italic font-normal">Endorsements</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((test, idx) => (
                <div key={idx} className="bg-[#0A0A0A] border border-white/10 p-8 flex flex-col justify-between relative group hover:border-[#F5F5F0]/20 transition-all duration-300">
                  <span className="absolute top-4 right-4 text-stone-800 text-6xl font-serif select-none pointer-events-none font-bold">
                    “
                  </span>
                  <p className="text-stone-300 text-sm md:text-base font-light italic leading-relaxed relative z-10">
                    "{test.quote}"
                  </p>
                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="block font-serif text-sm font-semibold text-white">{test.author}</span>
                      <span className="block font-mono text-[10px] text-stone-500 uppercase tracking-widest">{test.role}</span>
                    </div>
                    <span className="text-[#F5F5F0]/80 font-mono text-[9px] uppercase tracking-[0.2em]">{test.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Interactive Gemini AI Consult Section: The Intelligent Crown-Jewel Layer */}
        <section id="consult" className="py-24 bg-[#0A0A0A] px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            <div className="col-span-1 lg:col-span-5 flex flex-col justify-between py-4">
              <div className="space-y-6">
                <span className="text-[#F5F5F0] font-mono text-[10px] uppercase tracking-[0.4em] block opacity-45">
                  06 / CREATIVE TWIN INTERACTION
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight text-white animate-pulse">
                  The AI <br />
                  <span className="italic font-normal">Aesthetic Critic</span>
                </h2>
                <div className="w-12 h-px bg-white/20" />
                <p className="text-stone-400 font-sans font-light text-sm leading-relaxed">
                  Test your design ideas, current website links, or strategic questions against Aaron Vega's uncompromised digital mindset. Backed by Google's Gemini-3.5 model.
                </p>
              </div>

              <div className="mt-8 lg:mt-0 p-5 bg-[#0A0A0A] border border-white/10 space-y-4">
                <h4 className="font-mono text-xs uppercase text-[#F5F5F0] tracking-wider flex items-center space-x-2 font-semibold">
                  <span className="w-1.5 h-1.5 bg-[#F5F5F0] rounded-full animate-ping" />
                  <span>Interactive Twin Core Active</span>
                </h4>
                <div className="space-y-2 text-xs font-mono text-stone-400 leading-normal">
                  <div className="flex items-center justify-between">
                    <span>Engine Type:</span>
                    <span className="text-stone-300 font-bold">@google/genai</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Double State:</span>
                    <span className="text-stone-300 font-bold">Uncompromising</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>API Integrity:</span>
                    <span className="text-green-500 font-bold flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 inline mr-1" /> Bound & Secure
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Luxury Creative Terminal Terminal Chat */}
            <div className="col-span-1 lg:col-span-7 bg-[#0A0A0A] border border-white/10 shadow-2xl p-6 flex flex-col justify-between min-h-[480px]">
              
              {/* Chat Window Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-stone-800" />
                  <div className="w-3 h-3 rounded-full bg-stone-700" />
                  <div className="w-3 h-3 rounded-full bg-stone-600" />
                  <span className="text-[10px] font-mono uppercase text-stone-500 tracking-wider">Aesthetic_Decision_Terminal.exe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-stone-500 font-mono text-[9px] uppercase tracking-wider">Focus Mode</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5F5F0] animate-pulse" />
                </div>
              </div>

              {/* Chat Stream Messages Container */}
              <div className="flex-grow overflow-y-auto max-h-[300px] mb-4 space-y-4 pr-2 text-xs md:text-sm font-sans">
                {aiChat.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] p-4 rounded-sm border ${
                      msg.role === "user" 
                        ? "bg-transparent border-[#F5F5F0]/20 text-[#F5F5F0]" 
                        : "bg-[#141414] border-white/10 text-stone-300"
                    }`}>
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-stone-500 mb-1">
                        {msg.role === "user" ? "Client Inquiry" : "Creative Double"}
                      </span>
                      <p className="leading-relaxed whitespace-pre-line font-light">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}

                {aiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#141414] border border-white/10 p-4 rounded-sm">
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-stone-500 mb-1">
                        Curating Strategy
                      </span>
                      <p className="text-[#F5F5F0]/80 font-mono text-xs animate-pulse">
                        Aaron's double is contemplating layout balances...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Inputs & Action Controller */}
              <form onSubmit={handleAiConsultation} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={() => setAiContext("Brand Strategy")}
                    className={`py-2 text-[10px] font-mono uppercase tracking-widest border transition-colors ${
                      aiContext === "Brand Strategy" 
                        ? "border-[#F5F5F0] text-[#F5F5F0]" 
                        : "border-white/10 text-stone-500 hover:text-stone-300"
                    }`}
                  >
                    Strategy Setup
                  </button>
                  <button 
                    type="button"
                    onClick={() => setAiContext("Aesthetic Critique")}
                    className={`py-2 text-[10px] font-mono uppercase tracking-widest border transition-colors ${
                      aiContext === "Aesthetic Critique" 
                        ? "border-[#F5F5F0] text-[#F5F5F0]" 
                        : "border-white/10 text-stone-500 hover:text-stone-300"
                    }`}
                  >
                    Aesthetic Critique
                  </button>
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    value={aiInquiry}
                    onChange={(e) => setAiInquiry(e.target.value)}
                    placeholder="Submit brand goals or website designs..."
                    className="w-full bg-[#141414] border border-white/10 p-4 pr-12 focus:border-[#F5F5F0] focus:ring-0 text-stone-100 font-sans text-xs md:text-sm rounded-sm placeholder-stone-600 transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={aiLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#F5F5F0] transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>

            </div>

          </div>
        </section>


        {/* 10. CONTACT / FINAL CTA SECTION: High-Prestige Engagement */}
        <section id="contact" className="py-24 select-none px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/10 pt-16">
            
            <div className="col-span-1 lg:col-span-5 space-y-6">
              <span className="text-[#F5F5F0] font-mono text-[10px] uppercase tracking-[0.4em] block opacity-45">
                07 / CONTACT DIRECTIVE
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight text-white">
                Initiate <br />
                <span className="italic font-normal font-serif text-[#F5F5F0]">Presence.</span>
              </h2>
              <p className="text-stone-400 font-light text-xs md:text-sm max-w-sm leading-relaxed tracking-wide">
                Bring the right project. I'll bring the standard. Available for select collaborations and advisory directives globally.
              </p>

              <div className="space-y-4 pt-4 text-xs font-mono">
                <div>
                  <span className="text-stone-500 uppercase tracking-widest block">DIRECT CONNECT</span>
                  <a href="mailto:hello@aaronvega.com" className="text-[#F5F5F0] hover:underline block text-base font-serif italic mt-1 font-light">
                    hello@aaronvega.com
                  </a>
                </div>
                <div>
                  <span className="text-stone-500 uppercase tracking-widest block">TELEPHONY HUB</span>
                  <span className="text-stone-300 block mt-1 font-serif text-sm">+1 (212) 555-0195</span>
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-7 bg-[#0A0A0A] border border-white/10 p-8 relative">
              <AnimatePresence>
                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#0A0A0A] flex flex-col items-center justify-center text-center p-6 space-y-4 z-10"
                  >
                    <CheckCircle className="w-12 h-12 text-[#F5F5F0]" />
                    <h3 className="font-serif text-2xl text-white">Directive Submitted</h3>
                    <p className="text-stone-400 text-xs font-mono uppercase tracking-[0.2em]">
                      We have synchronized your interest with Aaron Vega's schedule. Please expect contact.
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 mb-2">
                      Your Identity / Name
                    </label>
                    <input 
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Vane & Co"
                      className="w-full bg-[#141414] border border-white/10 p-4 focus:border-[#F5F5F0] focus:ring-0 text-xs md:text-sm text-stone-100 placeholder-stone-700 transition-colors rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 mb-2">
                      Secure Electronic Mail
                    </label>
                    <input 
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. max@vane.co"
                      className="w-full bg-[#141414] border border-white/10 p-4 focus:border-[#F5F5F0] focus:ring-0 text-xs md:text-sm text-stone-100 placeholder-stone-700 transition-colors rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 mb-2">
                    The Blueprint / Strategic Goal
                  </label>
                  <textarea 
                    rows={4}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Describe your intent, timeline, and standard constraints..."
                    className="w-full bg-[#141414] border border-white/10 p-4 focus:border-[#F5F5F0] focus:ring-0 text-xs md:text-sm text-stone-100 placeholder-stone-700 transition-colors rounded-sm"
                  />
                </div>

                <button 
                  type="submit"
                  onMouseEnter={() => setIsHoveringLink(true)}
                  onMouseLeave={() => setIsHoveringLink(false)}
                  className="w-full py-4 bg-[#F5F5F0] hover:bg-white text-black font-semibold text-xs font-mono uppercase tracking-[0.2em] transition-colors"
                >
                  Initiate Secure Communication
                </button>
              </form>
            </div>

          </div>
        </section>

      </main>

      {/* 11. FOOTER SECTION: Minimal, Elite, Complete */}
      <footer className="bg-[#0A0A0A] border-t border-white/10 py-12 px-6 lg:px-12 text-stone-500 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center space-x-3 select-none">
            <span className="font-serif tracking-widest text-[#F5F5F0] font-light text-base uppercase">Aaron Vega</span>
            <span className="w-1.5 h-1.5 bg-[#F5F5F0] rounded-full" />
            <span className="text-[10px] text-stone-600 tracking-wider">CREATIVE DIRECTION</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[10px] tracking-widest uppercase">
            <a href="#home" className="hover:text-[#F5F5F0] transition-colors">Home</a>
            <a href="#work" className="hover:text-[#F5F5F0] transition-colors">Work</a>
            <a href="#about" className="hover:text-[#F5F5F0] transition-colors">About</a>
            <a href="#process" className="hover:text-[#F5F5F0] transition-colors">Process</a>
            <span>•</span>
            <span className="text-stone-600">Available Globally</span>
          </div>

          <div className="text-[9px] text-stone-600 tracking-wide text-center md:text-right space-y-1">
            <div>© {new Date().getFullYear()} Aaron Vega. All Rights Reserved.</div>
            <div className="text-[8px] opacity-60">Deliberated and crafted as a digital masterpiece artifact from the future.</div>
          </div>

        </div>
      </footer>

      {/* Modern Editorial Project Case Study Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.98 }}
              className="bg-[#0A0A0A] border border-white/10 p-6 md:p-12 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative rounded-sm text-stone-200"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-stone-400 hover:text-[#F5F5F0] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
                
                <div className="md:col-span-5 relative aspect-[3/4] bg-stone-950 overflow-hidden border border-white/10">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-90 saturate-50"
                  />
                </div>

                <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                      <span>{selectedProject.category}</span>
                      <span>•</span>
                      <span>{selectedProject.year}</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-serif text-white font-light tracking-tight italic">
                      {selectedProject.title}
                    </h3>

                    <p className="text-[#F5F5F0]/80 font-serif text-sm italic tracking-wide">
                      {selectedProject.subtitle}
                    </p>

                    <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-stone-500">
                      METRIC OF PRESTIGE (KEY OUTCOME)
                    </span>
                    <div className="flex items-center space-x-3 bg-white/[0.02] p-4 border-l border-[#F5F5F0]">
                      <div className="w-8 h-8 rounded-sm bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-serif text-base text-white font-medium italic">
                        {selectedProject.keyOutcome}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono uppercase tracking-[0.25em] border-t border-white/10 pt-6">
                    <div>
                      <span className="text-stone-500 block">Lead Role</span>
                      <span className="text-stone-300 block font-sans font-medium mt-1 uppercase tracking-normal text-[11px]">{selectedProject.role}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Deliverable</span>
                      <span className="text-stone-300 block font-sans font-medium mt-1 uppercase tracking-normal text-[11px]">Creative Direction</span>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
