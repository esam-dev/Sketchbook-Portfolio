import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowUp,
  Braces,
  Bug,
  Layers,
  Package,
  Server,
  Smartphone,
  Workflow,
  Cloud,
  Cpu,
  Database,
  GitBranch,
  Terminal,
  Briefcase,
  LayoutGrid,
  UserRound,
  ArrowUpRight,
  Check,
  Code2,
  Github,
  Linkedin,
  Mail,
  Menu,
  PanelsTopLeft,
  Rocket,
  Search,
  Send,
  ServerCog,
  ShoppingBag,
  TestTube2,
  WalletCards,
  X,
  Globe2,
} from "lucide-react";
import {
  SiAdobelightroom,
  SiAdobe,
  SiAtlassian,
  SiBitbucket,
  SiCraft,
  SiDiscord,
  SiDocker,
  SiFigma,
  SiFramer,
  SiFirebase,
  SiGit,
  SiGitlab,
  SiGithub,
  SiGraphql,
  SiHtml5,
  SiInvision,
  SiJira,
  SiLinear,
  SiLinkedin,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiNetlify,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiRender,
  SiSass,
  SiShopify,
  SiSketch,
  SiSlack,
  SiStrapi,
  SiSupabase,
  SiTailwindcss,
  SiTelegram,
  SiTestrail,
  SiTrello,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVisualstudiocode,
  SiWebpack,
  SiWordpress,
  SiXd,
  SiKubernetes,
  SiDjango,
  SiFastapi,
  SiOpenjdk,
  SiStorybook,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ModeToggle } from "@/components/mode-toggle";
import profileImage from "@/assets/images/elias-perfil.png";
import "./home-features.css";
import "./home-projects.css";
import "./home-native.css";
import "./home-social.css";
import "./home-mono.css";

type Lang = "es" | "en";

const copy = {
  es: {
    nav: ["Sobre mí", "Proyectos", "Experiencia"],
    title: "Creo experiencias digitales que conectan con las personas.",
    intro: "Soy Elías Ortiz, Software Developer. Diseño y desarrollo experiencias web claras, rápidas y listas para crecer.",
    projects: "Ver proyectos",
    contact: "Hablemos",
    selected: "Proyectos seleccionados",
    selectedIntro: "Productos reales donde conecté interfaz, lógica e infraestructura para resolver problemas concretos.",
    aboutLabel: "Una forma de trabajar",
    aboutTitle: "De la intención a una experiencia que funciona.",
    about: "Me gusta reducir la complejidad: escuchar el problema, definir lo esencial y construir una solución útil, mantenible y cuidadosa en cada detalle.",
    experience: "Experiencia",
    contactTitle: "¿Tienes una idea en mente?",
    contactIntro: "Cuéntame qué estás construyendo. Me encantaría conocer el reto y pensar una buena forma de resolverlo.",
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    send: "Enviar mensaje",
    sending: "Enviando...",
    success: "Mensaje enviado. Gracias por escribirme.",
    error: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
    footer: "Diseñado y desarrollado por Elías Ortiz.",
    footerTagline: "Desarrollo productos web claros, rápidos y pensados para las personas que los usan.",
    footerHeads: ["Navegación", "Contacto"],
    backToTop: "Volver arriba",
    preview: "Vista previa",
    mailSubject: "Consulta de proyecto",
    mailBody: "Hola Elías,\n\nQuiero hablar contigo sobre un proyecto.\n\nIdea: \nPlazo estimado: \nPresupuesto aproximado: \n\n¡Saludos!",
  },
  en: {
    nav: ["About", "Projects", "Experience"],
    title: "I create digital experiences that connect with people.",
    intro: "I'm Elías Ortiz, a Software Developer. I design and build clear, fast web experiences made to grow.",
    projects: "View projects",
    contact: "Let's talk",
    selected: "Selected work",
    selectedIntro: "Real products where I connected interface, logic, and infrastructure to solve meaningful problems.",
    aboutLabel: "How I work",
    aboutTitle: "From intention to an experience that works.",
    about: "I like reducing complexity: listening to the problem, defining what matters, and building a useful, maintainable solution with care in every detail.",
    experience: "Experience",
    contactTitle: "Have an idea in mind?",
    contactIntro: "Tell me what you're building. I'd love to learn about the challenge and find a thoughtful way to solve it.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send message",
    sending: "Sending...",
    success: "Message sent. Thanks for getting in touch.",
    error: "Could not send the message. Please try again.",
    footer: "Designed and developed by Elías Ortiz.",
    footerTagline: "I build clear, fast web products designed for the people who use them.",
    footerHeads: ["Navigation", "Contact"],
    backToTop: "Back to top",
    preview: "Preview",
    mailSubject: "Project inquiry",
    mailBody: "Hi Elías,\n\nI'd like to talk with you about a project.\n\nIdea: \nEstimated timeline: \nApproximate budget: \n\nBest regards!",
  },
};

