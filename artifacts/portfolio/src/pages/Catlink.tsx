import { ArrowLeft, Github, Code2 } from "lucide-react";

export default function Catlink() {
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-6 py-20">
      <div className="card-minimal max-w-lg w-full p-10 shadow-[0_32px_64px_-32px_rgb(0_0_0/0.15)] animate-fade-up">
        <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-6">
          <Code2 className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="eyebrow mb-3">Coming soon</p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Catlink</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          This page will be available soon. I'm working on the public version
          of the project so you can see the complete catalog, orders, and
          administration flow.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/esam-dev/catlink"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Github className="w-4 h-4" /> View Code
          </a>
          <a href="/" className="btn-ghost">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
