import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubathraPhoto from "./assets/Subathra_Photo.png";
import GuviCert from "./assets/Certification.png";

// ─────────────────────────────────────────────
// ✅ EMAILJS CONFIG — Replace these 3 values
// ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_bibmgln";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_9a8wv16";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "-XDwkfhbK_I7nqEHa";   // e.g. "aBcDeFgHiJkLmNoP"

/**
 * Custom Hook for Scroll Reveal Animations
 */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.classList.remove("opacity-0", "translate-y-8");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/**
 * Navigation Bar Component
 */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["home", "about", "skills", "projects", "experience", "certifications", "contact"];
      const y = window.scrollY;
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120;
          if (y >= top && y < top + el.offsetHeight) setActive(id);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = ["home", "about", "skills", "projects", "experience", "certifications"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${scrolled ? "bg-[#0a0a0f]/95 shadow-lg" : "bg-[#0a0a0f]/80"} backdrop-blur-xl border-b border-purple-900/20`}>
      <div className="font-black text-xl tracking-tight text-white" style={{ fontFamily: "'Syne',sans-serif" }}>
        Sub<span className="text-violet-400">athra</span>.dev
      </div>
      <ul className="hidden md:flex gap-8 list-none m-0 p-0">
        {navItems.map((item) => (
          <li key={item}>
            <button onClick={() => scrollTo(item)} className={`text-sm font-medium capitalize transition-colors duration-200 bg-transparent border-none cursor-pointer ${active === item ? "text-violet-400" : "text-slate-400 hover:text-violet-400"}`}>
              {item}
            </button>
          </li>
        ))}
        <li>
          <button onClick={() => scrollTo("contact")} className="text-sm font-medium text-violet-400 border border-violet-400 rounded-full px-5 py-1.5 hover:bg-violet-400 hover:text-white transition-all duration-200 bg-transparent cursor-pointer">
            Contact
          </button>
        </li>
      </ul>
      <button className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1" onClick={() => setOpen(!open)} aria-label="Menu">
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#0a0a0f]/98 border-b border-purple-900/20 flex flex-col items-center gap-6 py-8 md:hidden">
          {[...navItems, "contact"].map((item) => (
            <button key={item} onClick={() => scrollTo(item)} className="text-base font-medium capitalize text-slate-300 hover:text-violet-400 transition-colors bg-transparent border-none cursor-pointer">
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/**
 * Hero Section
 */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center px-8 pt-28 pb-16 overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 70% 60% at 70% 50%,rgba(108,99,255,0.15) 0%,transparent 70%),radial-gradient(ellipse 40% 40% at 20% 80%,rgba(67,217,173,0.08) 0%,transparent 60%)" }}></div>
      <div className="absolute inset-0 z-0" style={{ backgroundImage: "linear-gradient(rgba(108,99,255,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(108,99,255,0.07) 1px,transparent 1px)", backgroundSize: "60px 60px" }}></div>
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Available for Opportunities
          </div>
          <h1 className="font-black leading-tight mb-3 text-white" style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
            Hi, I'm <span className="text-violet-400">Subathra S</span>
          </h1>
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/30">MERN Developer</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">Full Stack Developer</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30">Frontend Developer</span>
          </div>
          <p className="text-slate-400 leading-relaxed mb-8 max-w-lg text-base">
            Passionate about building <span className="text-emerald-400 font-semibold">scalable, end-to-end web applications</span> with the MERN stack. IIT-M Pravartak Certified — 5 projects completed.
          </p>
          <div className="flex gap-3 flex-wrap mb-10">
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="px-6 py-3 rounded-full bg-violet-500 text-white font-semibold text-sm hover:bg-violet-400 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-violet-500/30 border-none cursor-pointer">
              View My Projects →
            </button>
            <a href="https://drive.google.com/file/d/1ys15wRbrtzhHpKA2QuGWOuQPjIXAKfnw/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-slate-600 text-slate-300 font-semibold text-sm hover:border-violet-400 hover:text-violet-400 transition-all duration-200 no-underline">
              📄 Resume
            </a>
          </div>
          <div className="flex gap-8">
            {[["5", "Projects Completed"], ["3", "Full Stack Projects"], ["2", "Years Experience"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-black text-violet-400" style={{ fontFamily: "'Syne',sans-serif" }}>{num}</div>
                <div className="text-xs text-slate-500 leading-tight mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="relative w-56 h-56 md:w-64 md:h-64">
            <div className="absolute inset-[-14px] rounded-full border-2 border-violet-500/40 animate-spin" style={{ animationDuration: "18s" }}></div>
            <div className="absolute inset-[-14px] rounded-full border border-dashed border-emerald-400/20 animate-spin" style={{ animationDuration: "18s" }}></div>
            <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-violet-500/40 shadow-[0_0_60px_rgba(108,99,255,0.4)]">
              <img src={SubathraPhoto} alt="Subathra S" className="w-full h-full object-cover object-top" />
            </div>
            <div className="absolute top-2 -right-4 bg-[#1a1a26] border border-violet-900/40 rounded-xl px-3 py-1.5 text-xs font-semibold text-emerald-400 whitespace-nowrap" style={{ animation: "float 3s ease-in-out infinite" }}>
              ⚛️ React.js
            </div>
            <div className="absolute bottom-2 -left-4 bg-[#1a1a26] border border-violet-900/40 rounded-xl px-3 py-1.5 text-xs font-semibold text-pink-400 whitespace-nowrap" style={{ animation: "float 3s ease-in-out 1.5s infinite" }}>
              🟢 Node.js
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .reveal{opacity:0;transform:translateY(2rem);transition:opacity 0.7s ease,transform 0.7s ease}
        .reveal.opacity-100{opacity:1}
        .reveal.translate-y-0{transform:translateY(0)}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#0a0a0f}
        ::-webkit-scrollbar-thumb{background:#6c63ff;border-radius:3px}
      `}</style>
    </section>
  );
}

