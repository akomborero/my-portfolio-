"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoveUpRight } from "lucide-react";

const jobProjects = [
  {
    imagePath: "/vela.avif",
    title: "Vela Exchange - Product Design",
    description:
      " implementing design systems and processes to launch flagship features like Duels, Accounts, Loyalty Tiers, and Notification Tray and System.",
    skills: [
      "Product Design",
      "UI/UX Design",
      "Design System",
      "Design Strategy",
      "Vercel",
      "Figma",
    ],
    link: "https://vela.exchange",
  },
  {
    imagePath: "/l3x.avif",
    title: "L3X Network - Founding Product Design",
    description:
      "L3X Network is a Layer 3 interoperability blockchain designed to provide institutions, developers, and users with secure, compliant, and efficient access to decentralized finance (DeFi) markets. My role involved founding and leading the design team, mapping UX, and designing the protocol's Landing Page and Interfaces for the Bridge, Trading, Swap, and Staking platforms.",
    skills: [
      "Product Design",
      "UI/UX Design",
      "Design System",
      "Design Strategy",
      "Vercel",
      "Figma",
    ],
    link: "https://l3x.com",
  },
  {
    imagePath: "/swoop-og-banner.webp",
    title: "Swoop Exchange - Landing Page",
    description:
      "Swoop's landing page highlights the platform's use cases and solutions. Swoop Exchange is a Meta-DEX Aggregator that automatically sources, ranks and routes quotes from the best DEX Aggregators and Bridges, ensuring the best prices for on-chain and cross-chain swaps. Swoop Exchange has achieved millions in USD volume and currently has around 4000 monthly users with 0 paid marketing.",
    skills: [
      "Next.js",
      "Framer",
      "Shadcn/ui",
      "Typescript",
      "JavaScript",
      "Vercel",
      "Figma",
    ],
    link: "https://swoop.exchange",
  },
  {
    imagePath: "/app-front-1.png",
    title: "Swoop Exchange - Application Design",
    description:
      "Swoop Exchange is a next generation Meta Decentralized Exchange and Bridge Aggregator. By Aggregating the Aggregators, Bridges, and Liquidity across chains, and off-chain it solves protocol and liquidity fragmentation, significantly improving UX. Provides access to: 450,000+ Tokens, 7+ Aggregators, 13+ Bridges, 50+ DEXs, 280+ Liquidity Sources and 16+ Blockchains.",
    skills: [
      "Next.js",
      "Typescript",
      "JavaScript",
      "MUI",
      "Tailwind CSS",
      "Vercel",
      "Figma",
    ],
    link: "https://app.mtopswap.com",
  },
  
 
 
  {
    imagePath: "/vela.avif",
    title: "Monecuer Company Website",
    description: "Designed and developed a professional, responsive website for a company to showcase services, improve user engagement, and enhance online presence.",
    skills: ["Next.js", "Tailwind CSS", "Node.js"],
    link: "https://monecuer.vercel.app/",
  },
  {
    imagePath: "https://i.pinimg.com/736x/6c/ae/f9/6caef9dd8fae6216ff47e4cdfab7f254.jpg",
    title: "Wedding Planner",
    description: "An all-in-one platform designed to simplify wedding planning, from guest list management and budget tracking to vendor coordination.",
    skills: ["Next.js","Node.js", "Firebase", "Tailwind CSS"],
    link: "https://wedding-planner-iota-ebon.vercel.app/",
    imageWidth: 200,
    imageHeight: 150,
  },
  {
    imagePath: "https://i.pinimg.com/736x/d7/9e/65/d79e65ae30f714c147e9e8a0e5ad26ce.jpg",
    title: "SnapEvent",
    description: "A dynamic event management platform for seamless planning, promotion, and execution of events.",
    skills: ["React", "Node.js", "CSS", " PostgreSQL"],
    link: "https://snap-event-henna.vercel.app/event-gallery/3c020fe2-37c3-4463-98a5-be1e35e319bd",
    imageWidth: 200,
    imageHeight: 150,
  },
  {
    imagePath: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?fit=crop&w=400&q=80",
    title: "Payslip Generator",
    description: "An app to generate professional payslips instantly from employee data. Export as PDF or email directly.",
    skills: ["Python", "Pandas", "PDFKit"],
    link: "https://payslip-generator-akomborero.vercel.app/",
  },
  {
    imagePath: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=400&q=80",
    title: "WebScraper",
    description: "Fetch, parse, and analyze website data automatically for reporting and research purposes.",
    skills: ["Python", "BeautifulSoup", "Requests"],
    link: "#",
  }
];

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-16 lg:mt-16">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest lg:sr-only">
          Projects
        </h2>
      </div>
     
      <>
        {jobProjects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:cursor-pointer"
          >
            <Card className="group lg:p-6 mb-4 flex flex-col lg:flex-row w-full min-h-fit gap-0 lg:gap-5 border-transparent hover:border dark:lg:hover:border-t-blue-900 dark:lg:hover:bg-slate-800/50 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg lg:hover:bg-slate-100/50 lg:hover:border-t-blue-200">
              <CardHeader className="h-full w-full lg:w-1/3 mb-4 p-0">
                <Image
                  src={project.imagePath}
                  alt={`Screenshot of ${project.title}`}
                  width={project.imageWidth || 1920}
                  height={project.imageHeight || 1080}
                  priority
                  className="bg-[#141414] mt-2 border border-muted-foreground rounded-[0.5rem]"
                />
              </CardHeader>
              <CardContent className="flex flex-col p-0 w-full lg:w-2/3">
                <p className="text-primary font-bold text-sm">
                  {project.title}{" "}
                  <MoveUpRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" />
                </p>
                <CardDescription className="py-3 text-muted-foreground text-xs">
                  {project.description}
                </CardDescription>
                <CardFooter className="p-0 flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <Badge key={index} className="text-green-600 bg-green-950 border-green-950">{skill}</Badge>
                  ))}
                </CardFooter>
              </CardContent>
            </Card>
          </a>
        ))}
      </>
    </section>
  );
}