const projects = [
  {
    name: "Finanz",
    kind: "Personal finance",
    description: "Aplicación para visualizar gastos, ordenar finanzas y tomar mejores decisiones.",
    href: "https://finanz-services.web.app/auth",
    stack: ["React", "Firebase", "TypeScript"],
    tone: "blue",
  },
  {
    name: "Catlink",
    kind: "Multi-store commerce",
    description: "Una experiencia de e-commerce para descubrir marcas y comprar con facilidad.",
    href: "https://www.catlink.app/",
    stack: ["React", "TypeScript", "Retail"],
    tone: "violet",
  },
  {
    name: "Navixsoft",
    kind: "Digital presence",
    description: "Presencia digital corporativa para comunicar servicios tecnológicos con claridad.",
    href: "https://navixsoft.com",
    stack: ["React", "Cloud", "Infrastructure"],
    tone: "orange",
  },
];

const experience = [
  {
    period: "2025 — present",
    role: "Mid Software Engineer",
    company: "Navixsoft",
    description: "Construyendo productos de frontend, backend e infraestructura cloud.",
  },
  {
    period: "2025 — 2026",
    role: "Software Developer",
    company: "Botcamp Roshka",
    description: "Creación de interfaces y APIs para productos utilizados por equipos reales.",
  },
  {
    period: "2023 — 2024",
    role: "Junior Developer",
    company: "StartUp Factory",
    description: "Mantenimiento de sistemas y primeros desarrollos web.",
  },
];

