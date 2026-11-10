import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Send,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import {
  SiDocker,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ModeToggle } from "@/components/mode-toggle";
import profileImage from "@/assets/images/elias-perfil.png";

type Lang = "es" | "en";

const copy = {
  es: {
    nav: ["Sobre mí", "Proyectos", "Experiencia"],
    available: "Disponible para nuevos proyectos",
    title: "Construyo productos digitales que se sienten bien de usar.",
    intro: "Soy Elías Ortiz, Software Developer. Diseño y desarrollo experiencias web claras, rápidas y listas para crecer.",
    projects: "Ver proyectos",
    contact: "Hablemos",
    focus: "Enfoque",
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
    preview: "Vista previa",
  },
  en: {
    nav: ["About", "Projects", "Experience"],
    available: "Available for new projects",
    title: "I build digital products that feel good to use.",
    intro: "I'm Elías Ortiz, a Software Developer. I design and build clear, fast web experiences made to grow.",
    projects: "View projects",
    contact: "Let's talk",
    focus: "Focus",
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
    preview: "Preview",
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
  { label: "React", icon: <SiReact /> },
  { label: "TypeScript", icon: <SiTypescript /> },
  { label: "Next.js", icon: <SiNextdotjs /> },
  { label: "Node.js", icon: <SiNodedotjs /> },
  { label: "Python", icon: <SiPython /> },
  { label: "PostgreSQL", icon: <SiPostgresql /> },
  { label: "Docker", icon: <SiDocker /> },
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);
  const t = copy[lang];

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

  return (
    <main className="portfolio-page">
      <header className="portfolio-nav">
        <a className="portfolio-brand" href="#top" onClick={() => setMenuOpen(false)}>
          <Code2 aria-hidden="true" />
          <span>Elías Ortiz</span>
        </a>

        <nav className={menuOpen ? "portfolio-links is-open" : "portfolio-links"} aria-label="Primary navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>{t.nav[0]}</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>{t.nav[1]}</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>{t.nav[2]}</a>
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
        <div className="portfolio-hero-copy">
          <Badge variant="outline" className="portfolio-availability">
            <span />
            {t.available}
          </Badge>
          <p className="portfolio-kicker">Software Developer · Argentina</p>
          <h1>{t.title}</h1>
          <p className="portfolio-intro">{t.intro}</p>
          <div className="portfolio-actions">
            <Button asChild size="lg">
              <a href="#projects">{t.projects}<ArrowUpRight /></a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">{t.contact}</a>
            </Button>
          </div>
        </div>

        <div className="portfolio-hero-art" aria-label="Profile and software development focus">
          <div className="portfolio-grid" />
          <div className="portfolio-status-card">
            <span><Sparkles /> {t.focus}</span>
            <strong>Design<br />+ Engineering</strong>
            <small>Interfaces · APIs · Cloud</small>
          </div>
          <div className="portfolio-portrait">
            <img src={profileImage} alt="Elías Ortiz" />
          </div>
          <div className="portfolio-location"><MapPin /> Remote · LATAM</div>
        </div>
      </section>

      <section className="portfolio-tech-strip" aria-label="Technology stack">
        <span>React</span><i />
        <span>TypeScript</span><i />
        <span>Node.js</span><i />
        <span>Python</span><i />
        <span>Cloud</span><i />
        <span>Product thinking</span>
      </section>

      <section className="portfolio-section portfolio-about" id="about">
        <div className="portfolio-section-heading">
          <span>01 / {t.aboutLabel}</span>
          <h2>{t.aboutTitle}</h2>
        </div>
        <div className="portfolio-about-content">
          <p>{t.about}</p>
          <div className="portfolio-principles">
            <article><span>01</span><h3>Entender</h3><p>La necesidad antes de elegir la tecnología.</p></article>
            <article><span>02</span><h3>Construir</h3><p>Con decisiones simples, claras y sostenibles.</p></article>
            <article><span>03</span><h3>Mejorar</h3><p>Midiendo, aprendiendo e iterando con intención.</p></article>
          </div>
        </div>
      </section>

      <section className="portfolio-section" id="projects">
        <div className="portfolio-section-heading">
          <span>02 / {t.selected}</span>
          <h2>{t.selected}</h2>
        </div>
        <p className="portfolio-section-intro">{t.selectedIntro}</p>
        <div className="portfolio-project-grid">
          {projects.map((project, index) => (
            <Card className={`portfolio-project-card portfolio-project-card--${project.tone}`} key={project.name}>
              <CardHeader className="portfolio-project-preview">
                <div className="portfolio-window-bar"><i /><i /><i /><span>{project.name.toLowerCase()}.app</span></div>
                <div className="portfolio-preview-content">
                  <span>{t.preview} 0{index + 1}</span>
                  <strong>{project.name}</strong>
                  <div className="portfolio-preview-lines"><i /><i /><i /></div>
                  <div className="portfolio-preview-chart"><i /><i /><i /><i /><i /></div>
                </div>
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
          <span>03 / {t.experience}</span>
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
        <div className="portfolio-section-heading">
          <span>04 / Stack</span>
          <h2>Herramientas para construir con intención.</h2>
        </div>
        <div className="portfolio-stack-list">
          {technologies.map((technology) => <Badge variant="outline" key={technology.label}>{technology.icon}{technology.label}</Badge>)}
        </div>
      </section>

      <section className="portfolio-contact" id="contact">
        <div className="portfolio-contact-copy">
          <span>05 / Contacto</span>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactIntro}</p>
          <div className="portfolio-socials">
            <a href="https://github.com/esam-dev" target="_blank" rel="noreferrer"><Github /> GitHub</a>
            <a href="https://www.linkedin.com/in/el%C3%ADas-ort%C3%ADz-a5895224b/" target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a>
            <a href="mailto:emails.eliasortiz@gmail.com"><Mail /> Email</a>
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
        <span>© {new Date().getFullYear()} Elías Ortiz</span>
        <span>{t.footer}</span>
        <a href="#top"><Sun /> <Moon /></a>
      </footer>
    </main>
  );
}