/**
 * About Section
 */
function About() {
  useReveal();
  return (
    <section id="about" className="px-8 py-16 bg-[#111118]">
      <div className="max-w-5xl mx-auto">
        <SectionLabel num="01" label="About Me" />
        <SectionTitle>Who Am I?</SectionTitle>
        <p className="text-slate-400 mb-8 max-w-lg text-sm leading-relaxed">A passionate Full Stack Developer from Tamil Nadu, India — building real-world applications with clean code and great user experiences.</p>
        <div className="reveal grid md:grid-cols-[1fr_1.4fr] gap-8 items-start">
          <div className="bg-[#1a1a26] border border-violet-900/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(108,99,255,0.06)]">
            <h3 className="text-violet-400 text-sm font-bold tracking-wide mb-4" style={{ fontFamily: "'Syne',sans-serif" }}>📋 Personal Info</h3>
            {[
              ["👤", "Name", "Subathra S"],
              ["💼", "Role", "Full Stack & Frontend Developer"],
              ["🔧", "Stack", "MERN (MongoDB, Express, React, Node)"],
              ["📍", "Location", "Tamil Nadu, India"],
              ["🎓", "Certification", "IIT-M Pravartak Certified"],
              ["📁", "Projects", "5 Projects (2 Frontend + 3 Full Stack)"],
            ].map(([icon, label, val]) => (
              <div key={label} className="flex gap-3 mb-3 items-start">
                <span className="text-base mt-0.5 flex-shrink-0">{icon}</span>
                <div>
                  <div className="text-slate-500 text-xs mb-0.5">{label}</div>
                  <div className="text-slate-200 text-sm font-medium">{val}</div>
                </div>
              </div>
            ))}
            <div className="flex gap-3 items-start">
              <span className="text-base mt-0.5 flex-shrink-0">🌐</span>
              <div>
                <div className="text-slate-500 text-xs mb-0.5">Portfolio</div>
                <a href="https://subathrafsdportfolio.netlify.app" target="_blank" rel="noopener noreferrer" className="text-violet-400 text-sm font-medium no-underline hover:underline">
                  subathrafsdportfolio.netlify.app
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-3 text-slate-400 text-sm leading-relaxed">
            <p>I'm <strong className="text-white font-semibold">Subathra S</strong>, a Full Stack Developer specialising in the <strong className="text-white font-semibold">MERN stack</strong>. I have successfully completed the <strong className="text-white font-semibold">IIT-M Pravartak Certified Full Stack Development Course with AI Tools</strong>, a rigorous 3-month intensive program by GUVI Geek Network in collaboration with IIT Madras.</p>
            <p>I have hands-on experience building <strong className="text-white font-semibold">5 complete projects</strong> — 2 responsive frontend applications and 3 full-stack projects featuring REST APIs, authentication, database management, and payment gateway integration.</p>
            <p>I am <strong className="text-white font-semibold">proficient in integrating AI tools</strong> into modern development workflows, which accelerates productivity and enhances the quality of software delivery.</p>
            <p>I'm actively looking for a <strong className="text-white font-semibold">Full Stack or Frontend Developer role</strong> where I can contribute meaningfully and grow rapidly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Technical Skills Section
 */
const SKILLS = [
  { icon: "⚛️", name: "React.js", cat: "frontend" }, { icon: "🌐", name: "HTML5", cat: "frontend" },
  { icon: "🎨", name: "CSS3", cat: "frontend" }, { icon: "📜", name: "JavaScript", cat: "frontend" },
  { icon: "📜", name: "TypeScript", cat: "frontend" }, { icon: "💅", name: "Tailwind CSS", cat: "frontend" },
  { icon: "🔁", name: "Redux", cat: "frontend" }, { icon: "🟢", name: "Node.js", cat: "backend" },
  { icon: "🚂", name: "Express.js", cat: "backend" }, { icon: "🔐", name: "REST APIs", cat: "backend" },
  { icon: "🍃", name: "MongoDB", cat: "database" }, { icon: "🗃️", name: "Mongoose", cat: "database" },
  { icon: "🐙", name: "Git & GitHub", cat: "tools" }, { icon: "☁️", name: "Netlify", cat: "tools" },
  { icon: "🔑", name: "Render", cat: "tools" }, { icon: "🤖", name: "AI Tools", cat: "tools" },
  { icon: "🧪", name: "Postman", cat: "tools" }, { icon: "💻", name: "VS Code", cat: "tools" },
];

function Skills() {
  const [tab, setTab] = useState("all");
  useReveal();
  const filtered = tab === "all" ? SKILLS : SKILLS.filter(s => s.cat === tab);
  return (
    <section id="skills" className="px-8 py-16 bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto">
        <SectionLabel num="02" label="Technical Skills" />
        <SectionTitle>What I Work With</SectionTitle>
        <p className="text-slate-400 mb-6 max-w-lg text-sm leading-relaxed">A well-rounded toolkit spanning frontend, backend, database, and developer tooling.</p>
        <div className="flex gap-2 flex-wrap mb-6">
          {["all", "frontend", "backend", "database", "tools"].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer capitalize ${tab === t ? "bg-violet-500 text-white border-violet-500" : "bg-transparent text-slate-400 border-violet-900/30 hover:border-violet-400 hover:text-violet-400"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="reveal grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {filtered.map(s => (
            <div key={s.name} className="bg-[#1a1a26] border border-violet-900/20 rounded-xl p-3 text-center hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-200 cursor-default">
              <div className="text-2xl mb-1.5">{s.icon}</div>
              <div className="text-xs font-semibold text-slate-300">{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Projects Section
 */
const PROJECTS = [
  {
    emoji: "🛒",
    bg: "linear-gradient(135deg,#1a1a2e,#16213e)",
    title: "E-Commerce Platform",
    desc: "A complete MERN stack shopping application with product listings, cart management, JWT authentication, Razorpay payment integration, order tracking, and an admin dashboard for product and order management.",
    live: "https://thee-commerceapp.netlify.app",
    fe: "https://github.com/projects-jobs/E-Commerce_FE",
    be: "https://github.com/projects-jobs/E-Commerce_BE",
  },
  {
    emoji: "📱",
    bg: "linear-gradient(135deg,#0f2027,#203a43)",
    title: "Social Media App",
    desc: "A full-stack social networking platform featuring user profiles, post creation, likes & comments, follow/unfollow system, JWT authentication, and a fully responsive news feed experience.",
    live: "https://thesocialmediapost.netlify.app",
    fe: "https://github.com/projects-jobs/Social_Media_FE",
    be: "https://github.com/projects-jobs/Social_Media_BE",
  },
  {
    emoji: "✈️",
    bg: "linear-gradient(135deg,#0a1628,#102040)",
    title: "Flight Booking System",
    desc: "A comprehensive MERN stack flight booking application with flight search & filter, seat selection, booking management, user authentication, and a complete reservation workflow with booking history.",
    live: "https://theflightbooking.netlify.app",
    fe: "https://github.com/projects-jobs/FlightBooking_FE",
    be: "https://github.com/projects-jobs/FlightBooking_BE",
  },
];

function Projects() {
  useReveal();
  return (
    <section id="projects" className="px-8 py-16 bg-[#111118]">
      <div className="max-w-5xl mx-auto">
        <SectionLabel num="03" label="Projects" />
        <SectionTitle>What I've Built</SectionTitle>
        <p className="text-slate-400 mb-8 max-w-lg text-sm leading-relaxed">3 Full Stack MERN projects — each demonstrating scalable architecture, REST APIs, authentication, and payment integrations.</p>
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map(p => (
            <div key={p.title} className="bg-[#1a1a26] border border-violet-900/20 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/15 hover:border-violet-500/40 transition-all duration-300 flex flex-col">
              <div className="h-36 flex items-center justify-center text-5xl relative flex-shrink-0" style={{ background: p.bg }}>
                {p.emoji}
                <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Full Stack
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tech Used:</span>
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/25">MERN Stack</span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">Tailwind CSS</span>
                  </div>
                </div>
                <h3 className="font-bold text-white text-base mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>{p.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1">{p.desc}</p>
                <div className="flex gap-2 flex-wrap mt-auto">
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold px-3 py-1.5 rounded-full bg-violet-500 text-white no-underline hover:bg-violet-400 transition-colors">🔗 Live Demo</a>
                  <a href={p.fe} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold px-3 py-1.5 rounded-full border border-violet-900/30 text-slate-400 no-underline hover:border-violet-400 hover:text-violet-400 transition-all">⬡ FE</a>
                  <a href={p.be} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold px-3 py-1.5 rounded-full border border-violet-900/30 text-slate-400 no-underline hover:border-violet-400 hover:text-violet-400 transition-all">⬡ BE</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <a href="https://github.com/projects-jobs" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full border border-violet-900/40 text-slate-300 text-sm font-semibold no-underline hover:border-violet-400 hover:text-violet-400 transition-all">
            🐙 View All on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Experience Section
 */
function Experience() {
  useReveal();
  return (
    <section id="experience" className="px-8 py-16 bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto">
        <SectionLabel num="04" label="Professional Experience" />
        <SectionTitle>My Experience</SectionTitle>
        <p className="text-slate-400 mb-8 max-w-lg text-sm leading-relaxed">Professional experience that has shaped my skills as a full-stack developer.</p>
        <div className="reveal relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-transparent"></div>
          <div className="relative mb-0">
            <div className="absolute -left-5 top-1.5 w-4 h-4 rounded-full border-2 border-[#0a0a0f] bg-emerald-400 shadow-[0_0_0_2px_#43d9ad]"></div>
            <div className="bg-[#1a1a26] border border-violet-900/20 rounded-xl p-6 hover:border-violet-500/30 transition-colors duration-200">
              <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                <div>
                  <h3 className="font-bold text-white text-base" style={{ fontFamily: "'Syne',sans-serif" }}>Full Stack Developer — .NET</h3>
                  <div className="text-emerald-400 text-sm font-medium mt-1">Cognizant Technology Solutions (CTS)</div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap bg-emerald-500/10 text-emerald-400">Aug 2022 – Oct 2024</span>
              </div>
              <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
                <li>Designed and developed enterprise web applications using ASP.NET Core, building RESTful APIs and implementing business logic layers integrated with SQL Server across 10+ projects delivered end-to-end.</li>
                <li>Built RESTful API services with authentication, error handling middleware, data validation, and third-party service integrations — improving API reliability and reducing production incidents.</li>
                <li>Followed Waterfall SDLC across all phases — requirements, design, development, testing, UAT, and production release — collaborating with QA, DevOps, and business stakeholders.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Certifications Section
 */
const GUVI_POINTS = [
  { icon: "⚛️", text: "Built full-stack MERN applications using MongoDB, Express.js, React.js, and Node.js — including REST API design, JWT authentication, authorization and Razorpay payment gateway integration." },
  { icon: "🎨", text: "Developed responsive and modern UIs with React.js, Tailwind CSS, and Redux for state management, applying component-based architecture and best practices in frontend development." },
  { icon: "🤖", text: "Integrated AI tools into the development workflow to boost productivity, accelerate debugging, and enhance code quality across real-world project delivery." },
];

const AMDOX_POINTS = [
  { icon: "🌐", text: "Completed hands-on web page development using HTML, CSS, JavaScript, and React.js — building responsive, user-friendly interfaces aligned with real client requirements." },
  { icon: "🟢", text: "Developed and integrated backend services using Node.js and Express.js, creating RESTful APIs connected to MongoDB for dynamic data handling in MERN stack projects." },
  { icon: "🏆", text: "Delivered a complete MERN stack project within the internship, earning excellent recognition for clean code quality, on-time delivery, and strong understanding of full-stack concepts." },
];

function LearnedPoints({ points, accentColor }) {
  return (
    <div className="grid sm:grid-cols-3 gap-3 mb-5">
      {points.map((pt, i) => (
        <div key={i} className={`flex gap-3 items-start bg-[#0a0a0f]/60 rounded-xl p-4 border ${accentColor === "violet" ? "border-violet-900/30" : "border-emerald-900/30"}`}>
          <span className="text-xl flex-shrink-0 mt-0.5">{pt.icon}</span>
          <p className="text-slate-400 text-xs leading-relaxed">{pt.text}</p>
        </div>
      ))}
    </div>
  );
}

function Certifications() {
  useReveal();
  return (
    <section id="certifications" className="px-8 py-16 bg-[#111118]">
      <div className="max-w-5xl mx-auto">
        <SectionLabel num="05" label="Certifications" />
        <SectionTitle>My Credentials</SectionTitle>
        <p className="text-slate-400 mb-8 max-w-lg text-sm leading-relaxed">Verified certificates from recognised institutions that validate my technical skills and dedication to learning.</p>

        <div className="reveal space-y-4">
          {/* GUVI Featured */}
          <div className="bg-gradient-to-br from-violet-500/10 to-emerald-500/5 border border-violet-500/30 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row gap-5 items-start mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: "linear-gradient(135deg,rgba(108,99,255,0.2),rgba(67,217,173,0.1))" }}>🎓</div>
              <div>
                <h4 className="font-bold text-white text-base leading-snug mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>IIT-M Pravartak Certified Full Stack Development Course With AI Tools</h4>
                <div className="text-violet-400 text-sm font-medium mb-1">GUVI Geek Network × IIT Madras × HCL × Google for Education Partner</div>
                <div className="text-slate-400 text-xs">📅 Issued: April 2, 2026 · Duration: 3 Months · Signed by CEO Arun Prakash M</div>
                <div className="flex gap-2 flex-wrap mt-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">✅ Verified</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/25">IIT-M Incubated</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/25">MERN + AI Tools</span>
                </div>
              </div>
            </div>
            <div className="mb-1">
              <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">What I Learned</p>
              <LearnedPoints points={GUVI_POINTS} accentColor="violet" />
            </div>
            <img src={GuviCert} alt="GUVI IIT-M Certificate" className="w-full max-w-2xl mx-auto rounded-xl border border-violet-900/30 block" />
          </div>

          {/* AMDOX Internship Certificate */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-violet-500/5 border border-emerald-500/30 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row gap-5 items-start mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: "linear-gradient(135deg,rgba(67,217,173,0.2),rgba(108,99,255,0.1))" }}>🏢</div>
              <div>
                <h4 className="font-bold text-white text-base leading-snug mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>Web Development Internship Certificate</h4>
                <div className="text-emerald-400 text-sm font-medium mb-1">AMDOX — Web Page Development Internship</div>
                <div className="text-slate-400 text-xs">📅 Duration: Dec 2025 – Jan 2026 (2 Months) · Completed with Excellent Score</div>
                <div className="flex gap-2 flex-wrap mt-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">✅ Completed</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/25">MERN Stack</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/25">Web Development</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25">🏆 Excellent Score</span>
                </div>
              </div>
            </div>
            <div className="mb-1">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">What I Learned</p>
              <LearnedPoints points={AMDOX_POINTS} accentColor="emerald" />
            </div>
          </div>

          {/* Other certs */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "⚛️", bg: "rgba(108,99,255,0.12)", title: "React.js — Frontend Development", issuer: "GUVI Geek Network", year: "2026" },
              { icon: "🟢", bg: "rgba(67,217,173,0.12)", title: "Node.js & Express.js — Backend Development", issuer: "GUVI Geek Network", year: "2026" },
              { icon: "🍃", bg: "rgba(255,101,132,0.12)", title: "MongoDB — Database Design", issuer: "GUVI Geek Network", year: "2026" },
            ].map(c => (
              <div key={c.title} className="bg-[#1a1a26] border border-violet-900/20 rounded-2xl p-5 flex gap-4 items-start hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-200">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: c.bg }}>{c.icon}</div>
                <div>
                  <h4 className="font-bold text-white text-sm leading-snug mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>{c.title}</h4>
                  <div className="text-violet-400 text-xs font-medium mb-1">{c.issuer}</div>
                  <div className="text-slate-400 text-xs">📅 {c.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Contact Form — EmailJS
 *
 * Uses emailjs.send() with explicit templateParams so that:
 *   - from_name  = visitor's name they typed
 *   - from_email = visitor's email they typed  ← THIS is the fix
 *   - reply_to   = visitor's email (so when you hit Reply, it goes to them)
 *   - to_email   = subathra2000mdu@gmail.com   (your inbox)
 *   - subject    = whatever they typed
 *   - message    = whatever they typed
 */
function ContactForm() {
  const [form, setForm] = useState({ from_name: "", from_email: "", subject: "", message: "" });
  const [status, setStatus] = useState(""); // "" | "sending" | "success" | "error"

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    // Explicit templateParams — EmailJS uses these to fill your template
    const templateParams = {
      from_name:  form.from_name,              // visitor's name
      from_email: form.from_email,             // visitor's email ← shown in email body
      reply_to:   form.from_email,             // hitting Reply goes to visitor
      to_email:   "subathra2000mdu@gmail.com", // your inbox
      subject:    form.subject,
      message:    form.message,
    };

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("success");
        setForm({ from_name: "", from_email: "", subject: "", message: "" });
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1a1a26] border border-violet-900/30 rounded-2xl p-6 flex flex-col gap-4 shadow-xl"
    >
      {/* Row: Name + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
            Full Name
          </label>
          <input
            type="text"
            name="from_name"
            value={form.from_name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="bg-[#0a0a0f] border border-violet-900/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
            Email Address
          </label>
          <input
            type="email"
            name="from_email"
            value={form.from_email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="bg-[#0a0a0f] border border-violet-900/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          placeholder="Job Opportunity / Project Inquiry / Collaboration"
          className="bg-[#0a0a0f] border border-violet-900/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows="5"
          placeholder="Hi Subathra, I'd like to discuss a Full Stack Developer opportunity..."
          className="bg-[#0a0a0f] border border-violet-900/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors resize-none"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 py-3 px-6 rounded-xl bg-violet-500 text-white font-bold text-sm hover:bg-violet-400 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer border-none shadow-lg shadow-violet-500/20"
      >
        {status === "sending"
          ? "⏳ Sending..."
          : status === "success"
          ? "✅ Message Sent!"
          : "Send Message →"}
      </button>

      {/* Feedback Messages */}
      {status === "success" && (
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3">
          <span className="text-emerald-400 text-lg">✅</span>
          <p className="text-emerald-400 text-xs font-medium">
            Thank you! Your message has been sent. I'll get back to you within 24 hours.
          </p>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
          <span className="text-red-400 text-lg">❌</span>
          <p className="text-red-400 text-xs font-medium">
            Something went wrong. Please email me directly at{" "}
            <a href="mailto:subathra2000mdu@gmail.com" className="underline">
              subathra2000mdu@gmail.com
            </a>
          </p>
        </div>
      )}
    </form>
  );
}

/**
 * Contact Section
 */
function Contact() {
  useReveal();
  const contacts = [
    { icon: "📧", label: "Email", val: "subathra2000mdu@gmail.com", href: "mailto:subathra2000mdu@gmail.com" },
    { icon: "📞", label: "Phone", val: "+91 97869 51738", href: "tel:+919786951738" },
    { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/subathra-s-/", href: "https://www.linkedin.com/in/subathra-s-/" },
    { icon: "🐙", label: "GitHub", val: "github.com/projects-jobs", href: "https://github.com/projects-jobs" },
  ];

  return (
    <section id="contact" className="px-8 py-16 bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto">
        <SectionLabel num="06" label="Contact" />
        <SectionTitle>Let's Work Together</SectionTitle>
        <p className="text-slate-400 mb-12 max-w-lg text-sm leading-relaxed">
          I'm open to full-time roles. Fill out the form and I'll reply within 24 hours — or reach me directly through my contact details.
        </p>

        <div className="reveal grid md:grid-cols-[1fr_1.5fr] gap-10">
          {/* Left: Contact Details */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
              {contacts.map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="no-underline group">
                  <div className="bg-[#1a1a26] border border-violet-900/20 rounded-2xl p-4 flex items-center gap-4 hover:border-violet-500/40 hover:-translate-y-0.5 transition-all duration-200">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{c.icon}</span>
                    <div className="text-left min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">{c.label}</span>
                      <span className="text-sm font-medium text-white truncate block">{c.val}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Resume Box */}
            <div className="p-5 rounded-2xl border border-dashed border-violet-900/40 bg-violet-500/5">
              <h4 className="text-white text-sm font-bold mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>📄 Resume</h4>
              <p className="text-slate-400 text-xs mb-3 leading-relaxed">Want a detailed view of my experience, skills, and projects?</p>
              <a
                href="https://drive.google.com/file/d/1ys15wRbrtzhHpKA2QuGWOuQPjIXAKfnw/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-violet-400 hover:text-white transition-colors underline decoration-violet-500/30 underline-offset-4"
              >
                Download PDF Resume →
              </a>
            </div>

            {/* Availability note */}
            <div className="p-5 rounded-2xl border border-emerald-900/30 bg-emerald-500/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Currently Available</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Open to Full Stack, Frontend Developer roles. Response time: within 24 hours.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/**
 * Footer
 */
function Footer() {
  return (
    <footer className="bg-[#111118] border-t border-violet-900/20 px-8 py-6 text-center text-slate-500 text-xs">
      Designed &amp; Built with ❤️ by <span className="text-violet-400 font-semibold">Subathra S</span> · Full Stack Developer · MERN Developer · IIT-M Pravartak Certified · © 2026
    </footer>
  );
}

/**
 * Back to Top Button
 */
function BackTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
      className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-violet-500 text-white flex items-center justify-center text-lg shadow-lg shadow-violet-500/40 hover:-translate-y-1 hover:bg-violet-400 transition-all duration-200 z-50 border-none cursor-pointer"
    >
      ↑
    </button>
  );
}

/**
 * Shared UI Components
 */
function SectionLabel({ num, label }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-xs font-bold tracking-[0.14em] uppercase text-violet-400">{num} — {label}</span>
      <div className="flex-1 h-px bg-violet-900/30"></div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="font-black mb-3 text-white" style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.7rem,3.2vw,2.4rem)" }}>
      {children}
    </h2>
  );
}

/**
 * Page Assembly
 */
function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
      <BackTop />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}