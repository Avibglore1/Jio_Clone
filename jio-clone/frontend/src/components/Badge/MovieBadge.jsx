"use client";
import React from 'react';
import { Badge } from "@/components/ui/badge";

function HomeBadge() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className='bg-black text-white px-4 py-3 flex gap-3'>
      <Badge 
        className="cursor-pointer hover:bg-gray-700" 
        onClick={() => scrollToSection('comedy-section')}
      >
        Top Comedy Movies
      </Badge>
      <Badge 
        className="cursor-pointer hover:bg-gray-700" 
        onClick={() => scrollToSection('horror-section')}
      >
        Top Horror Movies
      </Badge>
      <Badge 
        className="cursor-pointer hover:bg-gray-700" 
        onClick={() => scrollToSection('romance-section')}
      >
        Top Romance Movies
      </Badge>
      <Badge 
        className="cursor-pointer hover:bg-gray-700" 
        onClick={() => scrollToSection('action-section')}
      >
        Top Action Movies
      </Badge>
    </div>
  );
}

export default HomeBadge;