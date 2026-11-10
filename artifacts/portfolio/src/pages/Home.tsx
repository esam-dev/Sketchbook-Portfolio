import { useState } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, ArrowRight } from "lucide-react";
import { SiPython, SiReact, SiNodedotjs, SiTailwindcss, SiPostgresql, SiTypescript, SiExpo, SiMongodb } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import eliasPerfilImg from "@/assets/images/elias-perfil.png";
import projectAppImg from "@/assets/images/project-app.png";
import projectEcommerceImg from "@/assets/images/project-ecommerce.png";

type Lang = "es" | "en";

const SECTIONS = [
  { id: "about", key: "navAbout" },
  { id: "skills", key: "navSkills" },
  { id: "projects", key: "navProjects" },
  { id: "contact", key: "navContact" },
] as const;

export default function Home() {
  const [lang, setLang] = useState<Lang>("es");
  const toggleLang = () => setLang(lang === "es" ? "en" : "es");

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
      navAbout: "Sobre mí",
      navSkills: "Habilidades",
      navProjects: "Proyectos",
      navContact: "Contacto",
      heroHola: "¡Hola! Soy Elías Ortiz",
      heroRol: "Desarrollador de software",
      heroTagline: "Construyo experiencias digitales limpias, rápidas y escalables — del backend a la interfaz.",
      heroCta: "Hablemos",
      heroCtaSecondary: "GitHub",
      about: "Sobre mí",
      about1: "Soy un desarrollador de software y aficionado de la tecnología que busca crear ",
      about1b: "experiencias digitales con la mejor UI y funcionalidades factibles con código",
      about2: "Con buena experiencia en ",
      about2b: "arquitectura de software",
      about2c: " y un amor profundo por construir soluciones. Me enfoco en rendimiento y escalabilidad.",
      about3: "Aficionado a los diagramas de arquitectura de software, el aroma del café y el código optimizado.",
      skills: "Habilidades",
      skillsDesc: "Cómo construyo y conecto las cosas",
      frontend: "Frontend",
      mobile: "Mobile",
      backend: "Backend",
      database: "Base de Datos",
      projects: "Proyectos",
      projectsDesc: "Trabajo seleccionado",
      project1Title: "E-commerce Platform — Next.js Commerce",
      project1Desc: "Tienda online moderna con catálogo de productos, carrito de compras y checkout impulsado por Shopify.",
      project1Btn: "Ver código",
      project1SiteBtn: "Ver sitio",
      project2Title: "Finanz",
      project2Desc: "Plataforma de servicios financieros con panel de control, autenticación y gestión de finanzas personales.",
      project2Btn: "Ver código",
      project3Title: "Sitio web — Navixsoft",
      project3Desc: "Sitio corporativo de una empresa de desarrollo de software. Desarrollo completo: diseño, frontend, backend e infraestructura.",
      project3SiteBtn: "Ver sitio",
      experience: "Experiencia",
      exp: [
        { year: "2025 — Presente", role: "Mid Software Engineer", company: "Navixsoft", desc: "Desarrollo backend y frontend con Python, Node.js y React. Infraestructura en AWS, GCP y Railway." },
        { year: "2025 — 2026", role: "Full-Stack Developer", company: "Botcamp Roshka", desc: "Desarrollo de UI con React y APIs en Java." },
        { year: "2023 — 2024", role: "Junior Developer", company: "StartUp Factory", desc: "Mantenimiento de sistemas legacy e inicios en desarrollo web." },
      ],
      contact: "Contacto",
      contactReady: "¿Listo para empezar?",
      contactLetsTalk: "Hablemos.",
      contactDesc: "Cuéntame sobre tu proyecto o idea. Respondo rápido.",
      contactName: "Nombre",
      contactPhone: "Teléfono",
      contactMessage: "Mensaje",
      contactNamePlaceholder: "Tu nombre",
      contactPhonePlaceholder: "Tu teléfono",
      contactMsgPlaceholder: "¡Hola Elías!...",
      contactBtn: "Enviar mensaje",
      contactSuccess: "Mensaje enviado con éxito.",
      contactError: "Error al enviar. Intenta de nuevo.",
      footerSlogan: "Pizarra limpia. Código limpio.",
      footerRights: "Todos los derechos reservados.",
    },
    en: {
      navAbout: "About",
      navSkills: "Skills",
      navProjects: "Projects",
      navContact: "Contact",
      heroHola: "Hi! I'm Elías Ortiz",
      heroRol: "Software developer",
      heroTagline: "I build clean, fast and scalable digital experiences — from backend to interface.",
      heroCta: "Let's talk",
      heroCtaSecondary: "GitHub",
      about: "About me",
      about1: "I'm a software developer and technology enthusiast who seeks to create ",
      about1b: "digital experiences with the best UI and feasible features in code",
      about2: "With solid experience in ",
      about2b: "software architecture",
      about2c: " and a deep love for building solutions. I focus on performance and scalability.",
      about3: "Fond of software architecture diagrams, the aroma of coffee, and optimized code.",
      skills: "Skills",
      skillsDesc: "How I build and connect things",
      frontend: "Frontend",
      mobile: "Mobile",
      backend: "Backend",
      database: "Database",
      projects: "Projects",
      projectsDesc: "Selected work",
      project1Title: "E-commerce Platform — Next.js Commerce",
      project1Desc: "Modern online store with product catalog, shopping cart, and Shopify-powered checkout.",
      project1Btn: "View code",
      project1SiteBtn: "View site",
      project2Title: "Finanz",
      project2Desc: "Financial services platform with dashboard, authentication, and personal finance management.",
      project2Btn: "View code",
      project3Title: "Website — Navixsoft",
      project3Desc: "Corporate site for a software development company. Full development: design, frontend, backend and infrastructure.",
      project3SiteBtn: "View site",
      experience: "Experience",
      exp: [
        { year: "2025 — Present", role: "Mid Software Engineer", company: "Navixsoft", desc: "Backend and frontend development with Python, Node.js and React. Infrastructure on AWS, GCP and Railway." },
        { year: "2025 — 2026", role: "Full-Stack Developer", company: "Botcamp Roshka", desc: "UI development with React and APIs in Java." },
        { year: "2023 — 2024", role: "Junior Developer", company: "StartUp Factory", desc: "Legacy system maintenance and web development beginnings." },
      ],
      contact: "Contact",
      contactReady: "Ready to start?",
      contactLetsTalk: "Let's talk.",
      contactDesc: "Tell me about your project or idea. I reply fast.",
      contactName: "Name",
      contactPhone: "Phone",
      contactMessage: "Message",
      contactNamePlaceholder: "Your name",
      contactPhonePlaceholder: "Your phone",
      contactMsgPlaceholder: "Hi Elias!...",
      contactBtn: "Send message",
      contactSuccess: "Message sent successfully.",
      contactError: "Error sending. Please try again.",
      footerSlogan: "Clean board. Clean code.",
      footerRights: "All rights reserved.",
    },
  };

  const skillGroups = [
    {
      title: t[lang].frontend,
      items: [
        { icon: <SiReact className="w-5 h-5 text-[#61DAFB]" />, label: "React" },
        { icon: <SiTypescript className="w-5 h-5 text-[#3178C6]" />, label: "TypeScript" },
        { icon: <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" />, label: "Tailwind" },
        { icon: <SiNodedotjs className="w-5 h-5 text-[#339933]" />, label: "Node.js" },
      ],
    },
    {
      title: t[lang].mobile,
      items: [
        { icon: <SiReact className="w-5 h-5 text-[#61DAFB]" />, label: "React Native" },
        { icon: <SiExpo className="w-5 h-5 text-foreground" />, label: "Expo" },
      ],
    },
    {
      title: t[lang].backend,
      items: [
        { icon: <SiPython className="w-5 h-5 text-[#3776AB]" />, label: "Python" },
        { icon: <FaJava className="w-5 h-5 text-[#f89820]" />, label: "Java" },
        { icon: <SiNodedotjs className="w-5 h-5 text-[#339933]" />, label: "Node.js" },
      ],
    },
    {
      title: t[lang].database,
      items: [
        { icon: <SiPostgresql className="w-5 h-5 text-[#336791]" />, label: "PostgreSQL" },
        { icon: <SiMongodb className="w-5 h-5 text-[#47A248]" />, label: "MongoDB" },
      ],
    },
  ];

  const projects = [
    {
      title: t[lang].project1Title,
      desc: t[lang].project1Desc,
      tags: ["Next.js", "Shopify", "TypeScript"],
      image: <img src={projectEcommerceImg} alt={t[lang].project1Title} className="w-full h-full object-cover" />,
      links: [
        { href: "https://github.com/esam-dev/catlink", label: t[lang].project1Btn },
        { href: "https://nextjs-commerce-three-sooty-63.vercel.app/", label: t[lang].project1SiteBtn },
      ],
    },
    {
      title: t[lang].project2Title,
      desc: t[lang].project2Desc,
      tags: ["React", "Firebase", "TypeScript"],
      image: <img src={projectAppImg} alt={t[lang].project2Title} className="w-full h-full object-cover" />,
      links: [{ href: "https://finanz-services.web.app/auth", label: t[lang].project2Btn }],
    },
    {
      title: t[lang].project3Title,
      desc: t[lang].project3Desc,
      tags: ["React", "TypeScript", "Tailwind"],
      image: (
        <div className="w-full h-full bg-[#0c0c14] flex items-center justify-center">
          <span className="text-white text-xl font-semibold tracking-tight">NAVIXSOFT.</span>
        </div>
      ),
      links: [{ href: "https://navixsoft.com", label: t[lang].project3SiteBtn }],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <nav className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
          <a href="#top" className="font-semibold tracking-tight text-[15px]">
            elias<span className="text-muted-foreground">.ortiz</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t[lang][s.key]}
              </a>
            ))}
          </div>
          <button
            onClick={toggleLang}
            className="text-xs font-medium tracking-wide text-muted-foreground hover:text-foreground border border-border rounded-full px-3 py-1.5 transition-colors"
          >
            {lang === "es" ? "ES" : "EN"}
          </button>
        </nav>
      </header>

      <main id="top" className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden hero-gradient">
          <div className="absolute inset-0 grid-texture" aria-hidden="true" />
          <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-40">
            <p className="eyebrow animate-fade-up mb-6">
              {t[lang].heroRol} · Full-Stack
            </p>
            <h1 className="animate-fade-up animation-delay-100 max-w-4xl text-5xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.05]">
              {t[lang].heroHola}
              <span className="block mt-2 bg-gradient-to-r from-[hsl(221_83%_45%)] via-[hsl(245_70%_55%)] to-[hsl(271_60%_55%)] bg-clip-text text-transparent">
                {t[lang].heroRol}
              </span>
            </h1>
            <p className="animate-fade-up animation-delay-200 mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              {t[lang].heroTagline}
            </p>
            <div className="animate-fade-up animation-delay-300 mt-10 flex flex-wrap items-center gap-4">
              <a href="#contact" className="btn-primary">
                {t[lang].heroCta} <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/esam-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Github className="w-4 h-4" /> {t[lang].heroCtaSecondary}
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-20 max-w-6xl mx-auto px-6 py-24 md:py-32">
          <p className="eyebrow mb-3">01 — {t[lang].about}</p>
          <div className="grid md:grid-cols-[minmax(0,320px)_1fr] gap-12 md:gap-16 items-start">
            <div className="animate-fade-up">
              <img
                src={eliasPerfilImg}
                alt="Elías Ortiz"
                className="w-full aspect-square object-cover rounded-xl border border-border shadow-[0_24px_48px_-24px_rgb(0_0_0/0.15)]"
              />
            </div>
            <div className="animate-fade-up animation-delay-100 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {t[lang].heroHola}
              </h2>
              <p>
                {t[lang].about1}
                <strong className="text-foreground font-semibold">{t[lang].about1b}</strong>.
              </p>
              <p>
                {t[lang].about2}
                <strong className="text-foreground font-semibold">{t[lang].about2b}</strong>
                {t[lang].about2c}
              </p>
              <p>{t[lang].about3}</p>
              <div className="flex flex-wrap gap-3 pt-4">
                <a href="https://github.com/esam-dev" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/el%C3%ADas-ort%C3%ADz-a5895224b/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a href="mailto:emails.eliasortiz@gmail.com" className="btn-ghost">
                  <Mail className="w-4 h-4" /> Email
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-20 section-gradient border-y border-border/60">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
            <p className="eyebrow mb-3">02 — {t[lang].skills}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {t[lang].skills}
            </h2>
            <p className="text-muted-foreground mb-12">{t[lang].skillsDesc}</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map((group) => (
                <div
                  key={group.title}
                  className="card-minimal p-6 transition-shadow hover:shadow-[0_16px_40px_-16px_rgb(0_0_0/0.1)]"
                >
                  <h3 className="text-sm font-semibold mb-5 tracking-tight">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((tech) => (
                      <span
                        key={tech.label}
                        className="inline-flex items-center gap-2 text-[13px] font-medium px-3 py-1.5 rounded-full border border-border bg-background"
                      >
                        {tech.icon} {tech.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-20 max-w-6xl mx-auto px-6 py-24 md:py-32">
          <p className="eyebrow mb-3">03 — {t[lang].projects}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {t[lang].projects}
          </h2>
          <p className="text-muted-foreground mb-12">{t[lang].projectsDesc}</p>
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="card-minimal group overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgb(0_0_0/0.18)]"
              >
                <div className="aspect-[4/3] overflow-hidden border-b border-border">
                  {project.image}
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-lg font-semibold tracking-tight leading-snug mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-muted-foreground px-2.5 py-1 rounded-full border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        {link.label} <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="section-gradient border-y border-border/60">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
            <p className="eyebrow mb-3">04 — {t[lang].experience}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
              {t[lang].experience}
            </h2>
            <div className="relative max-w-2xl">
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />
              <div className="space-y-12">
                {t[lang].exp.map((exp, i) => (
                  <div key={i} className="relative pl-8">
                    <span
                      className="absolute left-0 top-2 w-[11px] h-[11px] rounded-full border-2 border-background bg-foreground"
                      aria-hidden="true"
                    />
                    <p className="font-mono text-xs text-muted-foreground tracking-wide mb-1.5">
                      {exp.year}
                    </p>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {exp.role}
                      <span className="text-muted-foreground font-normal"> · {exp.company}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2 max-w-xl">
                      {exp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 max-w-6xl mx-auto px-6 py-24 md:py-32">
          <p className="eyebrow mb-3">05 — {t[lang].contact}</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t[lang].contactReady}{" "}
            <span className="bg-gradient-to-r from-[hsl(221_83%_45%)] to-[hsl(271_60%_55%)] bg-clip-text text-transparent">
              {t[lang].contactLetsTalk}
            </span>
          </h2>
          <p className="text-muted-foreground mb-12">{t[lang].contactDesc}</p>
          <div className="grid md:grid-cols-[1fr_minmax(0,440px)] gap-12">
            <form className="space-y-5 order-2 md:order-1" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                  {t[lang].contactName}
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-minimal"
                  placeholder={t[lang].contactNamePlaceholder}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="phone">
                  {t[lang].contactPhone}
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-minimal"
                  placeholder={t[lang].contactPhonePlaceholder}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="message">
                  {t[lang].contactMessage}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input-minimal resize-none h-32"
                  placeholder={t[lang].contactMsgPlaceholder}
                  required
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
                {submitting ? "..." : t[lang].contactBtn}
              </button>
              {status === "success" && (
                <p className="text-sm text-green-600 font-medium">{t[lang].contactSuccess}</p>
              )}
              {status === "error" && (
                <p className="text-sm text-destructive font-medium">{t[lang].contactError}</p>
              )}
            </form>
            <div className="order-1 md:order-2 flex flex-col gap-3">
              <a
                href="mailto:emails.eliasortiz@gmail.com"
                className="card-minimal p-5 flex items-center gap-4 transition-colors hover:border-foreground/25"
              >
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">emails.eliasortiz@gmail.com</span>
              </a>
              <a
                href="https://github.com/esam-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="card-minimal p-5 flex items-center gap-4 transition-colors hover:border-foreground/25"
              >
                <Github className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">github.com/esam-dev</span>
              </a>
              <a
                href="https://www.linkedin.com/in/el%C3%ADas-ort%C3%ADz-a5895224b/"
                target="_blank"
                rel="noopener noreferrer"
                className="card-minimal p-5 flex items-center gap-4 transition-colors hover:border-foreground/25"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{t[lang].footerSlogan}</p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Elías Ortiz · {t[lang].footerRights}
          </p>
        </div>
      </footer>
    </div>
  );
}
