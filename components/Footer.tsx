"use client";

export default function Footer() {
  return (
    <section>
      <div className="flex flex-col gap-4 lg:px-6 mt-16">
        <p className="text-xs text-start text-muted-foreground">
          Built with{" "}
          <a className="text-foreground" href="https://nextjs.org/">
            Next.js
          </a>
          ,{" "}
          <a className="text-foreground" href="https://tailwindcss.com/">
            Tailwind CSS
          </a>{" "}
          and{" "}
          <a className="text-foreground" href="https://ui.shadcn.com/">
            Shadcn/ui
          </a>
          , deployed with{" "}
          <a className="text-foreground" href="https://vercel.com/">
            Vercel
          </a>
          .
        </p>
      </div>
    </section>
  );
}
