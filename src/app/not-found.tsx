import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-wide section-padding text-center">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="heading-section mb-4">Page not found</h1>
      <p className="mx-auto mb-6 max-w-lg text-muted-foreground">
        The page you requested does not exist or may have been moved.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Go home
        </Link>
        <Link
          href="/search"
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Search publications
        </Link>
      </div>
    </div>
  );
}