const technologies = [
  { label: "React", icon: <SiReact />, color: "#61DAFB", darkColor: "#61DAFB" },
  { label: "TypeScript", icon: <SiTypescript />, color: "#3178C6", darkColor: "#3178C6" },
  { label: "Next.js", icon: <SiNextdotjs />, color: "#000000", darkColor: "#FFFFFF" },
  { label: "Node.js", icon: <SiNodedotjs />, color: "#339933", darkColor: "#5DBB63" },
  { label: "Python", icon: <SiPython />, color: "#3776AB", darkColor: "#4B8BBE" },
  { label: "Django", icon: <SiDjango />, color: "#092E20", darkColor: "#44B78B" },
  { label: "FastAPI", icon: <SiFastapi />, color: "#009688", darkColor: "#05C3A7" },
  { label: "Java", icon: <SiOpenjdk />, color: "#E76F00", darkColor: "#F89820" },
  { label: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1", darkColor: "#5B86E5" },
  { label: "Docker", icon: <SiDocker />, color: "#2496ED", darkColor: "#2496ED" },
  { label: "Git", icon: <SiGit />, color: "#F05032", darkColor: "#F05032" },
  { label: "GitHub", icon: <SiGithub />, color: "#181717", darkColor: "#FFFFFF" },
  { label: "HTML5", icon: <SiHtml5 />, color: "#E34C26", darkColor: "#E34C26" },
  { label: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4", darkColor: "#22D3EE" },
  { label: "Vite", icon: <SiVite />, color: "#6533B3", darkColor: "#9B5DE5" },
  { label: "Sass", icon: <SiSass />, color: "#CC6699", darkColor: "#FF6BD6" },
  { label: "Figma", icon: <SiFigma />, color: "#F24E1E", darkColor: "#F24E1E" },
  { label: "Framer", icon: <SiFramer />, color: "#0055FF", darkColor: "#4D99FF" },
  { label: "VS Code", icon: <VscCode />, color: "#007ACC", darkColor: "#1A7431" },
  { label: "GraphQL", icon: <SiGraphql />, color: "#E535AB", darkColor: "#E535AB" },
  { label: "MongoDB", icon: <SiMongodb />, color: "#47A735", darkColor: "#5DD96D" },
  { label: "Redis", icon: <SiRedis />, color: "#DC382D", darkColor: "#FF4433" },
  { label: "Kubernetes", icon: <SiKubernetes />, color: "#326CE5", darkColor: "#4D9BFF" },
  { label: "Webpack", icon: <SiWebpack />, color: "#31C6BE", darkColor: "#5EEAD4" },
  { label: "Storybook", icon: <SiStorybook />, color: "#FF4785", darkColor: "#FF6B9D" },
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);
  const t = copy[lang];
  const mailto = `mailto:emails.eliasortiz@gmail.com?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(t.mailBody)}`;

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "es" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", lang);
  }, [lang]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Contact request failed");
      setFormData({ name: "", email: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const [active, setActive] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const flowRef = useRef<HTMLDivElement>(null);
  const [flowLinks, setFlowLinks] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return;
    const measure = () => {
      const box = flow.getBoundingClientRect();
      const core = flow.querySelector(".portfolio-diagram-core")?.getBoundingClientRect();
      if (!core) return;
      const cx = core.left + core.width / 2 - box.left;
      const cy = core.top + core.height / 2 - box.top;
      setFlowLinks(
        Array.from(flow.querySelectorAll(".portfolio-diagram-node")).map((node) => {
          const r = node.getBoundingClientRect();
          return { x1: cx, y1: cy, x2: r.left + r.width / 2 - box.left, y2: r.top + r.height / 2 - box.top };
        }),
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(flow);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", "about", "projects", "experience", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="portfolio-page">
      <header className="portfolio-nav">
        <div className={profileOpen ? "portfolio-profile-pill is-open" : "portfolio-profile-pill"}>
          <a
            className="portfolio-brand"
            href="#top"
            aria-expanded={profileOpen}
            onClick={(event) => {
              setMenuOpen(false);
              if (window.matchMedia("(max-width: 1100px)").matches) {
                event.preventDefault();
                setProfileOpen(!profileOpen);
              }
            }}
          >
            <span className="portfolio-avatar"><img src={profileImage} alt="" /></span>
            <span className="portfolio-brand-text"><strong>Elías Ortiz</strong><small>@esam-dev · Software Developer</small></span>
          </a>
          <span className="portfolio-pill-social">
            <a href="https://github.com/esam-dev" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a href="https://www.linkedin.com/in/el%C3%ADas-ort%C3%ADz-a5895224b/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a href={mailto} aria-label="Email"><Mail /></a>
          </span>
        </div>

        {profileOpen && (
          <div className="portfolio-profile-drop">
            <img src={profileImage} alt="" />
            <span className="portfolio-brand-text"><strong>Elías Ortiz</strong><small>@esam-dev · Software Developer</small></span>
            <span className="portfolio-pill-social">
              <a href="https://github.com/esam-dev" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
              <a href="https://www.linkedin.com/in/el%C3%ADas-ort%C3%ADz-a5895224b/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
              <a href={mailto} aria-label="Email"><Mail /></a>
            </span>
          </div>
        )}

        <nav className={menuOpen ? "portfolio-links is-open" : "portfolio-links"} aria-label="Primary navigation">
          <a href="#about" className={active === "about" ? "is-active" : undefined} onClick={() => setMenuOpen(false)}><UserRound aria-hidden="true" />{t.nav[0]}</a>
          <a href="#projects" className={active === "projects" ? "is-active" : undefined} onClick={() => setMenuOpen(false)}><LayoutGrid aria-hidden="true" />{t.nav[1]}</a>
          <a href="#experience" className={active === "experience" ? "is-active" : undefined} onClick={() => setMenuOpen(false)}><Briefcase aria-hidden="true" />{t.nav[2]}</a>
          <a className="portfolio-mobile-contact" href="#contact" onClick={() => setMenuOpen(false)}>{t.contact}</a>
        </nav>

        <div className="portfolio-nav-actions">
          <button className="portfolio-language" type="button" onClick={() => setLang(lang === "es" ? "en" : "es")} aria-label="Change language">
            {lang.toUpperCase()}
          </button>
          <ModeToggle />
          <Button asChild className="portfolio-contact-button">
            <a href="#contact">{t.contact}<ArrowUpRight /></a>
          </Button>
          <button className="portfolio-menu" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="portfolio-hero" id="top">
        <div className="portfolio-hero-signal" aria-hidden="true"><Code2 /></div>
        <div className="portfolio-hero-icons" aria-hidden="true">
          <span style={{ top: "10%", left: "6%" }}><Terminal /></span>
          <span style={{ top: "24%", left: "22%" }}><Braces /></span>
          <span style={{ top: "48%", left: "4%" }}><Database /></span>
          <span style={{ top: "70%", left: "17%" }}><GitBranch /></span>
          <span style={{ top: "86%", left: "5%" }}><Layers /></span>
          <span style={{ top: "90%", left: "30%" }}><Bug /></span>
          <span style={{ top: "9%", right: "7%" }}><Cpu /></span>
          <span style={{ top: "26%", right: "21%" }}><Server /></span>
          <span style={{ top: "47%", right: "5%" }}><Cloud /></span>
          <span style={{ top: "68%", right: "18%" }}><Smartphone /></span>
          <span style={{ top: "86%", right: "6%" }}><Package /></span>
          <span style={{ top: "91%", right: "31%" }}><Workflow /></span>
        </div>
        <div className="portfolio-hero-copy">
          <h1>{t.title}</h1>
          <p className="portfolio-intro">{t.intro}</p>
          <div className="portfolio-actions">
            <Button asChild size="lg">
              <a href="#projects" className="portfolio-cta">{t.projects}<ArrowUpRight /></a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">{t.contact}</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="portfolio-section portfolio-about" id="about">
        <div className="portfolio-feature">
          <div className="portfolio-feature-copy">
            <h2>{t.aboutTitle}</h2>
            <p>{t.about}</p>
          </div>
          <div className="portfolio-feature-visual portfolio-feature-visual--projects" aria-label="Project dashboard preview">
            <Card className="portfolio-workspace">
              <CardHeader>
                <span className="portfolio-workspace-icon"><img src={profileImage} alt="Elías Ortiz" /></span>
                <strong>Elías Ortiz</strong>
                <small>Portfolio workspace</small>
              </CardHeader>
              <CardContent>
                <div className="portfolio-workspace-labels"><span>Producto</span><span>Estado</span></div>
                <div className="portfolio-workspace-row"><i className="portfolio-product-icon portfolio-product-icon--blue"><WalletCards /></i><b>Finanz</b><span>Live</span></div>
                <div className="portfolio-workspace-row"><i className="portfolio-product-icon portfolio-product-icon--violet"><ShoppingBag /></i><b>Catlink</b><span>Live</span></div>
                <div className="portfolio-workspace-row"><i className="portfolio-product-icon portfolio-product-icon--orange"><Globe2 /></i><b>Navixsoft</b><span>Live</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="portfolio-feature portfolio-feature--reverse">
          <div className="portfolio-feature-copy">
            <h2>De una idea a un producto que genera valor.</h2>
            <p>Un proyecto sólido no empieza escribiendo código. Primero alineamos objetivos y usuarios, luego diseñamos la solución, construimos con calidad y mejoramos con datos reales.</p>
          </div>
          <div className="portfolio-feature-visual portfolio-feature-visual--delivery" aria-label="Development workflow preview">
            <div className="portfolio-delivery-flow" ref={flowRef}>
              <svg className="portfolio-diagram-links" aria-hidden="true">
                {flowLinks.map((link, index) => (
                  <g key={index}>
                    <line x1={link.x1} y1={link.y1} x2={link.x2} y2={link.y2} />
                    <circle cx={link.x2} cy={link.y2} r="3.5" />
                  </g>
                ))}
              </svg>
              <article className="portfolio-diagram-node portfolio-diagram-node--research"><Search /><span>Brief<br />& usuarios</span></article>
              <article className="portfolio-diagram-node portfolio-diagram-node--ux"><PanelsTopLeft /><span>UX / UI<br />Arquitectura</span></article>
              <article className="portfolio-diagram-core"><Code2 /><strong>Producto</strong><small>Web app</small></article>
              <article className="portfolio-diagram-node portfolio-diagram-node--frontend"><Code2 /><span>Frontend<br />Interfaz</span></article>
              <article className="portfolio-diagram-node portfolio-diagram-node--backend"><ServerCog /><span>Backend<br />API & datos</span></article>
              <article className="portfolio-diagram-node portfolio-diagram-node--launch"><Rocket /><span>QA · Deploy<br />Feedback</span></article>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-section" id="projects">
        <div className="portfolio-section-heading">
          <h2>{t.selected}</h2>
        </div>
        <p className="portfolio-section-intro">{t.selectedIntro}</p>
        <div className="portfolio-project-grid">
          {projects.map((project, index) => (
            <Card className={`portfolio-project-card portfolio-project-card--${project.tone}`} key={project.name}>
              <CardHeader className="portfolio-project-preview">
                <LivePreview url={project.href} label={project.name} previewLabel={t.preview} />
              </CardHeader>
              <CardContent className="portfolio-project-content">
                <div>
                  <p>{project.kind}</p>
                  <h3>{project.name}</h3>
                  <span>{project.description}</span>
                </div>
                <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}>
                  <ArrowUpRight />
                </a>
              </CardContent>
              <div className="portfolio-tags">
                {project.stack.map((tag) => <Badge variant="outline" key={tag}>{tag}</Badge>)}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="portfolio-section portfolio-experience" id="experience">
        <div className="portfolio-section-heading">
          <h2>{t.experience}</h2>
        </div>
        <div className="portfolio-experience-list">
          {experience.map((item) => (
            <article key={item.company}>
              <span>{item.period}</span>
              <div><h3>{item.role}</h3><strong>{item.company}</strong><p>{item.description}</p></div>
              <Check />
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section portfolio-stack">
        <div className="portfolio-stack-head">
          <span className="portfolio-stack-eyebrow">Stack</span>
          <h2>{lang === "es" ? "Herramientas para construir con intención." : "Tools to build with intention."}</h2>
          <p>{lang === "es" ? "Las tecnologías que uso a diario para diseñar, desarrollar y lanzar productos." : "The technologies I use every day to design, build and ship products."}</p>
        </div>
        <ul className="portfolio-stack-grid">
          {technologies.map((technology) => (
            <li
              key={technology.label}
              style={{ "--stack-color": technology.color, "--stack-color-dark": technology.darkColor } as React.CSSProperties}
            >
              <span className="portfolio-stack-icon">{technology.icon}</span>
              <span>{technology.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="portfolio-contact" id="contact">
        <div className="portfolio-contact-copy">
          <h2>{t.contactTitle}</h2>
          <p>{t.contactIntro}</p>
          <div className="portfolio-socials">
            <a href="https://github.com/esam-dev" target="_blank" rel="noreferrer"><Github /> GitHub</a>
            <a href="https://www.linkedin.com/in/el%C3%ADas-ort%C3%ADz-a5895224b/" target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a>
            <a href={mailto}><Mail /> Email</a>
          </div>
        </div>
        <Card className="portfolio-form-card">
          <CardContent>
            <form onSubmit={handleSubmit}>
              <label>{t.name}<Input required autoComplete="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} /></label>
              <label>{t.email}<Input required type="email" autoComplete="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} /></label>
              <label>{t.message}<Textarea required rows={5} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} /></label>
              <Button type="submit" disabled={submitting}>{submitting ? t.sending : t.send}<Send /></Button>
              {status === "success" && <p className="portfolio-status portfolio-status--success">{t.success}</p>}
              {status === "error" && <p className="portfolio-status portfolio-status--error">{t.error}</p>}
            </form>
          </CardContent>
        </Card>
      </section>

      <footer className="portfolio-footer">
        <div className="portfolio-footer-inner">
          <div className="portfolio-footer-brand">
            <a className="portfolio-footer-logo" href="#top"><Code2 aria-hidden="true" />Elías Ortiz</a>
            <p>{t.footerTagline}</p>
            <div className="portfolio-footer-social">
              <a href="https://github.com/esam-dev" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
              <a href="https://www.linkedin.com/in/el%C3%ADas-ort%C3%ADz-a5895224b/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
              <a href={mailto} aria-label="Email"><Mail /></a>
            </div>
          </div>
          <nav className="portfolio-footer-nav portfolio-footer-nav--two" aria-label={t.footerHeads[0]}>
            <div>
              <h4>{t.footerHeads[0]}</h4>
              <a href="#about">{t.nav[0]}</a>
              <a href="#projects">{t.nav[1]}</a>
              <a href="#experience">{t.nav[2]}</a>
            </div>
            <div>
              <h4>{t.footerHeads[1]}</h4>
              <a href="#contact">{t.contact}</a>
              <a href="https://github.com/esam-dev" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/el%C3%ADas-ort%C3%ADz-a5895224b/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </nav>
        </div>
        <div className="portfolio-footer-bottom">
          <span>© {new Date().getFullYear()} Elías Ortiz · {t.footer}</span>
          <a href="#top" aria-label={t.backToTop} title={t.backToTop}><ArrowUp /></a>
        </div>
      </footer>
    </main>
  );
}

function LivePreview({ url, label, previewLabel }: { url: string; label: string; previewLabel: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateScale = () => {
      const width = viewport.offsetWidth;
      if (width > 0) {
        viewport.style.setProperty("--preview-scale", String(width / 1280));
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateScale);
      observer.observe(viewport);
    }

    return () => {
      window.removeEventListener("resize", updateScale);
      observer?.disconnect();
    };
  }, []);

  let host = url;
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    /* keep raw url */
  }

  return (
    <div className="portfolio-live-preview" ref={containerRef}>
      <div className="portfolio-live-chrome" aria-hidden="true">
        <i /><i /><i />
        <span>{host}</span>
      </div>
      <div className="portfolio-live-viewport" ref={viewportRef}>
        {!loaded && (
          <div className="portfolio-live-loading" aria-hidden="true">
            <span>{previewLabel}…</span>
          </div>
        )}
        {visible && (
          <iframe
            src={url}
            title={`${label} — live preview`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
    </div>
  );
}
