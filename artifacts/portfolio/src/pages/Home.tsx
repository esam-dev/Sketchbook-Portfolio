import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowMarker, StarMarker, CircleMarker, UnderlineMarker, RealMarkerGraphic } from "@/components/Doodles";
import { Github, Linkedin, Mail, Twitter, Code2, Terminal, Database, Server, Smartphone, Monitor, ExternalLink } from "lucide-react";
import { SiPython, SiJavascript, SiReact, SiNodedotjs, SiTailwindcss, SiPostgresql, SiTypescript, SiExpo, SiMongodb } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import eliasPerfilImg from "@/assets/images/elias-perfil.png";
import projectAppImg from "@/assets/images/project-app.png";
import projectEcommerceImg from "@/assets/images/project-ecommerce.png";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const [lang, setLang] = useState("en");
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Textos bilingües
  const t = {
    es: {
      nav: ["Sobre mí", "Habilidades", "Proyectos", "Contacto"],
      heroHola: "¡Hola! Soy",
      heroTrabajos: "Trabajos",
      heroRol: "DESARROLLADOR DE SOFTWARE",
      heroFullStack: "Full-Stack Developer",
      heroBtnProyectos: "Ver mis proyectos",
      heroBtnContacto: "Contactar",
      about: "SOBRE MÍ",
      about1: "Soy un desarrollador de software y aficionado de la tecnología que busca crear ",
      about1b: "experiencias digitales con la mejor UI y funcionalidades factibles con código",
      about2: "Con buena  experiencia en ",
      about2b: "arquitectura de software",
      about2c: " y un amor profundo por construir soluciones. Me enfoco en rendimiento y escalabilidad.",
      about3: "Aficionado a los diagramas de arquitectura de software, el aroma del café  y el código optimizado.",
      skills: "HABILIDADES",
      skillsDesc: "(Cómo construyo y conecto las cosas)",
      // Proyectos
      projects: "PROYECTOS",
      project1Title: "Plataforma de ecommerce - Next.js Commerce",
      project1Desc: "Tienda online moderna con catálogo de productos, carrito de compras y checkout impulsado por Shopify.",
      project1Btn: "Ver código",
      project1SiteBtn: "Ver sitio",
      project2Title: "Finanz",
      project2Desc: "Plataforma de servicios financieros con panel de control, autenticación y gestión de finanzas personales.",
      project2Btn: "Ver código",
      project3Title: "Sitio web - Navixsoft",
      project3Desc: "Sitio corporativo de una empresa de desarrollo de software. Desarrollo completo: diseño, frontend, backend e infraestructura.",
      project3SiteBtn: "Ver sitio",
      // Experiencia
      experience: "EXPERIENCIA",
      exp: [
        {
          year: "2025 - Presente",
          role: "Mid Software Engineer (Ingeniero de Software Intermedio)",
          company: "Navixsoft",
          desc: "Desarrollo backend y frontend con Python, Node.js y React. Infraestructura en AWS, GCP y Railway."
        },
        {
          year: "2025 - 2026",
          role: "Full-Stack Developer (Desarrollador Full-Stack)",
          company: "Botcamp Roshka",
          desc: "UI development with React and APIs in Java. (Desarrollo de interfaces con React y APIs en Java.)"
        },
        {
          year: "2023 - 2024",
          role: "Junior Developer (Desarrollador Junior)",
          company: "StartUp Factory",
          desc: "Legacy system maintenance and web development beginnings. (Mantenimiento de sistemas heredados e inicio en desarrollo web.)"
        }
      ],
      // Contacto
      contact: "CONTACTO",
      contactReady: "¿Listo para empezar? ",
      contactLetsTalk: "Hablemos.",
      contactName: "Nombre",
      contactMessage: "Mensaje",
      contactNamePlaceholder: "Tu Nombre",
      contactMsgPlaceholder: "¡Hola Elías!...",
      contactBtn: "ENVIAR MENSAJE",
      // Footer
      footerDev: "Desarrollado por Navixsoft ",
      footerSlogan: "Pizarra limpia. Código limpio.",
      footerContactBtn: "Hablemos",
      footerNavTitle: "Navegación",
      footerNavExp: "Experiencia",
      footerProjectsTitle: "Proyectos",
      footerMoreGithub: "Ver más en GitHub",
      footerFollowTitle: "Sígueme",
      // Otros labels
      frontend: "Frontend",
      mobile: "Mobile",
      backend: "Backend",
      database: "Base de Datos",
      frontendReact: "Frontend React",
      mobileReactNative: "Mobile React Native",
      httpApi: "HTTP / API REST",
      jsonFetch: "JSON / Fetch",
      queriesOrm: "Queries / ORM",
      uiBonita: "¡UI bonita!",
      iosAndroid: "¡iOS + Android!",
      sqlNoSql: "¡SQL & NoSQL!",
      servidores: "¡Servidores!",
      elCerebro: "¡El cerebro!",
      enElBolsillo: "¡En el bolsillo!",
      enElBolsillo2: "¡En el bolsillo, también habla con el backend!",
      dondeViveTodo: "¡Donde vive todo!"
    },
    en: {
      nav: ["About", "Skills", "Projects", "Contact"],
      heroHola: "Hi! I'm",
      heroTrabajos: "Works",
      heroRol: "SOFTWARE DEVELOPER",
      heroFullStack: "Full-Stack Developer",
      heroBtnProyectos: "See my projects",
      heroBtnContacto: "Contact",
      about: "ABOUT ME",
      about1: "I'm a software developer and technology enthusiast who seeks to create ",
      about1b: "digital experiences with the best UI and feasible features in code",
      about2: "With solid experience in ",
      about2b: "software architecture",
      about2c: " and a deep love for building solutions. I focus on performance and scalability.",
      about3: "Fond of software architecture diagrams, the aroma of coffee, and optimized code.",
      skills: "SKILLS",
      skillsDesc: "(How I build and connect things)",
      // Projects
      projects: "PROJECTS",
      project1Title: "E-commerce platform - Next.js Commerce",
      project1Desc: "Modern online store with product catalog, shopping cart, and Shopify-powered checkout.",
      project1Btn: "View code",
      project1SiteBtn: "View site",
      project2Title: "Finanz",
      project2Desc: "Financial services platform with dashboard, authentication, and personal finance management.",
      project2Btn: "View code",
      project3Title: "Website - Navixsoft",
      project3Desc: "Corporate site for a software development company. Full development: design, frontend, backend and infrastructure.",
      project3SiteBtn: "View site",
      // Experience
      experience: "EXPERIENCE",
      exp: [
        {
          year: "2025 - Present",
          role: "Mid Software Engineer",
          company: "Navixsoft",
          desc: "Backend and frontend development with Python, Node.js and React. Infrastructure on AWS, GCP and Railway."
        },
        {
          year: "2025 - 2026",
          role: "Full-Stack Developer",
          company: "Botcamp Roshka",
          desc: "UI development with React and APIs in Java."
        },
        {
          year: "2023 - 2024",
          role: "Junior Developer",
          company: "StartUp Factory",
          desc: "Legacy system maintenance and web development beginnings."
        }
      ],
      // Contact
      contact: "CONTACT",
      contactReady: "Ready to start? ",
      contactLetsTalk: "Let's talk.",
      contactName: "Name",
      contactMessage: "Message",
      contactNamePlaceholder: "Your Name",
      contactMsgPlaceholder: "Hi Elias!...",
      contactBtn: "SEND MESSAGE",
      // Footer
      footerDev: "Developed by Navixsoft ",
      footerSlogan: "Clean board. Clean code.",
      footerContactBtn: "Let's talk",
      footerNavTitle: "Navigation",
      footerNavExp: "Experience",
      footerProjectsTitle: "Projects",
      footerMoreGithub: "See more on GitHub",
      footerFollowTitle: "Follow me",
      // Other labels
      frontend: "Frontend",
      mobile: "Mobile",
      backend: "Backend",
      database: "Database",
      frontendReact: "Frontend React",
      mobileReactNative: "Mobile React Native",
      httpApi: "HTTP / API REST",
      jsonFetch: "JSON / Fetch",
      queriesOrm: "Queries / ORM",
      uiBonita: "Beautiful UI!",
      iosAndroid: "iOS + Android!",
      sqlNoSql: "SQL & NoSQL!",
      servidores: "Servers!",
      elCerebro: "The brain!",
      enElBolsillo: "In your pocket!",
      enElBolsillo2: "In your pocket, also talks to backend!",
      dondeViveTodo: "Where everything lives!"
    },
  };

  return (
    <div className="home-shell min-h-screen w-full overflow-hidden text-foreground selection:bg-[hsl(206_94%_53%/0.5)]">
      
      <nav className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-6 pointer-events-none flex justify-between items-center">
        <div className="pointer-events-auto flex items-center gap-2">
          <a href="#hero" className="font-archivo text-2xl sm:text-3xl font-black tracking-tighter hover:text-[#18a0fb] transition-colors">
            EO.
          </a>
        </div>
        <ul className="flex flex-col sm:flex-row gap-1 sm:gap-8 font-archivo text-base sm:text-lg bg-background/90 sm:bg-transparent p-2 sm:p-0 rounded-xl sm:rounded-none border border-border sm:border-none pointer-events-auto shadow-xl sm:shadow-none uppercase w-40 sm:w-auto backdrop-blur">
          <li><a href="#about" className="hover:text-[#ffc700] hover:scale-105 inline-block transition-transform">{t[lang].nav[0]}</a></li>
          <li><a href="#skills" className="hover:text-[#ff4757] hover:scale-105 inline-block transition-transform">{t[lang].nav[1]}</a></li>
          <li><a href="#projects" className="hover:text-[#29c46a] hover:scale-105 inline-block transition-transform">{t[lang].nav[2]}</a></li>
          <li><a href="#contact" className="hover:text-[#18a0fb] hover:scale-105 inline-block transition-transform">{t[lang].nav[3]}</a></li>
        </ul>
        <div className="pointer-events-auto ml-2 flex items-center gap-2">
          <button
            className="px-3 py-1 rounded-full border border-border font-bold font-archivo text-xs sm:text-base bg-background/80 hover:bg-[#18a0fb] hover:text-white transition-colors shadow-md backdrop-blur"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label="Cambiar idioma"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <ModeToggle />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[90vh] flex flex-col items-center justify-center relative text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative z-10 w-full"
          >
            {/* Garabato rojo: '¡Hola! Soy' apunta a ELÍAS ORTIZ, 'Trabajos' apunta al botón */}
            {/* ¡Hola! Soy -> ELÍAS ORTIZ */}
            <div className="absolute top-[8px] left-1 xs:top-[12px] xs:left-2 sm:top-[20px] sm:left-[2%] rotate-[-15deg] z-20 flex flex-col items-center">
              <div className="font-caveat text-base xs:text-lg sm:text-2xl md:text-3xl text-[#ff4757] mb-0 sm:mb-2 font-bold">{t[lang].heroHola}</div>
              <ArrowMarker className="w-8 h-8 xs:w-10 xs:h-10 sm:w-16 sm:h-16 text-[#ff4757] rotate-[120deg] -mt-2 xs:-mt-2 sm:-mt-2" delayOrder={1} />
            </div>

            {/* Trabajos -> Botón 'Ver mis proyectos' (solo uno, bien posicionado) */}
            <div className="absolute left-[10px] top-[185px] sm:left-[19%] sm:top-[285px] rotate-[-18deg] z-20 flex flex-col items-center">
              <div className="font-caveat text-base xs:text-lg sm:text-2xl md:text-3xl text-[#ffc700] mb-0 font-bold">{t[lang].heroTrabajos}</div>
              <ArrowMarker className="w-8 h-8 xs:w-12 xs:h-12 sm:w-16 sm:h-16 text-[#ffc700] rotate-[-75deg] -mb-2" delayOrder={4} />
            </div>

            <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-9xl font-archivo font-black uppercase tracking-tight leading-none">
              ELÍAS ORTIZ
            </h1>
            
            <div className="mt-4 relative inline-block w-full max-w-xs sm:max-w-full">
              <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-archivo font-bold text-transparent" style={{ WebkitTextStroke: "2px currentColor" }}>
                {t[lang].heroRol}
              </h2>
              <UnderlineMarker className="absolute -bottom-2 sm:-bottom-4 left-0 w-full text-[#18a0fb]" delayOrder={2} />
            </div>

            {/* Garabato verde ajustado para apuntar a 'ELÍAS ORTIZ' */}
            <div className="absolute top-[50px] right-2 sm:top-[100px] sm:right-[7%] rotate-[15deg] z-20 flex flex-col items-center">
              <div className="font-caveat text-sm xs:text-base sm:text-xl md:text-2xl text-[#29c46a] mb-0 sm:mb-2 font-bold whitespace-nowrap">{t[lang].heroFullStack}</div>
              <ArrowMarker className="w-7 h-7 xs:w-10 xs:h-10 sm:w-14 sm:h-14 text-[#29c46a] rotate-[40deg] -mt-1" delayOrder={3} />
            </div>



            <div className="mt-10 sm:mt-20 flex flex-wrap justify-center gap-3 sm:gap-6 font-archivo text-base sm:text-xl uppercase relative">
              <a href="#projects" className="px-4 py-2 sm:px-8 sm:py-4 bg-[#ffc700] text-black border-2 sm:border-4 border-black hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-black relative z-10">
                {t[lang].heroBtnProyectos}
              </a>
              <a href="#contact" className="px-4 py-2 sm:px-8 sm:py-4 bg-transparent border-2 sm:border-4 border-black hover:bg-[#18a0fb] hover:text-white hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-black relative z-10">
                {t[lang].heroBtnContacto}
              </a>
              {/* Flecha azul ajustada para apuntar a los botones en móvil */}
              <svg className="block sm:hidden absolute left-1/2 top-[120px] -translate-x-1/2 w-44 h-20 z-0" viewBox="0 0 176 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 30 Q88 80 156 30" stroke="#18a0fb" strokeWidth="6" fill="none" markerEnd="url(#arrowhead-blue)" />
                <defs>
                  <marker id="arrowhead-blue" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto">
                    <path d="M 0 0 L 12 6 L 0 12 z" fill="#18a0fb" />
                  </marker>
                </defs>
              </svg>
            </div>
            
            {/* Marcador azul decorativo, reubicado para no tapar los botones */}
            <motion.div style={{ y: y1 }} className="absolute -bottom-24 right-2 sm:-bottom-10 sm:right-[20%] rotate-[-10deg] z-30">
              <RealMarkerGraphic className="w-32 h-auto drop-shadow-xl opacity-90" />
            </motion.div>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-32 relative">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative mx-auto w-full max-w-xs sm:max-w-sm md:mx-0 md:w-[42%] md:max-w-md"
            >
              <div className="relative rotate-[-3deg] p-4 bg-white marker-border shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <img src={eliasPerfilImg} alt="Elías Ortiz" className="w-full h-auto contrast-125 border-2 border-black" />
                {/* Cinta amarilla tipo washi tape con bordes zigzag */}
                <div className="absolute -bottom-7 -right-12 z-20" style={{transform:'rotate(-8deg)'}}>
                  <svg width="180" height="48" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
                    {/* Cuerpo de la cinta */}
                    <rect x="12" y="8" width="156" height="32" rx="7" fill="#c9a616" fillOpacity="0.85" stroke="black" strokeWidth="3"/>
                    {/* Zigzag izquierdo */}
                    <polyline points="12,8 6,12 12,16 6,20 12,24 6,28 12,32 6,36 12,40" fill="none" stroke="black" strokeWidth="2"/>
                    {/* Zigzag derecho */}
                    <polyline points="168,8 174,12 168,16 174,20 168,24 174,28 168,32 174,36 168,40" fill="none" stroke="black" strokeWidth="2"/>
                  </svg>
                  <span className="absolute left-0 top-0 w-full h-full flex items-center justify-center font-caveat italic text-[2.1rem] font-bold text-black select-none" style={{width:'180px', height:'48px', pointerEvents:'auto'}}>{t[lang].yo}</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <h2 className="text-5xl sm:text-6xl font-archivo font-black uppercase mb-8 relative inline-block">
                {t[lang].about}
                <CircleMarker className="absolute -top-4 -left-6 w-[120%] h-[120%] text-[#ffc700] opacity-80" delayOrder={1} />
              </h2>
              <div className="space-y-6 font-patrick text-3xl leading-relaxed">
                <p>
                  {t[lang].about1}
                  <span className="highlighter-cyan font-bold">{t[lang].about1b}</span>.
                </p>
                <p>
                  {t[lang].about2}
                  <span className="highlighter-yellow font-bold">{t[lang].about2b}</span>
                  {t[lang].about2c}
                </p>
                <p>
                  {t[lang].about3}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SKILLS SECTION - ARCHITECTURE MIND MAP */}
        <section id="skills" className="py-32">
          <div className="text-center mb-20 relative">
            <h2 className="text-5xl sm:text-7xl font-archivo font-black uppercase relative inline-block">
              {t[lang].skills}
              <UnderlineMarker className="absolute -bottom-4 left-0 w-full text-[#29c46a]" delayOrder={0} />
            </h2>
            <div className="font-caveat text-3xl text-muted-foreground mt-4 font-bold">{t[lang].skillsDesc}</div>
          </div>

          {/* DESKTOP LAYOUT — 4 quadrant architecture diagram */}
          <div className="relative w-full max-w-6xl mx-auto hidden md:block" style={{ minHeight: "720px" }}>

            {/* ===== FRONTEND REACT — top left ===== */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 z-20 w-[280px]"
            >
              <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="w-7 h-7 text-[#18a0fb]" strokeWidth={2.5} />
                  <span className="font-archivo text-2xl font-black uppercase">Frontend</span>
                </div>
                <div className="font-caveat text-xl text-[#18a0fb] font-bold mb-4 -mt-2">{t[lang].whatUserSees}</div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#18a0fb]/10 border-2 border-black rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                    <SiReact className="w-9 h-9 text-[#18a0fb]" />
                    <span className="font-archivo text-[10px] font-bold">REACT</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#F7DF1E]/10 border-2 border-black rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                    <SiJavascript className="w-9 h-9 text-[#F0DB4F]" />
                    <span className="font-archivo text-[10px] font-bold">JS</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#3178C6]/10 border-2 border-black rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                    <SiTypescript className="w-9 h-9 text-[#3178C6]" />
                    <span className="font-archivo text-[10px] font-bold">TS</span>
                  </div>
                  <div className="col-span-3 flex justify-center gap-3 mt-1">
                    <div className="flex items-center gap-1 px-2 py-1 bg-[#06B6D4]/10 border-2 border-black rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                      <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" />
                      <span className="font-archivo text-[10px] font-bold">TAILWIND</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ===== MOBILE REACT NATIVE — top right ===== */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="absolute top-0 right-0 z-20 w-[280px]"
            >
              <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="w-7 h-7 text-[#ff5e93]" strokeWidth={2.5} />
                  <span className="font-archivo text-2xl font-black uppercase">Mobile</span>
                </div>
                <div className="font-caveat text-xl text-[#ff5e93] font-bold mb-4 -mt-2">{t[lang].enElBolsillo}</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col items-center gap-1 p-3 bg-[#18a0fb]/10 border-2 border-black rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                    <SiReact className="w-10 h-10 text-[#18a0fb]" />
                    <span className="font-archivo text-[10px] font-bold text-center">REACT NATIVE</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-3 bg-black/5 border-2 border-black rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                    <SiExpo className="w-10 h-10 text-black" />
                    <span className="font-archivo text-[10px] font-bold">EXPO</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ===== BACKEND — center ===== */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[340px] mb-16"
            >
              <div className="bg-white border-4 border-black rounded-2xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-6">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <Server className="w-8 h-8 text-[#ff4757]" strokeWidth={2.5} />
                  <span className="font-archivo text-3xl font-black uppercase">Backend</span>
                </div>
                <div className="font-caveat text-2xl text-[#ff4757] font-bold mb-4 text-center">{t[lang].elCerebro}</div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center gap-1 p-3 bg-[#3776AB]/10 border-2 border-black rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                    <SiPython className="w-10 h-10 text-[#3776AB]" />
                    <span className="font-archivo text-[11px] font-bold">PYTHON</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-3 bg-[#f89820]/10 border-2 border-black rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                    <FaJava className="w-10 h-10 text-[#f89820]" />
                    <span className="font-archivo text-[11px] font-bold">JAVA</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-3 bg-[#29c46a]/10 border-2 border-black rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                    <SiNodedotjs className="w-10 h-10 text-[#29c46a]" />
                    <span className="font-archivo text-[11px] font-bold">NODE.JS</span>
                  </div>
                </div>
                <div className="mt-3 text-center font-caveat text-base text-muted-foreground font-bold">APIs REST · Lógica · Auth</div>
              </div>
            </motion.div>

            {/* ===== DATABASE — bottom center ===== */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-[300px]"
            >
              <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <Database className="w-7 h-7 text-[#ffc700]" strokeWidth={2.5} />
                  <span className="font-archivo text-2xl font-black uppercase">Base de Datos</span>
                </div>
                <div className="font-caveat text-xl text-[#ffc700] font-bold mb-4 text-center">{t[lang].dondeViveTodo}</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col items-center gap-1 p-3 bg-[#336791]/10 border-2 border-black rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                    <SiPostgresql className="w-10 h-10 text-[#336791]" />
                    <span className="font-archivo text-[11px] font-bold">POSTGRES</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-3 bg-[#47A248]/10 border-2 border-black rounded-lg hover:-translate-y-1 transition-transform cursor-pointer">
                    <SiMongodb className="w-10 h-10 text-[#47A248]" />
                    <span className="font-archivo text-[11px] font-bold">MONGODB</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ===== COMMUNICATION ARROWS (SVG) ===== */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 1152 720"
              preserveAspectRatio="none"
            >
              <defs>
                <marker id="arrowhead-black" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto">
                  <path d="M 0 0 L 12 6 L 0 12 z" fill="#1a1a2e" />
                </marker>
              </defs>

              {/* Frontend ↔ Backend */}
              <motion.path
                d="M 240 130 C 380 200, 460 260, 520 330"
                stroke="#1a1a2e"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="0 1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                markerEnd="url(#arrowhead-black)"
              />
              <motion.path
                d="M 540 320 C 470 250, 380 200, 250 145"
                stroke="#1a1a2e"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7 }}
                markerEnd="url(#arrowhead-black)"
              />

              {/* Mobile ↔ Backend */}
              <motion.path
                d="M 912 130 C 800 200, 720 260, 660 330"
                stroke="#1a1a2e"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
                markerEnd="url(#arrowhead-black)"
              />
              <motion.path
                d="M 640 320 C 720 250, 800 200, 905 145"
                stroke="#1a1a2e"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.9 }}
                markerEnd="url(#arrowhead-black)"
              />

              {/* Backend ↔ Database */}
              <motion.path
                d="M 555 460 C 540 510, 540 560, 540 610"
                stroke="#1a1a2e"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.0 }}
                markerEnd="url(#arrowhead-black)"
              />
              <motion.path
                d="M 600 610 C 605 560, 605 510, 595 460"
                stroke="#1a1a2e"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.1 }}
                markerEnd="url(#arrowhead-black)"
              />
            </svg>

            {/* ===== ARROW LABELS ===== */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
              className="absolute top-[200px] left-[260px] z-20 bg-[#ffc700] border-2 border-black px-3 py-1 rounded-md font-caveat font-bold text-lg rotate-[-12deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              {t[lang].httpApi}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3 }}
              className="absolute top-[200px] right-[260px] z-20 bg-[#ff5e93] border-2 border-black px-3 py-1 rounded-md font-caveat font-bold text-lg rotate-[12deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-white"
            >
              {t[lang].jsonFetch}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4 }}
              className="absolute bottom-[210px] left-1/2 -translate-x-1/2 z-20 bg-[#29c46a] border-2 border-black px-3 py-1 rounded-md font-caveat font-bold text-lg rotate-[-3deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-white"
            >
              {t[lang].queriesOrm}
            </motion.div>

            {/* Floating annotations */}
            <div className="absolute top-[150px] left-[-20px] font-caveat text-2xl font-bold rotate-[-10deg] text-[#18a0fb]">{t[lang].uiBonita}</div>
            <div className="absolute top-[150px] right-[-30px] font-caveat text-2xl font-bold rotate-[10deg] text-[#ff5e93]">{t[lang].iosAndroid}</div>
            <div className="absolute bottom-[80px] left-[40px] font-caveat text-2xl font-bold rotate-[-8deg] text-[#ffc700]">{t[lang].sqlNoSql}</div>
            <div className="absolute bottom-[80px] right-[40px] font-caveat text-2xl font-bold rotate-[8deg] text-[#ff4757]">{t[lang].servidores}</div>

            {/* Stars/decorations */}
            <StarMarker className="absolute top-[10px] left-1/2 -translate-x-1/2 w-12 h-12 text-[#ffc700]" delayOrder={2} />
            <StarMarker className="absolute bottom-[20px] left-[20%] w-10 h-10 text-[#ff5e93]" delayOrder={3} />
            <StarMarker className="absolute top-[50%] right-[5%] w-10 h-10 text-[#29c46a]" delayOrder={4} />
          </div>

          {/* MOBILE LAYOUT — vertical stack */}
          <div className="md:hidden flex flex-col gap-8 max-w-md mx-auto px-4">
            {/* Frontend */}
            <div className="bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5">
              <div className="flex items-center gap-3 mb-3">
                <Monitor className="w-6 h-6 text-[#18a0fb]" strokeWidth={2.5} />
                <span className="font-archivo text-xl font-black uppercase">Frontend React</span>
              </div>
              <div className="font-caveat text-lg text-[#18a0fb] font-bold mb-3">{t[lang].whatUserSees}</div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#18a0fb]/10 border-2 border-black rounded-lg"><SiReact className="w-6 h-6 text-[#18a0fb]" /><span className="font-archivo text-xs font-bold">REACT</span></div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#F7DF1E]/10 border-2 border-black rounded-lg"><SiJavascript className="w-6 h-6 text-[#F0DB4F]" /><span className="font-archivo text-xs font-bold">JS</span></div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#3178C6]/10 border-2 border-black rounded-lg"><SiTypescript className="w-6 h-6 text-[#3178C6]" /><span className="font-archivo text-xs font-bold">TS</span></div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#06B6D4]/10 border-2 border-black rounded-lg"><SiTailwindcss className="w-6 h-6 text-[#06B6D4]" /><span className="font-archivo text-xs font-bold">TAILWIND</span></div>
              </div>
            </div>

            {/* Down arrow with label */}
            <div className="flex flex-col items-center gap-1">
              <ArrowMarker className="w-10 h-12 text-black rotate-90" wobbly delayOrder={1} />
              <div className="bg-[#ffc700] border-2 border-black px-3 py-1 rounded-md font-caveat font-bold text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">HTTP / API REST</div>
            </div>

            {/* Backend */}
            <div className="bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5">
              <div className="flex items-center gap-3 mb-3">
                <Server className="w-6 h-6 text-[#ff4757]" strokeWidth={2.5} />
                <span className="font-archivo text-xl font-black uppercase">Backend</span>
              </div>
              <div className="font-caveat text-lg text-[#ff4757] font-bold mb-3">{t[lang].elCerebro}</div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#3776AB]/10 border-2 border-black rounded-lg"><SiPython className="w-6 h-6 text-[#3776AB]" /><span className="font-archivo text-xs font-bold">PYTHON</span></div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#f89820]/10 border-2 border-black rounded-lg"><FaJava className="w-6 h-6 text-[#f89820]" /><span className="font-archivo text-xs font-bold">JAVA</span></div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#29c46a]/10 border-2 border-black rounded-lg"><SiNodedotjs className="w-6 h-6 text-[#29c46a]" /><span className="font-archivo text-xs font-bold">NODE.JS</span></div>
              </div>
            </div>

            {/* Down arrow with label */}
            <div className="flex flex-col items-center gap-1">
              <ArrowMarker className="w-10 h-12 text-black rotate-90" wobbly delayOrder={2} />
              <div className="bg-[#29c46a] border-2 border-black px-3 py-1 rounded-md font-caveat font-bold text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-white">Queries / ORM</div>
            </div>

            {/* Database */}
            <div className="bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-6 h-6 text-[#ffc700]" strokeWidth={2.5} />
                <span className="font-archivo text-xl font-black uppercase">Base de Datos</span>
              </div>
              <div className="font-caveat text-lg text-[#ffc700] font-bold mb-3">{t[lang].dondeViveTodo}</div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#336791]/10 border-2 border-black rounded-lg"><SiPostgresql className="w-6 h-6 text-[#336791]" /><span className="font-archivo text-xs font-bold">POSTGRES</span></div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#47A248]/10 border-2 border-black rounded-lg"><SiMongodb className="w-6 h-6 text-[#47A248]" /><span className="font-archivo text-xs font-bold">MONGODB</span></div>
              </div>
            </div>

            {/* Mobile */}
            <div className="bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5">
              <div className="flex items-center gap-3 mb-3">
                <Smartphone className="w-6 h-6 text-[#ff5e93]" strokeWidth={2.5} />
                <span className="font-archivo text-xl font-black uppercase">Mobile React Native</span>
              </div>
              <div className="font-caveat text-lg text-[#ff5e93] font-bold mb-3">{t[lang].enElBolsillo2}</div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#18a0fb]/10 border-2 border-black rounded-lg"><SiReact className="w-6 h-6 text-[#18a0fb]" /><span className="font-archivo text-xs font-bold">REACT NATIVE</span></div>
                <div className="flex items-center gap-2 px-3 py-2 bg-black/5 border-2 border-black rounded-lg"><SiExpo className="w-6 h-6 text-black" /><span className="font-archivo text-xs font-bold">EXPO</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-32">
          <h2 className="text-5xl sm:text-6xl font-archivo font-black uppercase mb-20 relative inline-block">
            {t[lang].projects}
            <StarMarker className="absolute -top-8 -right-12 w-16 h-16 text-[#ff5e93]" delayOrder={0} />
          </h2>

          <div className="space-y-32">
            {/* Project 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-12 items-center"
            >
              <div className="w-full md:w-1/2 p-2 bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative group">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#ffc700] rounded-full border-4 border-black z-10 flex items-center justify-center font-archivo font-black text-xl">1</div>
                <img src={projectEcommerceImg} alt={t[lang].project1Title} className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-black" />
              </div>
              <div className="w-full md:w-1/2 relative">
                <h3 className="text-4xl font-archivo font-black uppercase mb-4">{t[lang].project1Title}</h3>
                <p className="font-patrick text-2xl mb-6">
                  {t[lang].project1Desc}
                </p>
                <div className="flex flex-wrap gap-3 mb-8 font-archivo text-sm font-bold uppercase">
                  <span className="bg-black text-white px-3 py-1 border-2 border-black">Next.js</span>
                  <span className="bg-white text-black px-3 py-1 border-2 border-black">Shopify</span>
                  <span className="bg-[#3178C6] text-white px-3 py-1 border-2 border-black">TypeScript</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://github.com/esam-dev/catlink"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-archivo text-xl font-black uppercase bg-[#18a0fb] text-white px-6 py-3 border-4 border-black hover:bg-white hover:text-black transition-colors"
                  >
                    {t[lang].project1Btn} <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://nextjs-commerce-three-sooty-63.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-archivo text-xl font-black uppercase bg-[#ffc700] text-black px-6 py-3 border-4 border-black hover:bg-[#29c46a] transition-colors"
                  >
                    {t[lang].project1SiteBtn} <ExternalLink className="w-6 h-6" />
                  </a>
                </div>
                <ArrowMarker className="absolute -left-16 top-1/2 hidden md:block w-20 h-20 text-black rotate-[180deg]" delayOrder={1} />
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row-reverse gap-12 items-center"
            >
              <div className="w-full md:w-1/2 p-2 bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative group">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#29c46a] rounded-full border-4 border-black z-10 flex items-center justify-center font-archivo font-black text-xl text-white">2</div>
                <img src={projectAppImg} alt={t[lang].project2Title} className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-black" />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-4xl font-archivo font-black uppercase mb-4">{t[lang].project2Title}</h3>
                <p className="font-patrick text-2xl mb-6">
                  {t[lang].project2Desc}
                </p>
                <div className="flex flex-wrap gap-3 mb-8 font-archivo text-sm font-bold uppercase">
                  <span className="bg-[#00d8ff] text-black px-3 py-1 border-2 border-black">React</span>
                  <span className="bg-[#FFCA28] text-black px-3 py-1 border-2 border-black">Firebase</span>
                  <span className="bg-[#3178C6] text-white px-3 py-1 border-2 border-black">TypeScript</span>
                </div>
                <a href="https://finanz-services.web.app/auth" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-archivo text-xl font-black uppercase bg-[#ff5e93] text-black px-6 py-3 border-4 border-black hover:bg-black hover:text-white transition-colors">
                  {t[lang].project2Btn} <Github className="w-6 h-6" />
                </a>
              </div>
            </motion.div>

            {/* Project 3 - Navixsoft */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-12 items-center"
            >
              <div className="w-full md:w-1/2 p-2 bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative group">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#18a0fb] rounded-full border-4 border-black z-10 flex items-center justify-center font-archivo font-black text-xl text-white">3</div>
                <div className="w-full aspect-video bg-black flex items-center justify-center border-2 border-black group-hover:bg-[#18a0fb] transition-colors duration-500">
                  <span className="font-archivo font-black text-4xl sm:text-5xl text-white tracking-tighter select-none">NAVIXSOFT.</span>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative">
                <h3 className="text-4xl font-archivo font-black uppercase mb-4">{t[lang].project3Title}</h3>
                <p className="font-patrick text-2xl mb-6">
                  {t[lang].project3Desc}
                </p>
                <div className="flex flex-wrap gap-3 mb-8 font-archivo text-sm font-bold uppercase">
                  <span className="bg-[#00d8ff] text-black px-3 py-1 border-2 border-black">React</span>
                  <span className="bg-[#3178c6] text-white px-3 py-1 border-2 border-black">TypeScript</span>
                  <span className="bg-[#38bdf8] text-black px-3 py-1 border-2 border-black">Tailwind</span>
                </div>
                <a
                  href="https://navixsoft.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-archivo text-xl font-black uppercase bg-[#ffc700] text-black px-6 py-3 border-4 border-black hover:bg-[#29c46a] transition-colors"
                >
                  {t[lang].project3SiteBtn} <ExternalLink className="w-6 h-6" />
                </a>
                <ArrowMarker className="absolute -left-16 top-1/2 hidden md:block w-20 h-20 text-black rotate-[180deg]" delayOrder={3} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="py-32">
          <h2 className="text-5xl sm:text-6xl font-archivo font-black uppercase mb-16 text-center">
            {t[lang].experience}
          </h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Bold Timeline Line */}
            <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-2 bg-black -translate-x-1/2 rounded-full"></div>

            {t[lang].exp.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative pl-20 md:pl-0 mb-16 flex ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[30px] md:left-1/2 w-8 h-8 bg-[#ffc700] border-4 border-black rounded-full -translate-x-1/2 mt-4 z-10"></div>
                
                <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:pl-10' : 'md:pr-10 text-left md:text-right'} relative`}>
                  <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <span className="font-archivo font-bold text-sm bg-black text-white px-2 py-1 uppercase">{exp.year}</span>
                    <h4 className="font-archivo text-2xl font-black uppercase mt-4">{exp.role}</h4>
                    <span className="font-caveat text-2xl text-[#18a0fb] font-bold block mb-4">{exp.company}</span>
                    <p className="font-patrick text-2xl">{exp.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32">
          <div className="max-w-2xl mx-auto bg-white p-10 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative">
            <RealMarkerGraphic className="absolute -top-10 -right-10 w-32 h-auto drop-shadow-xl rotate-[15deg] z-20 hidden sm:block" />
            
            <h2 className="text-5xl font-archivo font-black uppercase mb-6 text-center">{t[lang].contact}</h2>
            <p className="font-patrick text-3xl mb-10 text-center font-bold">
              {t[lang].contactReady} <span className="highlighter-yellow">{t[lang].contactLetsTalk}</span>
            </p>
            
            <form className="space-y-6 font-archivo text-xl font-bold uppercase" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block mb-2">{t[lang].contactName}</label>
                <input 
                  type="text" 
                  className="w-full bg-background border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-[#18a0fb] transition-all" 
                  placeholder={t[lang].contactNamePlaceholder}
                />
              </div>
              <div>
                <label className="block mb-2">{t[lang].contactMessage}</label>
                <textarea 
                  className="w-full bg-background border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-[#18a0fb] transition-all resize-none h-40"
                  placeholder={t[lang].contactMsgPlaceholder}
                ></textarea>
              </div>
              <button className="w-full py-4 bg-[#29c46a] text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#18a0fb] hover:text-white hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-black text-2xl">
                {t[lang].contactBtn}
              </button>
            </form>

            <div className="mt-12 pt-8 border-t-4 border-black flex justify-center gap-8">
              <a href="https://github.com/esam-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 bg-white border-4 border-black hover:bg-[#18a0fb] hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><Github className="w-8 h-8" /></a>
              <a href="https://www.linkedin.com/in/el%C3%ADas-ort%C3%ADz-a5895224b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 bg-white border-4 border-black hover:bg-[#18a0fb] hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><Linkedin className="w-8 h-8" /></a>
              <a href="https://instagram.com/eliassamu_" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-3 bg-white border-4 border-black hover:bg-[#18a0fb] hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="mailto:emails.eliasortiz@gmail.com" aria-label="Email" className="p-3 bg-white border-4 border-black hover:bg-[#18a0fb] hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><Mail className="w-8 h-8" /></a>
            </div>
          </div>
        </section>

      </main>

      <footer className="mt-20 border-t-4 border-border bg-background text-foreground">
        {/* Main footer content */}
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <a href="#hero" className="font-archivo font-black text-3xl tracking-tighter hover:text-[#18a0fb] transition-colors w-fit">
              EO.
            </a>
            <p className="font-patrick text-xl text-muted-foreground leading-snug">
              Software Developer.<br />Full-Stack · UI · Backend.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center font-archivo font-black uppercase text-sm px-5 py-3 bg-[#18a0fb] text-white border-4 border-border hover:bg-foreground hover:text-background transition-colors w-fit"
            >
              {t[lang as keyof typeof t].footerContactBtn}
            </a>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-4">
            <h4 className="font-archivo font-black uppercase text-sm tracking-widest border-b-2 border-border pb-2">{t[lang as keyof typeof t].footerNavTitle}</h4>
            <ul className="flex flex-col gap-3 font-patrick text-xl text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">{t[lang as keyof typeof t].nav[0]}</a></li>
              <li><a href="#skills" className="hover:text-foreground transition-colors">{t[lang as keyof typeof t].nav[1]}</a></li>
              <li><a href="#projects" className="hover:text-foreground transition-colors">{t[lang as keyof typeof t].nav[2]}</a></li>
              <li><a href="#experience" className="hover:text-foreground transition-colors">{t[lang as keyof typeof t].footerNavExp}</a></li>
              <li><a href="#contact" className="hover:text-foreground transition-colors">{t[lang as keyof typeof t].nav[3]}</a></li>
            </ul>
          </div>

          {/* Projects */}
          <div className="flex flex-col gap-4">
            <h4 className="font-archivo font-black uppercase text-sm tracking-widest border-b-2 border-border pb-2">{t[lang as keyof typeof t].footerProjectsTitle}</h4>
            <ul className="flex flex-col gap-3 font-patrick text-xl text-muted-foreground">
              <li><a href="/catlink" className="hover:text-foreground transition-colors">Catlink</a></li>
              <li><a href="https://navixsoft.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Navixsoft</a></li>
              <li><a href="https://github.com/esam-dev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t[lang as keyof typeof t].footerMoreGithub}</a></li>
            </ul>
          </div>

          {/* Follow */}
          <div className="flex flex-col gap-4">
            <h4 className="font-archivo font-black uppercase text-sm tracking-widest border-b-2 border-border pb-2">{t[lang as keyof typeof t].footerFollowTitle}</h4>
            <div className="flex gap-3">
              <a
                href="https://github.com/esam-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border-2 border-border hover:bg-foreground hover:text-background transition-colors"
                aria-label="GitHub esam-dev"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/el%C3%ADas-ort%C3%ADz-a5895224b/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border-2 border-border hover:bg-foreground hover:text-background transition-colors"
                aria-label="LinkedIn Elias Ortiz"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/eliassamu_"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border-2 border-border hover:bg-foreground hover:text-background transition-colors"
                aria-label="Instagram eliassamu_"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="mailto:emails.eliasortiz@gmail.com"
                className="p-2.5 rounded-xl border-2 border-border hover:bg-foreground hover:text-background transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="font-caveat text-lg text-muted-foreground">
              @eliassamu_ · esam-dev
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 font-archivo text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Elías Ortiz.</span>
            <span className="font-caveat text-base">{t[lang as keyof typeof t].footerSlogan}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}