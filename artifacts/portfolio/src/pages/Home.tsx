import { useState, useRef, useEffect } from "react";
import { Github, Linkedin, Mail, Monitor, Smartphone, Server, Database, ExternalLink, Globe, Terminal, Clock, Calculator, FileText } from "lucide-react";
import { SiPython, SiJavascript, SiReact, SiNodedotjs, SiTailwindcss, SiPostgresql, SiTypescript, SiExpo, SiMongodb } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import eliasPerfilImg from "@/assets/images/elias-perfil.png";
import projectAppImg from "@/assets/images/project-app.png";
import projectEcommerceImg from "@/assets/images/project-ecommerce.png";
import { WindowConfig } from "@/components/FedoraDesktop";
import BluecurveWindow from "@/components/BluecurveWindow";
import BottomDock from "@/components/BottomDock";
import TerminalContent from "@/components/TerminalContent";
import ClockApp from "@/components/ClockApp";
import CalculatorApp from "@/components/CalculatorApp";
import TextEditorApp from "@/components/TextEditorApp";

type Lang = "es" | "en";

export default function Home() {
  const [lang, setLang] = useState<Lang>("es");
  const [openWindows, setOpenWindows] = useState<string[]>(["about", "contact", "terminal"]);
  const [activeWindow, setActiveWindow] = useState<string | null>("terminal");
  const [appsMenuOpen, setAppsMenuOpen] = useState(false);
  const appsMenuRef = useRef<HTMLDivElement>(null);
  const zCounter = useRef(100);
  const zMap = useRef<Record<string, number>>({ about: 100, contact: 101, terminal: 102 });

  const toggleLang = () => setLang(lang === "es" ? "en" : "es");

  useEffect(() => {
    if (!appsMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (appsMenuRef.current && !appsMenuRef.current.contains(e.target as Node)) {
        setAppsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [appsMenuOpen]);

  const bringToFront = (id: string) => {
    zCounter.current += 1;
    zMap.current[id] = zCounter.current;
  };

  const openWindow = (id: string) => {
    setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveWindow(id);
    bringToFront(id);
  };

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setActiveWindow((prev) => (prev === id ? null : prev));
  };

  const selectWindow = (id: string) => {
    setActiveWindow(id);
    bringToFront(id);
  };
  const showDesktop = () => setActiveWindow(null);

  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const t = {
    es: {
      nav: ["Sobre mí", "Habilidades", "Proyectos", "Contacto"],
      heroHola: "¡Hola! Soy",
      heroRol: "DESARROLLADOR DE SOFTWARE",
      heroFullStack: "Full-Stack Developer",
      about: "SOBRE MÍ",
      about1: "Soy un desarrollador de software y aficionado de la tecnología que busca crear ",
      about1b: "experiencias digitales con la mejor UI y funcionalidades factibles con código",
      about2: "Con buena experiencia en ",
      about2b: "arquitectura de software",
      about2c: " y un amor profundo por construir soluciones. Me enfoco en rendimiento y escalabilidad.",
      about3: "Aficionado a los diagramas de arquitectura de software, el aroma del café y el código optimizado.",
      skills: "HABILIDADES",
      skillsDesc: "(Cómo construyo y conecto las cosas)",
      frontend: "Frontend",
      mobile: "Mobile",
      backend: "Backend",
      database: "Base de Datos",
      projects: "PROYECTOS",
      project1Title: "E-commerce Platform - Next.js Commerce",
      project1Desc: "Tienda online moderna con catálogo de productos, carrito de compras y checkout impulsado por Shopify.",
      project1Btn: "Ver código",
      project1SiteBtn: "Ver sitio",
      project2Title: "Finanz",
      project2Desc: "Plataforma de servicios financieros con panel de control, autenticación y gestión de finanzas personales.",
      project2Btn: "Ver código",
      project3Title: "Sitio web - Navixsoft",
      project3Desc: "Sitio corporativo de una empresa de desarrollo de software. Desarrollo completo: diseño, frontend, backend e infraestructura.",
      project3SiteBtn: "Ver sitio",
      experience: "EXPERIENCIA",
      exp: [
        { year: "2025 - Presente", role: "Mid Software Engineer", company: "Navixsoft", desc: "Desarrollo backend y frontend con Python, Node.js y React. Infraestructura en AWS, GCP y Railway." },
        { year: "2025 - 2026", role: "Full-Stack Developer", company: "Botcamp Roshka", desc: "UI development with React and APIs in Java." },
        { year: "2023 - 2024", role: "Junior Developer", company: "StartUp Factory", desc: "Legacy system maintenance and web development beginnings." },
      ],
      contact: "CONTACTO",
      contactReady: "¿Listo para empezar? ",
      contactLetsTalk: "Hablemos.",
      contactName: "Nombre",
      contactPhone: "Teléfono",
      contactMessage: "Mensaje",
      contactNamePlaceholder: "Tu Nombre",
      contactPhonePlaceholder: "Tu Teléfono",
      contactMsgPlaceholder: "¡Hola Elías!...",
      contactBtn: "ENVIAR MENSAJE",
      contactSuccess: "¡Mensaje enviado con éxito!",
      contactError: "Error al enviar. Intenta de nuevo.",
      footerSlogan: "Pizarra limpia. Código limpio.",
    },
    en: {
      nav: ["About", "Skills", "Projects", "Contact"],
      heroHola: "Hi! I'm",
      heroRol: "SOFTWARE DEVELOPER",
      heroFullStack: "Full-Stack Developer",
      about: "ABOUT ME",
      about1: "I'm a software developer and technology enthusiast who seeks to create ",
      about1b: "digital experiences with the best UI and feasible features in code",
      about2: "With solid experience in ",
      about2b: "software architecture",
      about2c: " and a deep love for building solutions. I focus on performance and scalability.",
      about3: "Fond of software architecture diagrams, the aroma of coffee, and optimized code.",
      skills: "SKILLS",
      skillsDesc: "(How I build and connect things)",
      frontend: "Frontend",
      mobile: "Mobile",
      backend: "Backend",
      database: "Database",
      projects: "PROJECTS",
      project1Title: "E-commerce Platform - Next.js Commerce",
      project1Desc: "Modern online store with product catalog, shopping cart, and Shopify-powered checkout.",
      project1Btn: "View code",
      project1SiteBtn: "View site",
      project2Title: "Finanz",
      project2Desc: "Financial services platform with dashboard, authentication, and personal finance management.",
      project2Btn: "View code",
      project3Title: "Website - Navixsoft",
      project3Desc: "Corporate site for a software development company. Full development: design, frontend, backend and infrastructure.",
      project3SiteBtn: "View site",
      experience: "EXPERIENCE",
      exp: [
        { year: "2025 - Present", role: "Mid Software Engineer", company: "Navixsoft", desc: "Backend and frontend development with Python, Node.js and React. Infrastructure on AWS, GCP and Railway." },
        { year: "2025 - 2026", role: "Full-Stack Developer", company: "Botcamp Roshka", desc: "UI development with React and APIs in Java." },
        { year: "2023 - 2024", role: "Junior Developer", company: "StartUp Factory", desc: "Legacy system maintenance and web development beginnings." },
      ],
      contact: "CONTACT",
      contactReady: "Ready to start? ",
      contactLetsTalk: "Let's talk.",
      contactName: "Name",
      contactPhone: "Phone",
      contactMessage: "Message",
      contactNamePlaceholder: "Your Name",
      contactPhonePlaceholder: "Your Phone",
      contactMsgPlaceholder: "Hi Elias!...",
      contactBtn: "SEND MESSAGE",
      contactSuccess: "Message sent successfully!",
      contactError: "Error sending. Please try again.",
      footerSlogan: "Clean board. Clean code.",
    },
  };

  // Window definitions
  const windowConfigs: WindowConfig[] = [
    {
      id: "about",
      title: `${t[lang].about} - Portfolio`,
      icon: <span className="text-[14px]">👤</span>,
      desktopIcon: <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]"><rect x="4" y="4" width="40" height="40" rx="4" fill="#ececec" stroke="#808080" strokeWidth="1.5"/><circle cx="24" cy="18" r="8" fill="#3366aa"/><path d="M10 40 C10 30 18 26 24 26 C30 26 38 30 38 40" fill="#3366aa"/><rect x="16" y="32" width="16" height="4" rx="1" fill="#fff" opacity="0.4"/></svg>,
      desktopLabel: "About Me",
    },
    {
      id: "skills",
      title: `${t[lang].skills} - Portfolio`,
      icon: <Terminal className="w-[14px] h-[14px] text-white" />,
      desktopIcon: <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]"><rect x="4" y="4" width="40" height="40" rx="3" fill="#1a1a2e" stroke="#404040" strokeWidth="1.5"/><text x="10" y="20" fill="#00ff00" fontSize="8" fontFamily="monospace">&gt;_</text><text x="10" y="30" fill="#00ff00" fontSize="6" fontFamily="monospace">skills</text><rect x="10" y="34" width="8" height="2" fill="#00ff00" opacity="0.6"><animate attributeName="opacity" values="0.6;0;0.6" dur="1s" repeatCount="indefinite"/></rect></svg>,
      desktopLabel: "Skills",
    },
    {
      id: "projects",
      title: `${t[lang].projects} - Portfolio`,
      icon: <Globe className="w-[14px] h-[14px] text-white" />,
      desktopIcon: <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]"><rect x="4" y="6" width="40" height="36" rx="3" fill="#ececec" stroke="#808080" strokeWidth="1.5"/><rect x="6" y="8" width="36" height="3" fill="#3c6fa0"/><rect x="8" y="14" width="14" height="10" rx="1" fill="#ddd"/><rect x="26" y="14" width="14" height="10" rx="1" fill="#ddd"/><rect x="8" y="26" width="32" height="2" rx="1" fill="#ccc"/><rect x="8" y="30" width="24" height="2" rx="1" fill="#ccc"/></svg>,
      desktopLabel: "Projects",
    },
    {
      id: "experience",
      title: `${t[lang].experience} - Portfolio`,
      icon: <span className="text-[14px]">📋</span>,
      desktopIcon: <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]"><rect x="6" y="4" width="36" height="40" rx="2" fill="#fff" stroke="#808080" strokeWidth="1.5"/><rect x="6" y="4" width="36" height="8" fill="#3c6fa0"/><circle cx="12" cy="8" r="2" fill="#ff4444"/><circle cx="18" cy="8" r="2" fill="#ffcc00"/><circle cx="24" cy="8" r="2" fill="#44bb44"/><line x1="10" y1="16" x2="38" y2="16" stroke="#ddd" strokeWidth="1"/><line x1="10" y1="22" x2="38" y2="22" stroke="#ddd" strokeWidth="1"/><line x1="10" y1="28" x2="38" y2="28" stroke="#ddd" strokeWidth="1"/><line x1="10" y1="34" x2="30" y2="34" stroke="#ddd" strokeWidth="1"/></svg>,
      desktopLabel: "Experience",
    },
    {
      id: "contact",
      title: `${t[lang].contact} - Portfolio`,
      icon: <Mail className="w-[14px] h-[14px] text-white" />,
      desktopIcon: <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]"><rect x="4" y="10" width="40" height="28" rx="2" fill="#ececec" stroke="#808080" strokeWidth="1.5"/><path d="M4 12 L24 28 L44 12" fill="none" stroke="#3366aa" strokeWidth="2"/><rect x="4" y="10" width="40" height="28" rx="2" fill="none" stroke="#808080" strokeWidth="1.5"/></svg>,
      desktopLabel: "Contact",
    },
    {
      id: "terminal",
      title: "Terminal - elias@fedora",
      icon: <Terminal className="w-[14px] h-[14px] text-white" />,
      desktopIcon: <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]"><rect x="4" y="4" width="40" height="40" rx="3" fill="#1a1a2e" stroke="#404040" strokeWidth="1.5"/><rect x="4" y="4" width="40" height="6" fill="#3c6fa0"/><polyline points="10,18 16,24 10,30" fill="none" stroke="#00ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="18" y1="30" x2="32" y2="30" stroke="#00ff00" strokeWidth="2" strokeLinecap="round"/><rect x="10" y="34" width="6" height="1.5" fill="#00ff00" opacity="0.7"/></svg>,
      desktopLabel: "Terminal",
    },
    {
      id: "clock",
      title: "Clock",
      icon: <Clock className="w-[14px] h-[14px] text-white" />,
      desktopIcon: <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]"><circle cx="24" cy="24" r="20" fill="white" stroke="#808080" strokeWidth="1.5"/><circle cx="24" cy="24" r="18" fill="white" stroke="#d0d0d0" strokeWidth="0.5"/>{[12,1,2,3,4,5,6,7,8,9,10,11].map((n,i)=>{const a=(i*30*Math.PI)/180;return <line key={n} x1={24+14*Math.sin(a)} y1={24-14*Math.cos(a)} x2={24+17*Math.sin(a)} y2={24-17*Math.cos(a)} stroke="#333" strokeWidth="1.5"/>;})}<line x1="24" y1="24" x2="24" y2="13" stroke="#333" strokeWidth="2" strokeLinecap="round"/><line x1="24" y1="24" x2="33" y2="24" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/><circle cx="24" cy="24" r="1.5" fill="#cc0000"/></svg>,
      desktopLabel: "Clock",
    },
    {
      id: "calculator",
      title: "Calculator",
      icon: <Calculator className="w-[14px] h-[14px] text-white" />,
      desktopIcon: <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]"><rect x="8" y="4" width="32" height="40" rx="3" fill="#ececec" stroke="#808080" strokeWidth="1.5"/><rect x="11" y="7" width="26" height="10" rx="1" fill="white" stroke="#808080" strokeWidth="0.8"/><text x="33" y="15" textAnchor="end" fontSize="9" fontFamily="monospace" fill="#333">0.</text><rect x="11" y="20" width="5" height="4" rx="0.5" fill="white" stroke="#aaa" strokeWidth="0.5"/><rect x="18" y="20" width="5" height="4" rx="0.5" fill="white" stroke="#aaa" strokeWidth="0.5"/><rect x="25" y="20" width="5" height="4" rx="0.5" fill="white" stroke="#aaa" strokeWidth="0.5"/><rect x="32" y="20" width="5" height="4" rx="0.5" fill="#3366aa" stroke="#2a5580" strokeWidth="0.5"/><rect x="11" y="26" width="5" height="4" rx="0.5" fill="white" stroke="#aaa" strokeWidth="0.5"/><rect x="18" y="26" width="5" height="4" rx="0.5" fill="white" stroke="#aaa" strokeWidth="0.5"/><rect x="25" y="26" width="5" height="4" rx="0.5" fill="white" stroke="#aaa" strokeWidth="0.5"/><rect x="32" y="26" width="5" height="4" rx="0.5" fill="white" stroke="#aaa" strokeWidth="0.5"/><rect x="11" y="32" width="5" height="4" rx="0.5" fill="white" stroke="#aaa" strokeWidth="0.5"/><rect x="18" y="32" width="5" height="4" rx="0.5" fill="white" stroke="#aaa" strokeWidth="0.5"/><rect x="25" y="32" width="5" height="4" rx="0.5" fill="white" stroke="#aaa" strokeWidth="0.5"/><rect x="32" y="32" width="5" height="4" rx="0.5" fill="#3366aa" stroke="#2a5580" strokeWidth="0.5"/><rect x="11" y="38" width="12" height="4" rx="0.5" fill="white" stroke="#aaa" strokeWidth="0.5"/><rect x="25" y="38" width="5" height="4" rx="0.5" fill="white" stroke="#aaa" strokeWidth="0.5"/><rect x="32" y="38" width="5" height="4" rx="0.5" fill="#3366aa" stroke="#2a5580" strokeWidth="0.5"/></svg>,
      desktopLabel: "Calculator",
    },
    {
      id: "texteditor",
      title: "gedit - Text Editor",
      icon: <FileText className="w-[14px] h-[14px] text-white" />,
      desktopIcon: <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]"><rect x="8" y="4" width="32" height="40" rx="2" fill="white" stroke="#808080" strokeWidth="1.5"/><rect x="8" y="4" width="32" height="6" fill="#3c6fa0"/><line x1="12" y1="16" x2="36" y2="16" stroke="#ccc" strokeWidth="1"/><line x1="12" y1="21" x2="36" y2="21" stroke="#ccc" strokeWidth="1"/><line x1="12" y1="26" x2="30" y2="26" stroke="#ccc" strokeWidth="1"/><line x1="12" y1="31" x2="34" y2="31" stroke="#ccc" strokeWidth="1"/><line x1="12" y1="36" x2="24" y2="36" stroke="#ccc" strokeWidth="1"/></svg>,
      desktopLabel: "Text Editor",
    },
  ];

  // Build window content map
  const windowContent: Record<string, React.ReactNode> = {
    about: (
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="shrink-0">
            <img
              src={eliasPerfilImg}
              alt="Elías Ortiz"
              className="w-[200px] h-[200px] object-cover border-2 border-[#808080]"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-[28px] font-bold text-[#333] mb-1" style={{ fontFamily: "var(--font-display)" }}>
              ELÍAS ORTIZ
            </h1>
            <div className="text-[14px] text-[#3366aa] font-semibold mb-4">{t[lang].heroRol}</div>
            <div className="space-y-3 text-[13px] text-[#333] leading-relaxed">
              <p>
                {t[lang].about1}
                <strong className="text-[#3366aa]">{t[lang].about1b}</strong>.
              </p>
              <p>
                {t[lang].about2}
                <strong className="text-[#3366aa]">{t[lang].about2b}</strong>
                {t[lang].about2c}
              </p>
              <p>{t[lang].about3}</p>
            </div>
            <div className="flex gap-3 mt-5">
              <a href="https://github.com/esam-dev" target="_blank" rel="noopener noreferrer" className="btn-bluecurve flex items-center gap-1.5">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/el%C3%ADas-ort%C3%ADz-a5895224b/" target="_blank" rel="noopener noreferrer" className="btn-bluecurve flex items-center gap-1.5">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href="mailto:emails.eliasortiz@gmail.com" className="btn-bluecurve flex items-center gap-1.5">
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    ),

    skills: (
      <div className="p-6">
        <h2 className="text-[20px] font-bold text-[#333] mb-1">{t[lang].skills}</h2>
        <div className="text-[12px] text-[#666] mb-5">{t[lang].skillsDesc}</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Frontend */}
          <div className="bg-[#f8f8f8] bevel-raised p-4">
            <div className="flex items-center gap-2 mb-3">
              <Monitor className="w-5 h-5 text-[#3366aa]" />
              <span className="font-bold text-[14px] text-[#333]">{t[lang].frontend}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <SiReact className="w-6 h-6 text-[#61DAFB]" />, label: "React" },
                { icon: <SiJavascript className="w-6 h-6 text-[#F0DB4F]" />, label: "JavaScript" },
                { icon: <SiTypescript className="w-6 h-6 text-[#3178C6]" />, label: "TypeScript" },
                { icon: <SiTailwindcss className="w-6 h-6 text-[#06B6D4]" />, label: "Tailwind" },
              ].map((tech) => (
                <div key={tech.label} className="flex items-center gap-1.5 px-2 py-1.5 bg-white bevel-raised text-[11px]">
                  {tech.icon}
                  <span className="font-semibold">{tech.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="bg-[#f8f8f8] bevel-raised p-4">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="w-5 h-5 text-[#a855f7]" />
              <span className="font-bold text-[14px] text-[#333]">{t[lang].mobile}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <SiReact className="w-6 h-6 text-[#61DAFB]" />, label: "React Native" },
                { icon: <SiExpo className="w-6 h-6 text-[#000]" />, label: "Expo" },
              ].map((tech) => (
                <div key={tech.label} className="flex items-center gap-1.5 px-2 py-1.5 bg-white bevel-raised text-[11px]">
                  {tech.icon}
                  <span className="font-semibold">{tech.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="bg-[#f8f8f8] bevel-raised p-4">
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-5 h-5 text-[#ef4444]" />
              <span className="font-bold text-[14px] text-[#333]">{t[lang].backend}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <SiPython className="w-6 h-6 text-[#3776AB]" />, label: "Python" },
                { icon: <FaJava className="w-6 h-6 text-[#f89820]" />, label: "Java" },
                { icon: <SiNodedotjs className="w-6 h-6 text-[#339933]" />, label: "Node.js" },
              ].map((tech) => (
                <div key={tech.label} className="flex items-center gap-1.5 px-2 py-1.5 bg-white bevel-raised text-[11px]">
                  {tech.icon}
                  <span className="font-semibold">{tech.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Database */}
          <div className="bg-[#f8f8f8] bevel-raised p-4">
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5 text-[#f59e0b]" />
              <span className="font-bold text-[14px] text-[#333]">{t[lang].database}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <SiPostgresql className="w-6 h-6 text-[#336791]" />, label: "PostgreSQL" },
                { icon: <SiMongodb className="w-6 h-6 text-[#47A248]" />, label: "MongoDB" },
              ].map((tech) => (
                <div key={tech.label} className="flex items-center gap-1.5 px-2 py-1.5 bg-white bevel-raised text-[11px]">
                  {tech.icon}
                  <span className="font-semibold">{tech.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    projects: (
      <div className="p-6 space-y-6">
        <h2 className="text-[20px] font-bold text-[#333] mb-2">{t[lang].projects}</h2>

        {/* Project 1 */}
        <div className="bg-[#f8f8f8] bevel-raised p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-1/2">
              <img src={projectEcommerceImg} alt={t[lang].project1Title} className="w-full h-auto border border-[#808080]" />
            </div>
            <div className="sm:w-1/2">
              <h3 className="text-[16px] font-bold text-[#333] mb-2">{t[lang].project1Title}</h3>
              <p className="text-[12px] text-[#555] mb-3 leading-relaxed">{t[lang].project1Desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="text-[10px] bg-[#3366aa] text-white px-2 py-0.5">Next.js</span>
                <span className="text-[10px] bg-[#96bf48] text-white px-2 py-0.5">Shopify</span>
                <span className="text-[10px] bg-[#3178C6] text-white px-2 py-0.5">TypeScript</span>
              </div>
              <div className="flex gap-2">
                <a href="https://github.com/esam-dev/catlink" target="_blank" rel="noopener noreferrer" className="btn-bluecurve flex items-center gap-1 text-[11px]">
                  <Github className="w-3.5 h-3.5" /> {t[lang].project1Btn}
                </a>
                <a href="https://nextjs-commerce-three-sooty-63.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-widget flex items-center gap-1 text-[11px]">
                  <ExternalLink className="w-3.5 h-3.5" /> {t[lang].project1SiteBtn}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="bg-[#f8f8f8] bevel-raised p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-1/2">
              <img src={projectAppImg} alt={t[lang].project2Title} className="w-full h-auto border border-[#808080]" />
            </div>
            <div className="sm:w-1/2">
              <h3 className="text-[16px] font-bold text-[#333] mb-2">{t[lang].project2Title}</h3>
              <p className="text-[12px] text-[#555] mb-3 leading-relaxed">{t[lang].project2Desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="text-[10px] bg-[#61DAFB] text-black px-2 py-0.5">React</span>
                <span className="text-[10px] bg-[#FFCA28] text-black px-2 py-0.5">Firebase</span>
                <span className="text-[10px] bg-[#3178C6] text-white px-2 py-0.5">TypeScript</span>
              </div>
              <a href="https://finanz-services.web.app/auth" target="_blank" rel="noopener noreferrer" className="btn-bluecurve flex items-center gap-1 text-[11px] w-fit">
                <Github className="w-3.5 h-3.5" /> {t[lang].project2Btn}
              </a>
            </div>
          </div>
        </div>

        {/* Project 3 */}
        <div className="bg-[#f8f8f8] bevel-raised p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-1/2">
              <div className="w-full aspect-video bg-[#1a1a2e] flex items-center justify-center border border-[#808080]">
                <span className="text-white text-[24px] font-bold" style={{ fontFamily: "var(--font-display)" }}>NAVIXSOFT.</span>
              </div>
            </div>
            <div className="sm:w-1/2">
              <h3 className="text-[16px] font-bold text-[#333] mb-2">{t[lang].project3Title}</h3>
              <p className="text-[12px] text-[#555] mb-3 leading-relaxed">{t[lang].project3Desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="text-[10px] bg-[#61DAFB] text-black px-2 py-0.5">React</span>
                <span className="text-[10px] bg-[#3178C6] text-white px-2 py-0.5">TypeScript</span>
                <span className="text-[10px] bg-[#06B6D4] text-white px-2 py-0.5">Tailwind</span>
              </div>
              <a href="https://navixsoft.com" target="_blank" rel="noopener noreferrer" className="btn-bluecurve flex items-center gap-1 text-[11px] w-fit">
                <ExternalLink className="w-3.5 h-3.5" /> {t[lang].project3SiteBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    ),

    experience: (
      <div className="p-6">
        <h2 className="text-[20px] font-bold text-[#333] mb-5">{t[lang].experience}</h2>
        <div className="space-y-4">
          {t[lang].exp.map((exp, i) => (
            <div key={i} className="bg-[#f8f8f8] bevel-raised p-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 bg-[#3366aa] text-white text-[10px] font-bold px-2 py-1 uppercase min-w-[100px] text-center">
                  {exp.year}
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#333]">{exp.role}</h4>
                  <div className="text-[13px] text-[#3366aa] font-semibold">{exp.company}</div>
                  <p className="text-[12px] text-[#555] mt-1">{exp.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    contact: (
      <div className="p-6">
        <h2 className="text-[20px] font-bold text-[#333] mb-1 text-center">{t[lang].contact}</h2>
        <p className="text-[12px] text-[#555] mb-5 text-center">
          {t[lang].contactReady}
          <strong className="text-[#3366aa]">{t[lang].contactLetsTalk}</strong>
        </p>

        <form className="space-y-3 max-w-md mx-auto" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[12px] font-semibold text-[#333] mb-1">{t[lang].contactName}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-[12px] bg-white bevel-sunken focus:outline-none"
              placeholder={t[lang].contactNamePlaceholder}
              required
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#333] mb-1">{t[lang].contactPhone}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-[12px] bg-white bevel-sunken focus:outline-none"
              placeholder={t[lang].contactPhonePlaceholder}
              required
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#333] mb-1">{t[lang].contactMessage}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-[12px] bg-white bevel-sunken focus:outline-none resize-none h-24"
              placeholder={t[lang].contactMsgPlaceholder}
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="btn-bluecurve w-full py-2 font-bold text-[13px] disabled:opacity-50"
          >
            {submitting ? "SENDING..." : t[lang].contactBtn}
          </button>
        </form>

        {status === "success" && (
          <div className="mt-3 p-2 bg-[#d4edda] border border-[#28a745] text-[12px] text-[#155724] text-center">
            {t[lang].contactSuccess}
          </div>
        )}
        {status === "error" && (
          <div className="mt-3 p-2 bg-[#f8d7da] border border-[#dc3545] text-[12px] text-[#721c24] text-center">
            {t[lang].contactError}
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-[#d0d0d0] flex justify-center gap-3">
          <a href="https://github.com/esam-dev" target="_blank" rel="noopener noreferrer" className="btn-widget p-2 flex items-center justify-center" title="GitHub">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/el%C3%ADas-ort%C3%ADz-a5895224b/" target="_blank" rel="noopener noreferrer" className="btn-widget p-2 flex items-center justify-center" title="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="mailto:emails.eliasortiz@gmail.com" className="btn-widget p-2 flex items-center justify-center" title="Email">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    ),

    terminal: <TerminalContent />,
    clock: <ClockApp />,
    calculator: <CalculatorApp />,
    texteditor: <TextEditorApp />,
  };

  // Desktop icon SVGs for the panel
  const desktopIcons: Record<string, React.ReactNode> = {
    about: <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]"><rect x="4" y="4" width="40" height="40" rx="4" fill="#ececec" stroke="#808080" strokeWidth="1.5"/><circle cx="24" cy="18" r="8" fill="#3366aa"/><path d="M10 40 C10 30 18 26 24 26 C30 26 38 30 38 40" fill="#3366aa"/></svg>,
    skills: <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]"><rect x="4" y="4" width="40" height="40" rx="3" fill="#1a1a2e" stroke="#404040" strokeWidth="1.5"/><text x="10" y="20" fill="#00ff00" fontSize="8" fontFamily="monospace">&gt;_</text><text x="10" y="30" fill="#00ff00" fontSize="6" fontFamily="monospace">skills</text></svg>,
    projects: <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]"><rect x="4" y="6" width="40" height="36" rx="3" fill="#ececec" stroke="#808080" strokeWidth="1.5"/><rect x="6" y="8" width="36" height="3" fill="#3c6fa0"/><rect x="8" y="14" width="14" height="10" rx="1" fill="#ddd"/><rect x="26" y="14" width="14" height="10" rx="1" fill="#ddd"/></svg>,
    experience: <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]"><rect x="6" y="4" width="36" height="40" rx="2" fill="#fff" stroke="#808080" strokeWidth="1.5"/><rect x="6" y="4" width="36" height="8" fill="#3c6fa0"/><circle cx="12" cy="8" r="2" fill="#ff4444"/><circle cx="18" cy="8" r="2" fill="#ffcc00"/><circle cx="24" cy="8" r="2" fill="#44bb44"/></svg>,
    contact: <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]"><rect x="4" y="10" width="40" height="28" rx="2" fill="#ececec" stroke="#808080" strokeWidth="1.5"/><path d="M4 12 L24 28 L44 12" fill="none" stroke="#3366aa" strokeWidth="2"/></svg>,
  };

  const windowConfigsData: WindowConfig[] = windowConfigs.map((w) => ({
    ...w,
    desktopIcon: desktopIcons[w.id] ?? w.desktopIcon,
  }));

  return (
    <div className="w-screen h-screen overflow-hidden relative desktop-gradient">
      {/* Top Panel */}
      <div
        className="panel-gradient h-[28px] flex items-center px-0 text-[12px] text-white fixed top-0 left-0 right-0 z-[1000] select-none"
        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
      >
        {/* Left: Fedora logo + menus */}
        <div className="flex items-center h-full">
          <div className="flex items-center justify-center h-full px-3 hover:bg-white/10 cursor-default" title="Fedora">
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="white">
              <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="1.5" />
              <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">f</text>
            </svg>
          </div>
          <div className="w-px h-[18px] bg-white/20" />
          {/* Applications menu */}
          <div className="relative" ref={appsMenuRef}>
            <button
              className="h-[28px] px-3 hover:bg-white/10 font-semibold text-[12px]"
              onClick={() => setAppsMenuOpen((p) => !p)}
            >
              Applications
            </button>
            {appsMenuOpen && (
              <div className="absolute top-full left-0 mt-0 min-w-[180px] bg-[#ececec] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] shadow-md z-[2000]">
                {[
                  { id: "terminal", label: "Terminal", icon: <Terminal className="w-[13px] h-[13px] text-[#333]" /> },
                  { id: "clock", label: "Clock", icon: <Clock className="w-[13px] h-[13px] text-[#333]" /> },
                  { id: "calculator", label: "Calculator", icon: <Calculator className="w-[13px] h-[13px] text-[#333]" /> },
                  { id: "texteditor", label: "Text Editor", icon: <FileText className="w-[13px] h-[13px] text-[#333]" /> },
                ].map((app) => (
                  <button
                    key={app.id}
                    className="w-full flex items-center gap-2 px-3 py-[5px] text-[12px] text-[#333] hover:bg-[#3366aa] hover:text-white text-left cursor-default"
                    onClick={() => { openWindow(app.id); setAppsMenuOpen(false); }}
                  >
                    {app.icon}
                    <span>{app.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="h-[28px] px-3 hover:bg-white/10 font-semibold text-[12px] max-sm:hidden">
            Places
          </button>
          <button className="h-[28px] px-3 hover:bg-white/10 font-semibold text-[12px] max-sm:hidden">
            System
          </button>
        </div>

        {/* Center: title */}
        <div className="flex-1 flex justify-center max-sm:hidden">
          <span className="text-[12px] text-white/80 truncate max-w-[400px]">
            {activeWindow ? windowConfigs.find((w) => w.id === activeWindow)?.title || "" : "Fedora Core 1 Desktop"}
          </span>
        </div>

        {/* Right: lang + clock */}
        <div className="flex items-center h-full">
          <button className="flex items-center h-full px-3 hover:bg-white/10 text-[12px] font-semibold" onClick={toggleLang}>
            {lang === "es" ? "ES" : "EN"}
          </button>
          <div className="w-px h-[18px] bg-white/20" />
          <div className="flex items-center h-full px-3 hover:bg-white/10 cursor-default">
            <span className="text-[12px] font-medium tabular-nums">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop area */}
      <div className="absolute left-0 right-0 overflow-auto" style={{ top: "28px", bottom: "28px" }}>
        {/* Desktop icons */}
        <div className="absolute top-3 left-3 flex flex-col gap-0.5 z-[50] sm:flex-col max-sm:flex-row max-sm:flex-wrap max-sm:gap-1">
          {windowConfigsData.map((win) => (
            <button
              key={win.id}
              className={`flex flex-col items-center gap-0.5 w-[60px] p-0.5 rounded cursor-default select-none ${
                activeWindow === win.id ? "bg-[#3366aa]/40" : "hover:bg-white/10"
              }`}
              onClick={() => openWindow(win.id)}
            >
              <div className="w-[36px] h-[36px] flex items-center justify-center" style={{ transform: "scale(0.75)", transformOrigin: "center" }}>{win.desktopIcon}</div>
              <span
                className={`text-[10px] text-center leading-tight px-0.5 max-w-full truncate ${
                  activeWindow === win.id ? "bg-[#3366aa] text-white" : "text-white"
                }`}
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
              >
                {win.desktopLabel}
              </span>
            </button>
          ))}
        </div>

        {/* Windows */}
        {windowConfigs.map((win) => (
          <BluecurveWindow
            key={win.id}
            title={win.title}
            icon={win.icon}
            isOpen={openWindows.includes(win.id)}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => setActiveWindow(null)}
            zIndex={zMap.current[win.id] ?? 100}
            onFocus={() => { setActiveWindow(win.id); bringToFront(win.id); }}
            defaultWidth={
              win.id === "terminal" ? Math.min(650, window.innerWidth - 40)
              : win.id === "clock" ? Math.min(300, window.innerWidth - 40)
              : win.id === "calculator" ? Math.min(260, window.innerWidth - 40)
              : win.id === "texteditor" ? Math.min(550, window.innerWidth - 40)
              : win.id === "skills" || win.id === "projects" ? Math.min(800, window.innerWidth - 40)
              : Math.min(650, window.innerWidth - 40)
            }
            defaultHeight={
              win.id === "terminal" ? Math.min(420, window.innerHeight - 80)
              : win.id === "clock" ? Math.min(340, window.innerHeight - 80)
              : win.id === "calculator" ? Math.min(380, window.innerHeight - 80)
              : win.id === "texteditor" ? Math.min(420, window.innerHeight - 80)
              : win.id === "projects" ? Math.min(580, window.innerHeight - 80)
              : Math.min(500, window.innerHeight - 80)
            }
            defaultPosition={
              win.id === "terminal" ? { x: Math.min(150, window.innerWidth - 700), y: Math.min(80, window.innerHeight - 500) }
              : win.id === "clock" ? { x: Math.min(300, window.innerWidth - 350), y: Math.min(100, window.innerHeight - 400) }
              : win.id === "calculator" ? { x: Math.min(500, window.innerWidth - 310), y: Math.min(120, window.innerHeight - 430) }
              : win.id === "texteditor" ? { x: Math.min(180, window.innerWidth - 600), y: Math.min(60, window.innerHeight - 470) }
              : { x: Math.min(100 + windowConfigs.indexOf(win) * 30, window.innerWidth - 700), y: Math.min(30 + windowConfigs.indexOf(win) * 20, window.innerHeight - 560) }
            }
            showMenuBar={!["terminal", "clock", "calculator"].includes(win.id)}
          >
            {windowContent[win.id]}
          </BluecurveWindow>
        ))}
      </div>

      {/* Bottom Dock */}
      <BottomDock
        openWindows={openWindows.map((id) => {
          const win = windowConfigs.find((w) => w.id === id);
          return { id, title: win?.title || "", icon: win?.desktopLabel || "" };
        })}
        activeWindow={activeWindow}
        onSelectWindow={selectWindow}
        onShowDesktop={showDesktop}
        onOpenApp={openWindow}
      />

      {/* Footer bar at very bottom with slogan */}
      <div className="fixed bottom-[28px] left-0 right-0 h-0 z-[999]" />
    </div>
  );
}
