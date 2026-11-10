export default function NotFound() {
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-md animate-fade-up">
        <p className="font-mono text-sm text-muted-foreground tracking-wide mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Page not found
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-10">
          The page you are looking for does not exist in this portfolio.
          It may have been moved or deleted.
        </p>
        <a href="/" className="btn-primary">
          Back to home
        </a>
      </div>
    </div>
  );
}
