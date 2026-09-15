import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Blocks, Briefcase, CalendarDays, Check, Code2, Gamepad2, Github, Globe, Heart, Lightbulb, Linkedin, Mail, MapPin, Menu, Rocket, ShoppingBag, Star, Target, Volume2, VolumeX, Wallet, X, Zap } from "lucide-react";
import { SiDocker, SiExpo, SiGit, SiGithub, SiJavascript, SiLinux, SiNodedotjs, SiNextdotjs, SiOpenjdk, SiPostgresql, SiPython, SiRailway, SiReact, SiTypescript, SiVercel } from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { ModeToggle } from "@/components/mode-toggle";
import Doodles from "@/components/Doodles";
import profileImage from "@/assets/images/elias-perfil.png";

type Lang = "es" | "en";
const copy = {
    es: { nav: ["Sobre mí", "Proyectos", "Experiencia"], eyebrow: "Software developer", title: "Hola, soy Elías Ortiz.", intro: "Bienvenido a mi portfolio. Soy software developer y creo sitios web, aplicaciones y herramientas pensadas para ser útiles, simples y formar parte de la vida cotidiana.", work: "Ver mis proyectos", contact: "Hablemos", available: "Disponible para proyectos", selected: "Proyectos seleccionados", selectedIntro: "Una muestra de soluciones en las que he trabajado, desde la idea y la interfaz hasta el código y la puesta en producción.", aboutTitle: "Sobre mí, en pocas palabras.", about: "Soy Elías Ortiz, software developer y aficionado a la tecnología. Me gusta entender cómo las personas usan el software y convertir sus necesidades en experiencias claras, útiles y agradables.", stack: "Tecnologías que uso", experience: "Mi recorrido", experienceIntro: "Los lugares y equipos que forman parte de mi experiencia como desarrollador.", contactTitle: "¿Trabajamos juntos?", contactIntro: "Si tienes una idea, un proyecto o simplemente quieres conversar sobre tecnología, escríbeme.", name: "Nombre", email: "Email", phone: "Teléfono", message: "Mensaje", send: "Enviar mensaje", sending: "Enviando...", success: "Mensaje enviado. Gracias por escribirme.", error: "No se pudo enviar el mensaje. Inténtalo de nuevo.", live: "En línea", featured: "Proyectos destacados", pages: "en producción", viewGallery: "Ver galería de proyectos", openProject: "Abrir" },
    en: { nav: ["About", "Projects", "Experience"], eyebrow: "Software developer", title: "Hi, I'm Elías Ortiz.", intro: "Welcome to my portfolio. I'm a software developer who creates websites, applications, and tools made to be useful, simple, and part of people's everyday lives.", work: "See my projects", contact: "Let's talk", available: "Open to projects", selected: "Selected projects", selectedIntro: "A selection of solutions I have worked on, from the idea and interface to the code and production release.", aboutTitle: "About me, in a few words.", about: "I'm Elías Ortiz, a software developer and technology enthusiast. I like understanding how people use software and turning their needs into clear, useful, enjoyable experiences.", stack: "Technologies I use", experience: "My journey", experienceIntro: "The places and teams that have shaped my experience as a developer.", contactTitle: "Shall we work together?", contactIntro: "Have an idea, a project, or simply want to talk about technology? Send me a message.", name: "Name", email: "Email", phone: "Phone", message: "Message", send: "Send message", sending: "Sending...", success: "Message sent. Thanks for reaching out.", error: "Could not send the message. Please try again.", live: "Live", featured: "Featured projects", pages: "in production", viewGallery: "View project gallery", openProject: "Open" },
};

