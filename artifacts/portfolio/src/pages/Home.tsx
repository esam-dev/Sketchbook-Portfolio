import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowMarker, StarMarker, CircleMarker, UnderlineMarker, RealMarkerGraphic } from "@/components/Doodles";
import { Github, Linkedin, Mail, Twitter, Code2, Terminal, Database, Server, Smartphone, Monitor } from "lucide-react";
import { SiPython, SiJavascript, SiReact, SiNodedotjs, SiTailwindcss, SiPostgresql } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import portraitImg from "@/assets/images/portrait.png";
import projectAppImg from "@/assets/images/project-app.png";
import projectEcommerceImg from "@/assets/images/project-ecommerce.png";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="min-h-screen w-full overflow-hidden text-foreground selection:bg-[hsl(206_94%_53%/0.5)]">
      
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 pointer-events-none flex justify-between items-center">
        <div className="pointer-events-auto">
          <a href="#hero" className="font-archivo text-3xl font-black tracking-tighter hover:text-[#18a0fb] transition-colors">
            EO.
          </a>
        </div>
        <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-archivo text-lg bg-background/90 sm:bg-transparent p-4 sm:p-0 rounded-xl sm:rounded-none border-4 border-foreground sm:border-none pointer-events-auto shadow-xl sm:shadow-none uppercase">
          <li><a href="#about" className="hover:text-[#ffc700] hover:scale-110 inline-block transition-transform">Sobre mí</a></li>
          <li><a href="#skills" className="hover:text-[#ff4757] hover:scale-110 inline-block transition-transform">Habilidades</a></li>
          <li><a href="#projects" className="hover:text-[#29c46a] hover:scale-110 inline-block transition-transform">Proyectos</a></li>
          <li><a href="#contact" className="hover:text-[#18a0fb] hover:scale-110 inline-block transition-transform">Contacto</a></li>
        </ul>
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
            <div className="absolute top-10 left-[10%] hidden md:block rotate-[-15deg]">
              <div className="font-caveat text-3xl text-[#ff4757] mb-2 font-bold">¡Hola! Soy</div>
              <ArrowMarker className="w-20 h-20 text-[#ff4757] rotate-[120deg]" delayOrder={1} />
            </div>

            <h1 className="text-7xl sm:text-9xl font-archivo font-black uppercase tracking-tight leading-none">
              ELÍAS ORTIZ
            </h1>
            
            <div className="mt-4 relative inline-block">
              <h2 className="text-3xl sm:text-5xl font-archivo font-bold text-transparent" style={{ WebkitTextStroke: "2px currentColor" }}>
                DESARROLLADOR DE SOFTWARE
              </h2>
              <UnderlineMarker className="absolute -bottom-4 left-0 w-full text-[#18a0fb]" delayOrder={2} />
            </div>

            <div className="absolute top-20 right-[10%] hidden md:block rotate-[10deg]">
              <div className="font-caveat text-2xl text-[#29c46a] mb-2 font-bold whitespace-nowrap">Full-Stack Mágico</div>
              <ArrowMarker className="w-16 h-16 text-[#29c46a] rotate-[60deg]" delayOrder={3} />
            </div>

            <div className="absolute bottom-20 left-[20%] hidden md:block rotate-[-5deg]">
              <ArrowMarker className="w-20 h-20 text-[#ffc700] rotate-[-45deg]" delayOrder={4} />
              <div className="font-caveat text-3xl text-[#ffc700] mt-2 font-bold">Apasionado</div>
            </div>

            <div className="mt-20 flex flex-wrap justify-center gap-6 font-archivo text-xl uppercase">
              <a href="#projects" className="px-8 py-4 bg-[#ffc700] text-black border-4 border-black hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-black">
                Ver mis proyectos
              </a>
              <a href="#contact" className="px-8 py-4 bg-transparent border-4 border-black hover:bg-[#18a0fb] hover:text-white hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-black">
                Contactar
              </a>
            </div>
            
            <motion.div style={{ y: y1 }} className="absolute -bottom-10 right-[20%] rotate-[-20deg] z-50">
              <RealMarkerGraphic className="w-48 h-auto drop-shadow-xl" />
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
              className="w-full md:w-1/2 relative"
            >
              <div className="relative rotate-[-3deg] p-4 bg-white marker-border shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <img src={portraitImg} alt="Elías Ortiz" className="w-full h-auto grayscale contrast-125 border-2 border-black" />
                <div className="absolute -bottom-6 -right-6 bg-[#ff5e93] text-black px-4 py-2 font-caveat text-3xl font-bold rotate-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  ¡Yo! 🚀
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
                SOBRE MÍ
                <CircleMarker className="absolute -top-4 -left-6 w-[120%] h-[120%] text-[#ffc700] opacity-80" delayOrder={1} />
              </h2>
              <div className="space-y-6 font-patrick text-3xl leading-relaxed">
                <p>
                  Soy un desarrollador que convierte <span className="highlighter-cyan font-bold">caos en código</span>.
                </p>
                <p>
                  Con sólida experiencia en <span className="highlighter-yellow font-bold">arquitectura de software</span> y un amor profundo por construir interfaces fluidas. Me enfoco en rendimiento y escalabilidad.
                </p>
                <p>
                  Aficionado a los diagramas de arquitectura, el café fuerte y el código limpio.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SKILLS SECTION - MIND MAP */}
        <section id="skills" className="py-32">
          <div className="text-center mb-24 relative">
            <h2 className="text-5xl sm:text-7xl font-archivo font-black uppercase relative inline-block">
              HABILIDADES
              <UnderlineMarker className="absolute -bottom-4 left-0 w-full text-[#29c46a]" delayOrder={0} />
            </h2>
            <div className="font-caveat text-3xl text-muted-foreground mt-4 font-bold">(Lo que hago mejor)</div>
          </div>

          <div className="relative w-full max-w-4xl mx-auto aspect-square sm:aspect-video flex items-center justify-center">
            
            {/* Center Core */}
            <div className="absolute z-20 flex flex-col items-center justify-center p-8 bg-white border-4 border-black rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="font-archivo text-2xl font-black uppercase">Core</span>
            </div>

            {/* Python - Top Left */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute top-[10%] left-[15%] sm:top-[20%] sm:left-[20%] z-20 flex flex-col items-center group cursor-pointer"
            >
              <div className="p-6 bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-2 group-hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#3776AB]/10">
                <SiPython className="w-16 h-16 text-[#3776AB]" />
              </div>
              <span className="font-archivo text-xl font-bold mt-4 bg-white px-2 border-2 border-black">PYTHON</span>
            </motion.div>

            {/* Java - Top Right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute top-[10%] right-[15%] sm:top-[20%] sm:right-[20%] z-20 flex flex-col items-center group cursor-pointer"
            >
              <div className="p-6 bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-2 group-hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#f89820]/10">
                <FaJava className="w-16 h-16 text-[#f89820]" />
              </div>
              <span className="font-archivo text-xl font-bold mt-4 bg-white px-2 border-2 border-black">JAVA</span>
            </motion.div>

            {/* JavaScript - Bottom Center */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-[10%] left-1/2 -translate-x-1/2 sm:bottom-[15%] z-20 flex flex-col items-center group cursor-pointer"
            >
              <div className="p-6 bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-2 group-hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#F7DF1E]/10">
                <SiJavascript className="w-16 h-16 text-[#F0DB4F]" />
              </div>
              <span className="font-archivo text-xl font-bold mt-4 bg-white px-2 border-2 border-black">JAVASCRIPT</span>
            </motion.div>

            {/* Connecting Arrows */}
            <div className="absolute inset-0 pointer-events-none hidden sm:block">
              {/* Center to Python */}
              <ArrowMarker className="absolute top-[35%] left-[30%] w-40 h-40 text-black rotate-[-160deg]" wobbly delayOrder={1} />
              {/* Center to Java */}
              <ArrowMarker className="absolute top-[35%] right-[30%] w-40 h-40 text-black rotate-[-20deg]" wobbly delayOrder={2} />
              {/* Center to JS */}
              <ArrowMarker className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-32 h-40 text-black rotate-[90deg]" wobbly delayOrder={3} />
            </div>

            {/* Secondary Skills Scattered */}
            <div className="absolute top-0 left-[45%] text-[#18a0fb] hover:scale-125 transition-transform"><SiReact className="w-10 h-10" /></div>
            <div className="absolute bottom-[40%] left-[10%] text-[#29c46a] hover:scale-125 transition-transform"><SiNodedotjs className="w-10 h-10" /></div>
            <div className="absolute bottom-[40%] right-[10%] text-[#336791] hover:scale-125 transition-transform"><SiPostgresql className="w-10 h-10" /></div>
            <div className="absolute top-[50%] right-[5%] text-[#06B6D4] hover:scale-125 transition-transform"><SiTailwindcss className="w-10 h-10" /></div>
            
            <div className="absolute top-1/4 left-[5%] font-caveat text-xl font-bold rotate-[-15deg] text-[#ff4757]">Backend!</div>
            <div className="absolute bottom-1/4 right-[15%] font-caveat text-xl font-bold rotate-[15deg] text-[#18a0fb]">Frontend!</div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-32">
          <h2 className="text-5xl sm:text-6xl font-archivo font-black uppercase mb-20 relative inline-block">
            PROYECTOS
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
                <img src={projectEcommerceImg} alt="Proyecto E-Commerce" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-black" />
              </div>
              <div className="w-full md:w-1/2 relative">
                <h3 className="text-4xl font-archivo font-black uppercase mb-4">Plataforma Logística</h3>
                <p className="font-patrick text-2xl mb-6">
                  Sistema de gestión de inventario de alto rendimiento. Procesamiento de miles de transacciones por segundo.
                </p>
                <div className="flex flex-wrap gap-3 mb-8 font-archivo text-sm font-bold uppercase">
                  <span className="bg-[#3776AB] text-white px-3 py-1 border-2 border-black">Python</span>
                  <span className="bg-[#f89820] text-black px-3 py-1 border-2 border-black">Java</span>
                  <span className="bg-white text-black px-3 py-1 border-2 border-black">PostgreSQL</span>
                </div>
                <a href="#" className="inline-flex items-center gap-2 font-archivo text-xl font-black uppercase bg-[#18a0fb] text-white px-6 py-3 border-4 border-black hover:bg-white hover:text-black transition-colors">
                  Ver código <Github className="w-6 h-6" />
                </a>
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
                <img src={projectAppImg} alt="Proyecto App" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-black" />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-4xl font-archivo font-black uppercase mb-4">Dashboard Analítico</h3>
                <p className="font-patrick text-2xl mb-6">
                  Aplicación interactiva para visualización de datos en tiempo real.
                </p>
                <div className="flex flex-wrap gap-3 mb-8 font-archivo text-sm font-bold uppercase">
                  <span className="bg-[#F0DB4F] text-black px-3 py-1 border-2 border-black">JavaScript</span>
                  <span className="bg-[#00d8ff] text-black px-3 py-1 border-2 border-black">React</span>
                </div>
                <a href="#" className="inline-flex items-center gap-2 font-archivo text-xl font-black uppercase bg-[#ff5e93] text-black px-6 py-3 border-4 border-black hover:bg-black hover:text-white transition-colors">
                  Ver código <Github className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="py-32">
          <h2 className="text-5xl sm:text-6xl font-archivo font-black uppercase mb-16 text-center">
            EXPERIENCIA
          </h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Bold Timeline Line */}
            <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-2 bg-black -translate-x-1/2 rounded-full"></div>

            {[
              { year: "2023 - Presente", role: "Ingeniero de Software Senior", company: "TechCorp", desc: "Liderando desarrollo backend con Python y Java." },
              { year: "2020 - 2023", role: "Desarrollador Full-Stack", company: "Innovate Solutions", desc: "Desarrollo de interfaces con React y APIs en Node." },
              { year: "2018 - 2020", role: "Desarrollador Junior", company: "StartUp Factory", desc: "Mantenimiento de sistemas heredados e inicio en desarrollo web." },
            ].map((exp, i) => (
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
            
            <h2 className="text-5xl font-archivo font-black uppercase mb-6 text-center">CONTACTO</h2>
            <p className="font-patrick text-3xl mb-10 text-center font-bold">
              ¿Listo para empezar? <span className="highlighter-yellow">Hablemos.</span>
            </p>
            
            <form className="space-y-6 font-archivo text-xl font-bold uppercase" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block mb-2">Nombre</label>
                <input 
                  type="text" 
                  className="w-full bg-background border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-[#18a0fb] transition-all" 
                  placeholder="Tu Nombre"
                />
              </div>
              <div>
                <label className="block mb-2">Mensaje</label>
                <textarea 
                  className="w-full bg-background border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-[#18a0fb] transition-all resize-none h-40"
                  placeholder="¡Hola Elías!..."
                ></textarea>
              </div>
              <button className="w-full py-4 bg-[#29c46a] text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#18a0fb] hover:text-white hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-black text-2xl">
                ENVIAR MENSAJE
              </button>
            </form>

            <div className="mt-12 pt-8 border-t-4 border-black flex justify-center gap-8">
              <a href="#" className="p-3 bg-white border-4 border-black hover:bg-[#18a0fb] hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><Github className="w-8 h-8" /></a>
              <a href="#" className="p-3 bg-white border-4 border-black hover:bg-[#18a0fb] hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><Linkedin className="w-8 h-8" /></a>
              <a href="#" className="p-3 bg-white border-4 border-black hover:bg-[#18a0fb] hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><Twitter className="w-8 h-8" /></a>
              <a href="#" className="p-3 bg-white border-4 border-black hover:bg-[#18a0fb] hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><Mail className="w-8 h-8" /></a>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-10 bg-black text-white text-center font-archivo font-bold uppercase mt-20">
        <p className="text-xl">Diseñado por Elías Ortiz © {new Date().getFullYear()}</p>
        <p className="opacity-50 text-sm mt-2">Pizarra limpia. Código limpio.</p>
      </footer>
    </div>
  );
}