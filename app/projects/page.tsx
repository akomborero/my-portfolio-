"use client";

import React from 'react';
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
// Assuming jobProjects is an array of objects structured like the example you provided.
import { jobProjects } from "@/lib/projects"; 

// --- Helper Components for Design Match & Type Safety ---

// External Link Icon 
const ExternalLinkArrow = () => (
  <MoveUpRight className="h-4 w-4 ml-1 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" />
);

// Technology Tag (Fixes TypeScript Error 7031 by explicitly defining 'children' type)
const TechTag = ({ children }: { children: React.ReactNode }) => (
  // Styling matched to the specific dark background, rounded, small text
  <span className="inline-flex items-center rounded-full bg-[#182a3a] px-3 py-1 text-xs font-medium text-cyan-400">
    {children}
  </span>
);

// --- Main Component ---
export default function ProjectsArchive() {
  const pageBg = 'bg-[#121422]'; 
  
  // CSS Grid definition for the table columns
  const gridClasses = 'grid grid-cols-1 md:grid-cols-[60px_1fr_120px_2.5fr_100px] gap-4 py-3';

  // Use type assertion (as any) here to suppress errors related to missing 'year' and 'company'
  // properties on the project objects, allowing us to use default values.
  const typedProjects: any = jobProjects; 

  return (
    <div className={`${pageBg} min-h-screen text-gray-300 p-8 md:p-12`}>
      <div className="max-w-6xl mx-auto px-4 md:px-0">
        
        {/* --- Header Section --- */}
        <header className="mb-12 pt-8">
          {/* 'Brittany Chiang' Title/Context */}
          <p className="text-sm font-light text-cyan-400/80 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            MAKOMBORERO CHIDZIVA
          </p>
          {/* 'All Projects' Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            All Projects
          </h1>
        </header>
        
        <hr className="hidden md:block border-gray-700/50" />

        {/* --- Table Header (Column Names) --- */}
        <div className={`text-xs font-medium text-gray-500 border-b border-gray-700/50 ${gridClasses} hidden md:grid pb-3`}>
          <div className="uppercase">Year</div>
          <div className="uppercase">Project</div>
          <div className="uppercase">Made at</div>
          <div className="uppercase">Built with</div>
          <div className="uppercase">Link</div>
        </div>

        {/* --- Project List Rows --- */}
        <div>
          {typedProjects.map((project: any, index: number) => (
            <a
              key={index}
              href={project.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block w-full transition-colors duration-200 cursor-pointer py-4 border-b border-gray-800 hover:bg-gray-800/30 ${gridClasses} items-center`}
            >
              
              {/* 1. Year (Uses 'N/A' if 'year' is missing in data, resolving Error 2339) */}
              <div className="text-sm text-gray-500">
                {project.year || "N/A"} 
              </div>

              {/* 2. Project Name (Uses 'title' from your data) */}
              <div className="font-semibold text-white">
                {project.title}
              </div>

              {/* 3. Made At (Uses 'Upstatement' if 'company' is missing, resolving Error 2339) */}
              <div className="text-sm text-gray-400 hidden md:block">
                {project.company || "Upstatement"} 
              </div>

              {/* 4. Built With (Uses 'skills' from your data) */}
              <div className="flex flex-wrap items-center gap-2">
                {project.skills && project.skills.map((skill: string, i: number) => (
                  <TechTag key={i}>{skill}</TechTag>
                ))}
              </div>

              {/* 5. Link (Extracts domain from the URL) */}
              <div className="flex items-center text-sm font-light text-cyan-400/80 group-hover:text-cyan-300">
                {/* Extracts domain from the link (e.g., 'https://l3x.com' -> 'l3x.com') */}
                {project.link ? project.link.replace(/^(https?:\/\/)?(www\.)?/i, '').split('/')[0] : "Link"} 
                <ExternalLinkArrow />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}