type Project = { title: string; type: string; tags: string[]; href: string; displayUrl: string; icon: React.ReactNode; iconBg: string; stackLabel: string };
const projects: Project[] = [
  { title: "Finanz", type: "App web para gestionar gastos personales", tags: ["React", "Firebase", "TypeScript"], href: "https://finanz-services.web.app/auth", displayUrl: "https://finanz-services.web.app", icon: <Wallet />, iconBg: "var(--nt-purple)", stackLabel: "React · Firebase" },
  { title: "Catlink", type: "Plataforma de e-commerce multitienda", tags: ["React", "TypeScript", "Moda & retail"], href: "https://www.catlink.app/", displayUrl: "https://www.catlink.app", icon: <ShoppingBag />, iconBg: "var(--nt-orange)", stackLabel: "React · TypeScript" },
  { title: "Navixsoft", type: "Corporate digital experience", tags: ["React", "TypeScript", "Infrastructure"], href: "https://navixsoft.com", displayUrl: "https://navixsoft.com", icon: <Globe />, iconBg: "var(--nt-green)", stackLabel: "React · TypeScript" },
];
const technologies = [
  { label: "React", icon: <SiReact />, color: "#61DAFB", darkColor: "#61DAFB" }, { label: "Expo", icon: <SiExpo />, color: "#000000", darkColor: "#ffffff" }, { label: "TypeScript", icon: <SiTypescript />, color: "#3178C6", darkColor: "#3178C6" },
  { label: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E", darkColor: "#F7DF1E" }, { label: "Java", icon: <SiOpenjdk />, color: "#ED8B00", darkColor: "#ED8B00" }, { label: "Node.js", icon: <SiNodedotjs />, color: "#339933", darkColor: "#339933" }, { label: "Python", icon: <SiPython />, color: "#3776AB", darkColor: "#3776AB" },
  { label: "Docker", icon: <SiDocker />, color: "#2496ED", darkColor: "#2496ED" }, { label: "Linux", icon: <SiLinux />, color: "#FCC624", darkColor: "#FCC624" }, { label: "Git", icon: <SiGit />, color: "#F05032", darkColor: "#F05032" },
  { label: "GitHub", icon: <SiGithub />, color: "#181717", darkColor: "#ffffff" }, { label: "Next.js", icon: <SiNextdotjs />, color: "#000000", darkColor: "#ffffff" }, { label: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1", darkColor: "#4169E1" },
  { label: "Railway", icon: <SiRailway />, color: "#000000", darkColor: "#ffffff" }, { label: "Vercel", icon: <SiVercel />, color: "#000000", darkColor: "#ffffff" }, { label: "AWS", icon: <FaAws />, color: "#FF9900", darkColor: "#FF9900" }, { label: "shadcn/ui", icon: <Blocks />, color: "#111111", darkColor: "#ffffff" },
];
const technologyByLabel = Object.fromEntries(technologies.map((technology) => [technology.label, technology]));
const localizedSections = {
  es: {
    tools: "Tecnologías con las que trabajo", capabilityLabel: "Crear soluciones", capabilityTitle: "Ideas claras, soluciones que funcionan.", capabilityBody: "Me gusta entender el problema antes de construir. Después conecto diseño, código e infraestructura para crear herramientas útiles y fáciles de mantener.", everyPlatform: "Mi forma de trabajar", web: "Frontend", infrastructure: "Backend", delivery: "Deploy", workflowLabel: "Cómo creo soluciones", workflowTitle: "De un problema real a una solución útil.", workflow: [{ title: "Entender", body: "Escucho el problema, hago preguntas y encuentro lo que realmente necesita resolverse." }, { title: "Proponer", body: "Busco una solución simple, explico las decisiones y defino un camino posible." }, { title: "Construir", body: "Escribo código mantenible y avanzo con entregas concretas." }, { title: "Lanzar", body: "Pongo la solución en marcha y compruebo que funcione en el mundo real." }, { title: "Mejorar", body: "Observo cómo funciona, recibo feedback y sigo iterando." }], projectTypes: ["App web para gestionar gastos personales", "Plataforma de e-commerce multitienda de ropa, moda y accesorios", "Experiencia digital corporativa"], experience: [{ year: "2025 — presente", role: "Mid Software Engineer", company: "Navixsoft", desc: "Desarrollo backend y frontend con Python, Node.js, React e infraestructura cloud." }, { year: "2025 — 2026", role: "Software developer", company: "Botcamp Roshka", desc: "Creación de interfaces y APIs para productos utilizados por equipos reales." }, { year: "2023 — 2024", role: "Desarrollador Junior", company: "StartUp Factory", desc: "Mantenimiento de sistemas legacy y primeros desarrollos web." }], footer: "Diseñado y construido con cuidado" },
  en: {
    tools: "Technologies I work with", capabilityLabel: "Creating solutions", capabilityTitle: "Clear ideas, solutions that work.", capabilityBody: "I like understanding the problem before building. Then I connect design, code, and infrastructure to create useful, maintainable tools.", everyPlatform: "How I work", web: "Frontend", infrastructure: "Backend", delivery: "Deploy", workflowLabel: "How I create solutions", workflowTitle: "From a real problem to a useful solution.", workflow: [{ title: "Understand", body: "I listen, ask questions, and find what really needs to be solved." }, { title: "Propose", body: "I look for a simple solution, explain the decisions, and define a possible path." }, { title: "Build", body: "I write maintainable code and move forward with concrete deliveries." }, { title: "Launch", body: "I put the solution into practice and make sure it works in the real world." }, { title: "Improve", body: "I observe how it works, gather feedback, and keep iterating." }], projectTypes: ["Web app for managing personal expenses", "Multi-store e-commerce platform for fashion and accessories", "Corporate digital experience"], experience: [{ year: "2025 — now", role: "Mid Software Engineer", company: "Navixsoft", desc: "Building backend and frontend products with Python, Node.js, React, and cloud infrastructure." }, { year: "2025 — 2026", role: "Software developer", company: "Botcamp Roshka", desc: "Creating interfaces and APIs for products used by real teams." }, { year: "2023 — 2024", role: "Junior Developer", company: "StartUp Factory", desc: "Maintaining legacy systems and building web development foundations." }], footer: "Designed and built with care" },
};

const navIds = ["about", "projects", "experience"] as const;

const initialServerPlatforms = [
  { x: 7, y: 86, width: 24 }, { x: 42, y: 75, width: 22 }, { x: 69, y: 64, width: 23 },
  { x: 42, y: 53, width: 22 }, { x: 10, y: 42, width: 22 }, { x: 43, y: 31, width: 24 },
  { x: 72, y: 20, width: 20 }, { x: 43, y: 9, width: 19 },
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("top");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);
  const [serverGameOpen, setServerGameOpen] = useState(false);
  const [serverGameActive, setServerGameActive] = useState(false);
  const [serverGameOver, setServerGameOver] = useState(false);
  const [serverGameOverReason, setServerGameOverReason] = useState<"water" | "lightning" | null>(null);
  const [serverPlayer, setServerPlayer] = useState({ x: 14, y: 79 });
  const [serverWater, setServerWater] = useState(91);
  const [serverScore, setServerScore] = useState(0);
  const [serverBest, setServerBest] = useState(0);
  const [serverLevel, setServerLevel] = useState(0);
  const [serverPlatforms, setServerPlatforms] = useState(initialServerPlatforms);
  const [serverGroundY, setServerGroundY] = useState(86);
  const [serverDistance, setServerDistance] = useState(0);
  const [lightningFrame, setLightningFrame] = useState(0);
  const [serverVelocity, setServerVelocity] = useState(0);
  const [serverJumping, setServerJumping] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const t = copy[lang];
  const playChipTone = (frequency: number, duration = 0.08) => {
    if (!musicOn) return;
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = audioContextRef.current ?? new AudioContextClass();
    audioContextRef.current = context;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "square";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(.035, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration);
  };
  const toggleMusic = () => {
    const next = !musicOn;
    setMusicOn(next);
    if (next) playChipTone(523); 
  };
  const closeServerGame = () => { setServerGameOpen(false); setServerGameActive(false); };
  const startServerGame = () => { setServerGameOpen(true); setServerGameActive(true); setServerGameOver(false); setServerGameOverReason(null); setServerPlayer({ x: 14, y: 79 }); setServerPlatforms(initialServerPlatforms); setServerGroundY(86); setServerWater(91); setServerScore(0); setServerLevel(0); setServerDistance(0); setLightningFrame(0); setServerVelocity(0); setServerJumping(false); playChipTone(392); };
  const moveServer = (direction: number) => {
    if (!serverGameActive || serverGameOver) return;
    setServerPlayer((player) => ({ ...player, x: Math.max(3, Math.min(90, player.x + direction * 4)) }));
  };
  const jumpServer = () => {
    if (!serverGameActive || serverGameOver || serverJumping) return;
    setServerVelocity(-7.5);
    setServerJumping(true);
    playChipTone(660);
  };
  useEffect(() => {
    const saved = window.localStorage.getItem("sv-lang");
    if (saved === "es" || saved === "en") setLang(saved);
  }, []);
  useEffect(() => {
    if (!serverGameActive || serverGameOver) return;
    const interval = window.setInterval(() => {
      setServerDistance((distance) => { const next = distance + 1; setServerBest((best) => Math.max(best, next)); return next; });
      setLightningFrame((frame) => {
        const nextFrame = frame >= 100 ? 0 : frame + 4;
        const lightningLanes = [23, 57, 82];
        const lightningY = nextFrame - 18;
        const activeLightning = lightningLanes.find((lane) => Math.abs(lane - serverPlayer.x) < 11 && Math.abs(lightningY - serverPlayer.y) < 10);
        if (activeLightning !== undefined) {
          setServerGameOver(true);
          setServerGameActive(false);
          setServerGameOverReason("lightning");
          playChipTone(150, .18);
        }
        return nextFrame;
      });
      setServerWater((water) => {
        const nextWater = water - .65;
        if (nextWater <= serverPlayer.y + 5) {
          setServerGameOver(true);
          setServerGameActive(false);
          setServerGameOverReason("water");
          playChipTone(160, .18);
        }
        return nextWater;
      });
    }, 500);
    return () => window.clearInterval(interval);
  }, [serverGameActive, serverGameOver, serverPlayer.x, serverPlayer.y]);
  useEffect(() => {
    if (!serverGameActive || serverGameOver) return;
    const interval = window.setInterval(() => {
      if (!serverJumping) return;
      setServerPlayer((player) => {
        const nextY = player.y + serverVelocity;
        const nextVelocity = serverVelocity + .85;
        const landing = serverVelocity > 0 && serverPlatforms
          .filter((platform) => platform.y < serverGroundY && nextY >= platform.y - 7 && player.y <= platform.y - 7 && player.x + 8 >= platform.x && player.x <= platform.x + platform.width)
          .sort((first, second) => second.y - first.y)[0];
        if (landing) {
          setServerVelocity(0);
          setServerJumping(false);
          const isNewUpperPlatform = landing.y < serverGroundY;
          setServerGroundY(landing.y);
          setServerScore((score) => { const updated = score + 1; setServerBest((best) => Math.max(best, updated)); return updated; });
          if (isNewUpperPlatform && landing.y <= 20) {
            const nextPlatform = { x: 12 + ((serverLevel * 29) % 68), y: 25, width: 18 + (serverLevel % 3) * 3 };
            const upcomingPlatform = { x: 48 + ((serverLevel * 17) % 35), y: 10, width: 18 + ((serverLevel + 1) % 3) * 3 };
            setServerPlatforms((platforms) => [
              ...platforms
                .map((platform) => ({ ...platform, y: platform.y + 15 }))
                .filter((platform) => platform.y > 25 && platform.y < 88),
              nextPlatform,
              upcomingPlatform,
            ]);
            setServerLevel((level) => level + 1);
            setServerWater((water) => Math.min(91, water + 4));
            return { x: nextPlatform.x + nextPlatform.width / 2 - 4, y: nextPlatform.y - 7 };
          }
          playChipTone(740);
          return { x: player.x, y: landing.y - 7 };
        }
        if (nextY >= 96) {
          setServerGameOver(true);
          setServerGameActive(false);
          playChipTone(150, .18);
        }
        setServerVelocity(nextVelocity);
        return { x: player.x, y: nextY };
      });
    }, 80);
    return () => window.clearInterval(interval);
  }, [serverGameActive, serverGameOver, serverVelocity, serverGroundY, serverJumping]);
  useEffect(() => {
    if (!serverGameOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") moveServer(-1);
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") moveServer(1);
      if (event.key === "ArrowUp" || event.key === " " || event.key.toLowerCase() === "w") jumpServer();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [serverGameOpen, serverGameActive, serverGameOver]);
  useEffect(() => () => {
    audioContextRef.current?.close();
  }, []);
  useEffect(() => {
    window.localStorage.setItem("sv-lang", lang);
  }, [lang]);
  useEffect(() => {
    const sections = ["top", "about", "projects", "experience", "contact"].map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.2, 0.5, 1] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const closeMenu = () => setMenuOpen(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); setSubmitting(true); setStatus("idle");
    try { const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) }); if (!response.ok) throw new Error("Request failed"); setStatus("success"); setFormData({ name: "", email: "", phone: "", message: "" }); } catch { setStatus("error"); } finally { setSubmitting(false); }
  };
  return (
    <>
    <main className="sv-page">
      <Doodles />
      <header className="sv-nav">
        <a className="sv-brand" href="#top" aria-label="Elías Ortiz home" onClick={closeMenu}><Code2 aria-hidden="true" />Elías Ortiz</a>
        <nav className={menuOpen ? "sv-links is-open" : "sv-links"}>
          {navIds.map((id, index) => (
            <a key={id} href={`#${id}`} className={activeSection === id ? "is-active" : undefined} onClick={closeMenu}>{t.nav[index]}</a>
          ))}
          <a href="#contact" className={activeSection === "contact" ? "is-active sv-links-contact" : "sv-links-contact"} onClick={closeMenu}>{t.contact}</a>
        </nav>
        <div className="sv-nav-actions">
          <button className="sv-lang" onClick={() => setLang(lang === "es" ? "en" : "es")} aria-label="Change language">{lang.toUpperCase()}</button>
          <ModeToggle />
          <a className="sv-btn sv-nav-contact" href="#contact" onClick={closeMenu}>{t.contact} <ArrowUpRight size={14} /></a>
          <button className="sv-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section className="sv-hero" id="top">
        <div className="sv-doc">
          <p className="sv-eyebrow">{lang === "es" ? "Portafolio · " : "Portfolio · "}{new Date().getFullYear()}</p>
          <h1 className="sv-hero-title">
            {lang === "es" ? (<><span className="sv-mark">Hola, soy</span> Elías Ortiz.</>) : (<><span className="sv-mark">Hi, I'm</span> Elías Ortiz.</>)}
          </h1>
          <p className="sv-hero-lead">{t.intro}</p>
          <div className="sv-props">
            <span className="sv-prop"><Briefcase /> <b>Software developer</b></span>
            <span className="sv-prop"><MapPin /> <b>{lang === "es" ? "Remote · Latam" : "Remote · Latam"}</b></span>
            <span className="sv-prop"><CalendarDays /> <b>2023 — {new Date().getFullYear()}</b></span>
          </div>
          <div className="sv-actions">
            <a className="sv-btn sv-btn--primary" href="#projects">{t.work} <ArrowUpRight size={15} /></a>
            <a className="sv-btn" href="#contact">{t.contact}</a>
          </div>
          <div className="sv-stack">
            <span className="sv-stack-label">{localizedSections[lang].tools}</span>
            <div className="sv-tech-row">
              {technologies.map((technology) => (
                <span className="sv-tech-chip" key={technology.label} style={{ ["--chip-color" as string]: technology.color }}>{technology.icon}{technology.label}</span>
              ))}
            </div>
          </div>
        </div>
        <button className="sv-btn app-dash-launch" type="button" onClick={startServerGame}>
          <Gamepad2 size={16} />
          {lang === "es" ? "Jugar Server Climb" : "Play Server Climb"}
          <ArrowUpRight size={15} />
        </button>
        </section>

      <section className="sv-section sv-about" id="about">
        <div className="sv-about-copy">
          <div className="sv-profile">
            <img src={profileImage} alt="Elías Ortiz" />
            <div>
              <strong>Elías Ortiz</strong>
              <span>Software developer</span>
            </div>
          </div>
          <div className="sv-sec-header">
            <div>
              <span className="sv-sec-label"><span className="sv-mono">01</span> / {t.aboutTitle}</span>
              <h2>{lang === "es" ? "Convertir ideas en software" : "Turning ideas into software"}</h2>
            </div>
          </div>
          <blockquote className="sv-quote">{t.about}</blockquote>
        </div>
        <div className="sv-cap-list">
          <article className="sv-cap-item">
            <span className="sv-cap-icon" style={{ background: "var(--nt-blue-bg)", color: "var(--nt-blue)" }}><SiReact /></span>
            <div>
              <span className="sv-cap-num">PROP_01</span>
              <h3>{lang === "es" ? "Interfaces claras" : "Clear interfaces"}</h3>
              <p>{lang === "es" ? "Diseño y desarrollo experiencias web que son fáciles de entender y usar." : "I design and build web experiences that are easy to understand and use."}</p>
            </div>
          </article>
          <article className="sv-cap-item">
            <span className="sv-cap-icon" style={{ background: "var(--nt-green-bg)", color: "var(--nt-green)" }}><SiNodedotjs /></span>
            <div>
              <span className="sv-cap-num">PROP_02</span>
              <h3>{lang === "es" ? "Funcionalidad sólida" : "Solid functionality"}</h3>
              <p>{lang === "es" ? "Conecto frontend, backend y datos para que cada parte cumpla su propósito." : "I connect frontend, backend, and data so every part serves its purpose."}</p>
            </div>
          </article>
          <article className="sv-cap-item">
            <span className="sv-cap-icon" style={{ background: "var(--nt-orange-bg)", color: "var(--nt-orange)" }}><FaAws /></span>
            <div>
              <span className="sv-cap-num">PROP_03</span>
              <h3>{lang === "es" ? "Listo para usarse" : "Ready to use"}</h3>
              <p>{lang === "es" ? "Preparo el proyecto para llegar a las personas y seguir mejorando con el tiempo." : "I prepare projects to reach people and keep improving over time."}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="sv-section">
        <div className="sv-sec-header">
          <div>
            <span className="sv-sec-label"><span className="sv-mono">02</span> / {localizedSections[lang].workflowLabel}</span>
            <h2>{localizedSections[lang].workflowTitle}</h2>
          </div>
          <p>{lang === "es" ? "Cinco decisiones repetibles que van de la idea al producto en producción." : "Five repeatable decisions that go from idea to a product in production."}</p>
        </div>
        <div className="sv-steps">
          {localizedSections[lang].workflow.map((step, index) => {
            const icons = [Lightbulb, Blocks, Code2, Rocket, Check];
            const Icon = icons[index];
            return (
              <article className="sv-step" key={step.title}>
                <span className="sv-step-num"><Icon />0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="sv-section" id="projects">
        <div className="sv-sec-header">
          <div>
            <span className="sv-sec-label"><span className="sv-mono">03</span> / {t.selected}</span>
            <h2>{lang === "es" ? "Lo que construyo" : "What I build"}</h2>
          </div>
          <p>{t.selectedIntro}</p>
        </div>
        <div className="sv-gallery">
          {projects.map((project, index) => (
            <article className="sv-gallery-card" key={project.title}>
              <div className="sv-browser">
                <div className="sv-browser-bar"><i /><i /><i /><small>{project.displayUrl}</small></div>
                <iframe src={project.href} title={`${project.title} preview`} loading="lazy" tabIndex={-1} />
                <a className="sv-browser-link" href={project.href} target="_blank" rel="noreferrer">{t.openProject} <ArrowUpRight size={13} /></a>
              </div>
              <div className="sv-gallery-info">
                <div>
                  <h3><a href={project.href} target="_blank" rel="noreferrer">{project.title}</a></h3>
                  <p>{localizedSections[lang].projectTypes[index]}</p>
                </div>
                <div className="sv-tags">
                  {project.tags.map((tag) => {
                    const technology = technologyByLabel[tag];
                    return <span className={`sv-tag${technology ? " is-tech" : ""}`} key={tag}>{technology?.icon}{tag}</span>;
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sv-section" id="experience">
        <div className="sv-sec-header">
          <div>
            <span className="sv-sec-label"><span className="sv-mono">04</span> / {t.experience}</span>
            <h2>{t.experience}</h2>
          </div>
          <p>{t.experienceIntro}</p>
        </div>
        <div className="sv-log">
          {localizedSections[lang].experience.map((item) => (
            <div className="sv-log-row" key={item.company}>
              <span className="sv-log-year">{item.year}</span>
              <div>
                <h3>{item.role}</h3>
                <span className="sv-log-company">@ {item.company}</span>
                <p className="sv-log-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sv-section sv-contact" id="contact">
        <div className="sv-contact-copy">
          <span className="sv-sec-label"><span className="sv-mono">05</span> / {t.contact}</span>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactIntro}</p>
          <div className="sv-contact-links">
            <a className="sv-icon-btn sv-icon-btn--text" href="https://github.com/esam-dev" target="_blank" rel="noreferrer"><Github size={17} /><span>GitHub</span></a>
            <a className="sv-icon-btn sv-icon-btn--text" href="https://www.linkedin.com/in/el%C3%ADas-ort%C3%ADz-a5895224b/" target="_blank" rel="noreferrer"><Linkedin size={17} /><span>LinkedIn</span></a>
            <a className="sv-icon-btn sv-icon-btn--text" href="mailto:emails.eliasortiz@gmail.com"><Mail size={17} /><span>Email</span></a>
          </div>
        </div>
        <form className="sv-form" onSubmit={handleSubmit}>
          <label>{t.name}<input required name="name" autoComplete="name" placeholder={lang === "es" ? "Tu nombre" : "Your name"} value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} /></label>
          <label>{t.email}<input required name="email" type="email" autoComplete="email" placeholder="tu@email.com" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} /></label>
          <label>{t.phone}<input required name="phone" type="tel" autoComplete="tel" placeholder="+54 11 0000 0000" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} /></label>
          <label>{t.message}<textarea required name="message" rows={4} placeholder={lang === "es" ? "Cuéntame tu idea…" : "Tell me about your idea…"} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} /></label>
          <button className="sv-btn sv-btn--primary sv-btn--full" type="submit" disabled={submitting}>{submitting ? t.sending : t.send} <ArrowUpRight size={15} /></button>
          {status === "success" && <p className="sv-status ok">{t.success}</p>}
          {status === "error" && <p className="sv-status err">{t.error}</p>}
        </form>
      </section>

      <footer className="sv-footer">
        <span>© {new Date().getFullYear()} <b>Elías Ortiz</b> — {localizedSections[lang].footer}</span>
        <div className="sv-footer-links">
          <a href="https://github.com/esam-dev" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/el%C3%ADas-ort%C3%ADz-a5895224b/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:emails.eliasortiz@gmail.com">Email</a>
        </div>
      </footer>
    </main>
    {serverGameOpen && (
      <div className="app-dash-modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) closeServerGame(); }}>
        <section className="app-dash-modal server-climb-modal" role="dialog" aria-modal="true" aria-labelledby="server-climb-title">
          <div className="app-dash-modal-head">
            <div>
              <span className="app-dash-eyebrow">SERVER CLIMB · {lang === "es" ? "JUEGO" : "GAME"}</span>
              <h2 id="server-climb-title">{serverGameOver ? (serverGameOverReason === "lightning" ? (lang === "es" ? "¡Te alcanzó un rayo!" : "Lightning hit the server!") : (lang === "es" ? "¡El agua te alcanzó!" : "The water got you!")) : (lang === "es" ? "Sube antes de mojarte" : "Climb before you get wet")}</h2>
              <p>{serverGameOver ? (lang === "es" ? `Llegaste al bloque ${serverScore}.` : `You reached block ${serverScore}.`) : (lang === "es" ? "Guía el servidor hasta arriba antes de que suba el agua." : "Guide the server upward before the water rises.")}</p>
            </div>
            <button className="app-dash-modal-close" type="button" onClick={closeServerGame} aria-label={lang === "es" ? "Cerrar juego" : "Close game"}><X size={19} /></button>
          </div>
          <div className="app-dash-modal-score"><span>{lang === "es" ? "Distancia" : "Distance"} <b>{serverDistance.toString().padStart(4, "0")}</b> · {lang === "es" ? "Nivel" : "Level"} <b>{serverLevel + 1}</b></span><button type="button" onClick={toggleMusic}>{musicOn ? <Volume2 size={15} /> : <VolumeX size={15} />} {musicOn ? (lang === "es" ? "Música activa" : "Music on") : (lang === "es" ? "Música apagada" : "Music off")}</button></div>
          <div className="server-climb-board" style={{ "--water-level": `${100 - serverWater}%` } as React.CSSProperties}>
            <div className="server-climb-water" />
            {serverPlatforms.map((platform, index) => <div key={`${platform.x}-${platform.y}`} className="server-climb-platform" style={{ left: `${platform.x}%`, bottom: `${100 - platform.y}%`, width: `${platform.width}%` }}><span>{index + 1}</span></div>)}
            <div className={`server-player${serverGameActive ? " is-running" : ""}`} style={{ left: `${serverPlayer.x}%`, bottom: `${100 - serverPlayer.y}%` }}><b className="server-rack-label">SERVER</b><span className="server-rack-vent" /><span className="server-screen">&gt;_</span><i /><em /><em /><em /></div>
            {[23, 57, 82].map((lane, index) => <div key={lane} className={`server-lightning server-lightning-${index + 1}`} style={{ left: `${lane}%`, top: `${lightningFrame - 18}%`, opacity: lightningFrame < 12 ? 0 : 1 }}>⚡</div>)}
            <div className="server-climb-waterline"><span>WATER LEVEL</span></div>
          </div>
          <div className="server-climb-controls"><button type="button" onClick={() => moveServer(-1)} aria-label={lang === "es" ? "Mover servidor a la izquierda" : "Move server left"}>←</button><button type="button" onClick={jumpServer}>{lang === "es" ? "SALTAR / SUBIR" : "JUMP / CLIMB"}</button><button type="button" onClick={() => moveServer(1)} aria-label={lang === "es" ? "Mover servidor a la derecha" : "Move server right"}>→</button></div>
          <p className="server-climb-help">{serverGameOver ? (serverGameOverReason === "lightning" ? (lang === "es" ? "El rayo cayó en tu carril. Inténtalo de nuevo." : "The lightning struck your lane. Try again.") : (lang === "es" ? "El agua cubrió el bloque. Inténtalo de nuevo." : "The water covered the block. Try again.")) : (lang === "es" ? "Mueve con ← →, esquiva los rayos y pulsa SALTAR / SUBIR." : "Move with ← →, dodge the lightning and press JUMP / CLIMB.")}</p>
          <button className="app-dash-start" type="button" onClick={startServerGame}>{serverGameOver ? (lang === "es" ? "VOLVER A JUGAR" : "PLAY AGAIN") : (lang === "es" ? "REINICIAR" : "RESTART")} <ArrowUpRight size={15} /></button>
        </section>
      </div>
    )}
    </>
  );
}