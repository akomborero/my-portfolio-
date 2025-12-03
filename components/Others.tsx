"use client";

import Image from "next/image";

const otherItems = [
  {
    date: "2025",
    title: "First Mock Item",
    description:
      "Empowered 800+ youth with vital coding skills; bridged the digital divide.",
   imagePath: "/uncommon.jpg",
    link: "https://uncommon.org/",
  },
  {
    date: "2025",
    title: "Second Mock Item",
    description:
      "Hackathon winner (GDG Harare) for high-impact solution and rapid prototyping.",
    imagePath: "https://i.pinimg.com/736x/90/44/a6/9044a634e09b2a633ff73efad0fdf470.jpg",
    link: "https://gdg.community.dev/gdg-harare/",
  },
];

export default function Others() {
  return (
    <section id="others" className="scroll-mt-16 lg:mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:hidden">
        <h2 className="text-sm font-bold uppercase tracking-widest">Others</h2>
      </div>
      <div className="flex flex-col gap-8">
        {otherItems.map((item, index) => (
          <a key={index} href={item.link} className="group">
            <div className="flex items-start gap-4">
              <div>
                <Image
                  src={item.imagePath}
                  alt={`Image for ${item.title}`}
                  width={80}
                  height={50}
                  className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs uppercase text-muted-foreground">{item.date}</p>
                <p className="text-xs text-slate-300">{item.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}