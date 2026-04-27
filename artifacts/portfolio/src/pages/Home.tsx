import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDoodle, StarDoodle, CircleDoodle, UnderlineDoodle, BulbDoodle, CoffeeStain } from "@/components/Doodles";
import { Github, Linkedin, Mail, Twitter, Code2, Terminal, Database, Server, Smartphone, Monitor } from "lucide-react";
import portraitImg from "@/assets/images/portrait.png";
import projectAppImg from "@/assets/images/project-app.png";
import projectEcommerceImg from "@/assets/images/project-ecommerce.png";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div className="min-h-screen w-full overflow-hidden text-foreground selection:bg-[hsl(53_98%_77%/0.5)]">
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <CoffeeStain className="absolute top-20 right-10 -rotate-12 opacity-80" />
        <CoffeeStain className="absolute bottom-40 left-10 rotate-45 opacity-60 scale-75" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none flex justify-between items-start">
        <div className="pointer-events-auto">
          <a href="#hero" className="font-kalam text-2xl font-bold tracking-tight hover:text-muted-foreground transition-colors doodle-underline-hover">
            AR.
          </a>
        </div>
        <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6 font-patrick text-xl bg-background/80 sm:bg-transparent p-4 sm:p-0 rounded-xl sm:rounded-none backdrop-blur-sm sm:backdrop-blur-none border-2 border-foreground sm:border-none shadow-sm sm:shadow-none pointer-events-auto origin-top-right rotate-1 sm:rotate-0">
          <li><a href="#about" className="hover:text-muted-foreground hover:-rotate-2 inline-block transition-transform">Sobre mí</a></li>
          <li><a href="#skills" className="hover:text-muted-foreground hover:rotate-2 inline-block transition-transform">Habilidades</a></li>
          <li><a href="#projects" className="hover:text-muted-foreground hover:-rotate-2 inline-block transition-transform">Proyectos</a></li>
          <li><a href="#contact" className="hover:text-muted-foreground hover:rotate-2 inline-block transition-transform">Contacto</a></li>
        </ul>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="inline-block relative">
              <h1 className="text-6xl sm:text-8xl font-caveat font-bold leading-tight rotate-[-2deg]">
                ¡Hola! Soy <span className="highlighter-yellow">Alex Rivera</span>
              </h1>
              <CircleDoodle className="absolute -top-4 -right-12 w-32 h-32 text-red-500 opacity-70" delayOrder={1} />
            </div>
            
            <p className="text-3xl sm:text-4xl font-patrick mt-8 max-w-2xl rotate-[1deg]">
              Desarrollador Full-Stack. Construyendo cosas, rompiendo cosas, <span className="highlighter-pink">dibujando cosas.</span>
            </p>

            <div className="mt-12 flex items-center gap-6 font-kalam text-xl">
              <a href="#projects" className="sticky-note px-6 py-3 hover:-translate-y-1 transition-transform doodle-border border-2 border-foreground">
                Ver mis proyectos
              </a>
              <a href="#contact" className="hover:text-muted-foreground flex items-center gap-2">
                <span>Escríbeme</span>
                <ArrowDoodle className="w-10 h-10 rotate-90" delayOrder={2} />
              </a>
            </div>
          </motion.div>

          <motion.div style={{ y: y1 }} className="absolute right-0 top-1/4 hidden md:block opacity-60">
            <StarDoodle className="w-16 h-16 text-yellow-500" delayOrder={3} />
            <StarDoodle className="w-10 h-10 text-yellow-400 absolute -top-10 -right-10" delayOrder={4} />
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 relative">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/3 relative"
            >
              <div className="relative rotate-[-3deg] p-4 bg-white/50 dark:bg-black/20 doodle-border">
                <img src={portraitImg} alt="Alex Rivera" className="w-full h-auto rounded grayscale contrast-125 mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute -bottom-4 -right-4 bg-background px-3 py-1 font-caveat text-xl rotate-6 doodle-border bg-white dark:bg-black">
                  Yo 🤓
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-2/3"
            >
              <h2 className="text-4xl font-kalam font-bold mb-6 relative inline-block">
                Sobre mí
                <UnderlineDoodle className="absolute -bottom-2 left-0 w-full text-cyan-500" delayOrder={1} />
              </h2>
              <div className="space-y-4 font-patrick text-2xl leading-relaxed">
                <p>
                  Soy un apasionado de la tecnología que cree que el código es tanto <span className="highlighter-cyan">ciencia</span> como <span className="highlighter-yellow">arte</span>. 
                </p>
                <p>
                  Llevo más de 5 años transformando ideas en aplicaciones web y móviles reales. Me encanta resolver problemas complejos y asegurarme de que el usuario final tenga una experiencia increíble.
                </p>
                <p>
                  Cuando no estoy frente al editor de código, me encontrarás dibujando en mi cuaderno, tomando un café ☕ o planeando el próximo proyecto loco.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24">
          <h2 className="text-4xl font-kalam font-bold mb-12 text-center relative">
            <BulbDoodle className="absolute -top-12 left-1/2 -translate-x-1/2 text-yellow-500" />
            <span className="relative z-10 mt-6 inline-block">Mi Caja de Herramientas</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[
              { name: "React / Next.js", icon: <Monitor className="w-8 h-8" />, rotate: "-2deg" },
              { name: "TypeScript", icon: <Code2 className="w-8 h-8" />, rotate: "1deg" },
              { name: "Node.js", icon: <Server className="w-8 h-8" />, rotate: "-1deg" },
              { name: "PostgreSQL", icon: <Database className="w-8 h-8" />, rotate: "3deg" },
              { name: "Tailwind CSS", icon: <Terminal className="w-8 h-8" />, rotate: "-3deg" },
              { name: "React Native", icon: <Smartphone className="w-8 h-8" />, rotate: "2deg" },
            ].map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-3 p-4 bg-white/30 dark:bg-black/20 doodle-border hover:bg-white/50 dark:hover:bg-black/40 transition-colors"
                style={{ transform: `rotate(${skill.rotate})` }}
              >
                <div className="p-3 rounded-full border-2 border-foreground border-dashed">
                  {skill.icon}
                </div>
                <span className="font-patrick text-xl text-center">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24">
          <h2 className="text-4xl font-kalam font-bold mb-16 relative inline-block">
            Proyectos Destacados
            <UnderlineDoodle className="absolute -bottom-2 left-0 w-full text-pink-500" delayOrder={0} />
          </h2>

          <div className="space-y-24">
            {/* Project 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="w-full md:w-1/2 rotate-2 doodle-border p-2 bg-white dark:bg-zinc-900 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-6 bg-yellow-200/80 backdrop-blur-sm shadow-sm rotate-3"></div> {/* Tape */}
                <img src={projectEcommerceImg} alt="E-Commerce Sketch" className="w-full h-auto grayscale contrast-125 mix-blend-multiply dark:mix-blend-screen" />
              </div>
              <div className="w-full md:w-1/2 relative">
                <h3 className="text-3xl font-caveat font-bold mb-2">Tienda de Ropa Indie</h3>
                <p className="font-patrick text-xl mb-4">
                  Una plataforma de e-commerce completa construida desde cero. Maneja inventario, carrito, y pagos. ¡Súper rápida! 🚀
                </p>
                <div className="flex flex-wrap gap-2 mb-6 font-kalam text-lg">
                  <span className="highlighter-yellow">Next.js</span>
                  <span className="highlighter-cyan">Stripe</span>
                  <span className="highlighter-pink">Tailwind</span>
                </div>
                <a href="#" className="inline-flex items-center gap-2 font-kalam text-xl font-bold hover:text-muted-foreground group">
                  Ver código <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </a>
                <ArrowDoodle className="absolute -left-10 top-1/2 hidden md:block w-16 h-16 text-foreground" delayOrder={1} />
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row-reverse gap-8 items-start"
            >
              <div className="w-full md:w-1/2 -rotate-2 doodle-border p-2 bg-white dark:bg-zinc-900 relative">
                <div className="absolute top-0 right-4 -translate-y-1/2 w-12 h-6 bg-pink-200/80 backdrop-blur-sm shadow-sm -rotate-3"></div> {/* Tape */}
                <img src={projectAppImg} alt="App Sketch" className="w-full h-auto grayscale contrast-125 mix-blend-multiply dark:mix-blend-screen" />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-3xl font-caveat font-bold mb-2">FitTracker App</h3>
                <p className="font-patrick text-xl mb-4">
                  Aplicación móvil para registrar rutinas de ejercicio. Gráficos en tiempo real y sincronización en la nube. 💪
                </p>
                <div className="flex flex-wrap gap-2 mb-6 font-kalam text-lg">
                  <span className="highlighter-yellow">React Native</span>
                  <span className="highlighter-cyan">Firebase</span>
                </div>
                <a href="#" className="inline-flex items-center gap-2 font-kalam text-xl font-bold hover:text-muted-foreground group">
                  Ver código <Github className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="py-24">
          <h2 className="text-4xl font-kalam font-bold mb-12 text-center relative">
            Mi Trayectoria
          </h2>
          
          <div className="relative max-w-2xl mx-auto">
            {/* Hand-drawn line down the middle */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-foreground/20 border-l-2 border-foreground border-dashed"></div>

            {[
              { year: "2023 - Presente", role: "Senior Frontend Developer", company: "TechNova", desc: "Liderando el equipo de frontend. Migramos un monolito a micro-frontends." },
              { year: "2021 - 2023", role: "Full-Stack Developer", company: "Creative Labs", desc: "Desarrollé múltiples aplicaciones web para clientes internacionales." },
              { year: "2019 - 2021", role: "Junior Developer", company: "Startup Inc", desc: "Arreglando bugs, aprendiendo a no romper producción en viernes." },
            ].map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative pl-12 md:pl-0 mb-12 flex ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-background border-2 border-foreground rounded-full -translate-x-1/2 mt-2"></div>
                <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:pl-8' : 'md:pr-8 text-left md:text-right'} relative`}>
                  <div className={`sticky-note p-4 ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                    <span className="font-jetbrains text-sm opacity-70 block mb-1">{exp.year}</span>
                    <h4 className="font-caveat text-2xl font-bold">{exp.role}</h4>
                    <span className="font-kalam text-lg text-red-500 font-bold block mb-2">@ {exp.company}</span>
                    <p className="font-patrick text-xl leading-snug">{exp.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24">
          <div className="sticky-note max-w-lg mx-auto p-8 md:p-12 rotate-[-1deg] shadow-lg">
            <h2 className="text-4xl font-caveat font-bold mb-4 text-center">Déjame una nota</h2>
            <p className="font-patrick text-2xl mb-8 text-center">
              ¿Tienes un proyecto en mente? ¿Quieres saludar? ¡Adelante!
            </p>
            
            <form className="space-y-6 font-patrick text-xl" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block mb-2">Tu nombre:</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b-2 border-foreground/50 focus:border-foreground outline-none px-2 py-1 font-kalam text-lg transition-colors placeholder:text-foreground/30" 
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <label className="block mb-2">Mensaje:</label>
                <textarea 
                  className="w-full bg-transparent border-b-2 border-foreground/50 focus:border-foreground outline-none px-2 py-1 font-kalam text-lg transition-colors resize-none h-32 placeholder:text-foreground/30"
                  placeholder="¡Hola Alex! Me encantó tu portafolio..."
                ></textarea>
              </div>
              <button className="w-full py-3 doodle-border border-2 border-foreground hover:bg-foreground hover:text-background transition-colors font-bold text-2xl font-kalam mt-4">
                Enviar mensaje ✈️
              </button>
            </form>

            <div className="mt-12 pt-8 border-t-2 border-dashed border-foreground/30 flex justify-center gap-6">
              <a href="#" className="hover:scale-110 transition-transform"><Github className="w-8 h-8" /></a>
              <a href="#" className="hover:scale-110 transition-transform"><Linkedin className="w-8 h-8" /></a>
              <a href="#" className="hover:scale-110 transition-transform"><Twitter className="w-8 h-8" /></a>
              <a href="#" className="hover:scale-110 transition-transform"><Mail className="w-8 h-8" /></a>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-8 text-center font-patrick text-lg opacity-60">
        <p>Diseñado a mano con ☕ por Alex Rivera © {new Date().getFullYear()}</p>
        <p>No se maltrataron cuadernos reales en la creación de esta web.</p>
      </footer>
    </div>
  );
}