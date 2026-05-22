import { ArrowLeft, Construction, Github } from "lucide-react";

export default function Catlink() {
  return (
    <main className="min-h-screen w-full px-6 py-14 text-foreground sm:px-10 sm:py-20">
      <section className="mx-auto max-w-4xl">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 border-4 border-border bg-card px-4 py-2 font-archivo text-sm font-black uppercase text-card-foreground transition-colors hover:bg-[#18a0fb] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al portfolio
        </a>

        <div className="relative overflow-hidden border-4 border-border bg-card p-8 text-card-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] sm:p-12 dark:shadow-[16px_16px_0px_0px_rgba(0,0,0,0.55)]">
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-border bg-[#ffc700] px-3 py-1 font-caveat text-2xl font-bold text-black">
            <Construction className="h-5 w-5" />
            Catlink en desarrollo
          </div>

          <h1 className="mb-4 text-4xl font-archivo font-black uppercase sm:text-6xl">
            Catlink
          </h1>

          <p className="max-w-2xl font-patrick text-2xl leading-relaxed text-muted-foreground">
            Esta página estará disponible pronto. Estoy trabajando en la versión pública
            del proyecto para que puedas ver el flujo completo de catálogo, pedidos y
            administración.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/esam-dev/catlink"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-4 border-border bg-[#18a0fb] px-6 py-3 font-archivo text-lg font-black uppercase text-white transition-colors hover:bg-card hover:text-card-foreground"
            >
              Ver código
              <Github className="h-5 w-5" />
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 border-4 border-border bg-transparent px-6 py-3 font-archivo text-lg font-black uppercase text-card-foreground transition-colors hover:bg-[#29c46a] hover:text-black"
            >
              Seguir explorando
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}