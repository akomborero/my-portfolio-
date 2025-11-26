"use client";
/* eslint-disable */

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 ">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest lg:sr-only">
          About
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-start text-sm text-muted-foreground lg:px-6">
          I’m a <span className="text-white">full-stack developer</span> passionate about creating <span className="text-white">clean</span>,{' '}
          <span className="text-white">accessible</span>, and high-performing digital experiences. I enjoy blending thoughtful design with solid engineering to build products that feel intuitive, reliable, and enjoyable to use.
        </p>

        <p className="text-start text-sm text-muted-foreground lg:px-6">
          I focus on delivering seamless{' '}
          <span className="text-white">user experiences</span> while ensuring every part of a product — from frontend to backend — is crafted with care and precision.
        </p>

        <p className="text-start text-sm text-muted-foreground lg:px-6">
          Throughout my journey, I’ve worked in collaborative environments that have strengthened my approach to{' '}
          <span className="text-white">problem-solving</span>, product thinking, and user-centered development. I value clean architecture, clarity, and building products that genuinely help people.
        </p>

        <p className="text-start text-sm text-muted-foreground lg:px-6">
          Outside of development, I spend my time learning, exploring{' '}
          <span className="text-white">creativity</span>, and improving myself both personally and professionally. I enjoy staying curious and continuously leveling up in everything I do.
        </p>
      </div>
    </section>
  );
}
