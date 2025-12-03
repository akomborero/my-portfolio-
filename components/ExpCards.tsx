"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoveRight } from "lucide-react";

const jobPositions = [

  {
    timeline: "2025 — PRESENT",
    currentPosition: "SOFTWARE ENGENEER",
    place: "ZOMAC DIGITAL",
    previousPositions: [""],
    description:
      "Contributing to the development and growth of digital products at Zomac Digital. My role involves helping shape the technical direction of projects, ensuring high-quality engineering standards, and working hands-on across both frontend and backend to deliver polished, reliable, and scalable solutions ready for market.",
      
    skills: [
      "JavaScript",
      "Product Design",
      "UI/UX Design",
      "Design Systems",
      "Design Strategy",
      "PHP",
      "React",
      "Postman",
      "insomnia",
      "Flutter",
      "API",
    ],

  },

  
  {
    timeline: "JAN 2025 — OCT 2025",
    currentPosition: "Youth Coding Volunteer",
    place: "Primary Schools",
    previousPositions: [""],
    description:
      "I volunteered to help primary school children in the Mbare and Warren Park areas by teaching them basic ICT skills and Scratch programming. These children had no access to laptops or other resources to learn technology. My goal was to provide them with foundational knowledge that could spark their interest in tech and open up future opportunities",
       skills: [
     "Teaching",
     "Mentorship",
      "Resourceful Problem-Solving",
      "Scratch Programming",
      "Curriculum Development",
      
    ],
  },
  
];

export default function ExpCard() {
  return (
   
    <section id="experience" className="scroll-mt-16 lg:mt-16">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest lg:sr-only">
          Experience
        </h2>
      </div>
      <div className="flex flex-col gap-16 lg:px-6">
        {jobPositions.map((job, index) => (
          <Card
            key={index}
            className="lg:p-6 flex flex-col lg:flex-row w-full min-h-fit gap-1 lg:gap-5 border-transparent hover:border dark:lg:hover:border-t-blue-900 dark:lg:hover:bg-slate-800/50 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg lg:hover:bg-slate-100/50 lg:hover:border-t-blue-200"
          >
            <CardHeader className="h-full w-full p-0">
              <CardTitle className="text-xs text-slate-400 whitespace-nowrap">
               {job.timeline}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col p-0">
              <p className="text-foreground font-bold text-sm">
                {job.currentPosition} • {job.place}
              </p>
              {job.previousPositions.map((position, index) => (
                <p key={index} className="text-slate-400 text-xs font-bold">
                  {position}
                </p>
              ))}
              <CardDescription className="py-3 text-muted-foreground text-xs">
                {job.description}
              </CardDescription>
              <CardFooter className="p-0 flex flex-wrap gap-2">
                {job.skills?.map((skill, index) => (
                 <Badge key={index} className="text-green-600 bg-green-950 border-green-950">{skill}</Badge>
                ))}
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
     <div className="lg:px-12 mt-12">
 <a
   href="/MAKOMBORERO CHIDZIVA RESUME.pdf" // *** UPDATED HREF HERE ***
   target="_blank"
   rel="noopener noreferrer"
   className="inline-flex items-center font-medium leading-tight text-foreground group"
 >
   <span className="border-b border-transparent pb-px transition hover:border-primary motion-reduce:transition-none">
     View Full Resume
   </span>
   <MoveRight className="ml-1 inline-block h-5 w-5 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
 </a>
    </div>
    </section>
  );
}
