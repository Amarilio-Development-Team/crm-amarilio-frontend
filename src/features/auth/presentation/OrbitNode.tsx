'use client';

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';

let activeNodesCount = 0;

interface OrbitNodeProps {
  src: string | StaticImageData;
  alt: string;
  title: string;
  positionClasses: string;
  imageContainerClasses?: string;
}

export default function OrbitNode({ src, alt, title, positionClasses, imageContainerClasses = 'p-2' }: OrbitNodeProps) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    let isCurrentlyActive = false;
    let activeTimer: NodeJS.Timeout;
    let nextTimer: NodeJS.Timeout;

    const triggerHighlight = () => {
      if (activeNodesCount >= 2) {
        nextTimer = setTimeout(triggerHighlight, 3000);
        return;
      }

      activeNodesCount++;
      isCurrentlyActive = true;
      setIsHighlighted(true);

      activeTimer = setTimeout(() => {
        setIsHighlighted(false);
        activeNodesCount--;
        isCurrentlyActive = false;
      }, 7000);

      const nextDelay = Math.random() * 8000 + 12000;
      nextTimer = setTimeout(triggerHighlight, nextDelay);
    };

    const initialTimer = setTimeout(triggerHighlight, Math.random() * 5000 + 1000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(activeTimer);
      clearTimeout(nextTimer);
      if (isCurrentlyActive) {
        activeNodesCount--;
      }
    };
  }, []);

  return (
    <div className={`absolute ${positionClasses}`}>
      <div
        className={`group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all duration-500 ease-out ${isHighlighted ? 'z-10 scale-125 shadow-yellow-500/30 ring-2 ring-yellow-400' : 'z-0 hover:scale-110 hover:ring-1 hover:ring-gray-200'}`}
      >
        <div
          className={`absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-md transition-all duration-300 [[data-theme=black]_&]:bg-white [[data-theme=black]_&]:text-gray-900 ${isHighlighted ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}
        >
          {title}
          <div className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-gray-900 [[data-theme=black]_&]:bg-white"></div>
        </div>

        <div className={`flex h-full w-full items-center justify-center ${imageContainerClasses}`}>
          <Image src={src} alt={alt} className="object-contain" />
        </div>
      </div>
    </div>
  );
}
