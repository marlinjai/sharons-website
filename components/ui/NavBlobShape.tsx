// components/ui/NavBlobShape.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// SVG blob shape component for navigation morphing
// Provides smooth organic transitions between pill and localized extension states
interface NavBlobShapeProps {
  isOpen: boolean;
  dropdownHeight: number;
  centerX: number;
  extensionWidth: number;
  isOnHero?: boolean;
  children?: React.ReactNode;
}

export function NavBlobShape({ isOpen, dropdownHeight, centerX, extensionWidth, isOnHero = true, children }: NavBlobShapeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(920);

  // Measure actual container width for responsive SVG paths
  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Base dimensions for the pill (must match where Navigation places the dropdown)
  // Keep this stable to avoid layout jitter.
  const pillHeight = 104;
  const totalHeight = isOpen ? pillHeight + dropdownHeight : pillHeight;
  const viewBoxWidth = containerWidth;
  const r = pillHeight / 2; // radius for pill ends

  // Localized extension dimensions
  const blobW = Math.max(extensionWidth + 80, 220); // generous width for the blob
  const x1 = Math.max(r + 20, centerX - blobW / 2);
  const x2 = Math.min(viewBoxWidth - r - 20, centerX + blobW / 2);

  // Shared path parameters
  const shoulderR = 32; // smoother shoulders
  const blobR = 32; // rounded corners for the blob

  const getPath = (isExtended: boolean) => {
    const y0 = 0;
    const yP = pillHeight;
    const yB = isExtended ? totalHeight : pillHeight;

    // To ensure smooth morphing, we MUST have the same number of points in both states.
    // In the closed state, we flatten the blob points onto the line y = yP.
    const extOffset = isExtended ? 15 : 0;
    const currentBlobR = isExtended ? blobR : 0;
    const currentShoulderR = isExtended ? shoulderR : 0;

    return `
      M ${r} ${y0}
      L ${viewBoxWidth - r} ${y0}
      C ${viewBoxWidth - r / 2} ${y0} ${viewBoxWidth} ${r / 2} ${viewBoxWidth} ${r}
      C ${viewBoxWidth} ${yP - r / 2} ${viewBoxWidth - r / 2} ${yP} ${viewBoxWidth - r} ${yP}

      L ${x2 + shoulderR} ${yP}
      C ${x2 + shoulderR / 2} ${yP} ${x2} ${yP + extOffset / 5} ${x2} ${yP + extOffset}
      L ${x2} ${yB - currentBlobR}
      C ${x2} ${yB - currentBlobR / 2} ${x2 - currentBlobR / 2} ${yB} ${x2 - currentBlobR} ${yB}

      L ${x1 + currentBlobR} ${yB}
      C ${x1 + currentBlobR / 2} ${yB} ${x1} ${yB - currentBlobR / 2} ${x1} ${yB - currentBlobR}
      L ${x1} ${yP + extOffset}
      C ${x1} ${yP + extOffset / 5} ${x1 - shoulderR / 2} ${yP} ${x1 - shoulderR} ${yP}

      L ${r} ${yP}
      C ${r / 2} ${yP} 0 ${yP - r / 2} 0 ${r}
      C 0 ${r / 2} ${r / 2} 0 ${r} ${y0}
      Z
    `.trim();
  };

  const closedPath = getPath(false);
  const openPath = getPath(true);

  const transition = {
    duration: 0.32,
    ease: [0.4, 0, 0.2, 1],
  } as const;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${totalHeight}px` }}>
      {/* SVG for background and border */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${viewBoxWidth} ${totalHeight}`}
        preserveAspectRatio="none"
        style={{ pointerEvents: 'none', overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="nav-blob-clip-path" clipPathUnits="userSpaceOnUse">
            <motion.path
              initial={false}
              animate={{ d: isOpen ? openPath : closedPath }}
              transition={transition}
            />
          </clipPath>
        </defs>

        {/* Fill path with glass background color - adapts to hero/off-hero */}
        <motion.path
          d={isOpen ? openPath : closedPath}
          fill={isOnHero ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.75)"}
          initial={false}
          animate={{
            d: isOpen ? openPath : closedPath,
            fill: isOnHero ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.75)"
          }}
          transition={transition}
        />

        {/* Stroke path for the border - adapts to hero/off-hero */}
        <motion.path
          d={isOpen ? openPath : closedPath}
          fill="none"
          stroke={isOnHero ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.6)"}
          strokeWidth="1.5"
          initial={false}
          animate={{
            d: isOpen ? openPath : closedPath,
            stroke: isOnHero ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.6)"
          }}
          transition={transition}
        />
      </svg>

      {/* Content container with SVG clip applied for backdrop-filter.
         NOTE: Navigation currently doesn't pass children here; this exists for future reuse. */}
      {children ? (
        <div
          className="absolute inset-0"
          style={{
            clipPath: 'url(#nav-blob-clip-path)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            willChange: 'clip-path',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            boxShadow: isOnHero ? '0 8px 32px rgba(0, 0, 0, 0.1)' : '0 4px 24px rgba(0, 0, 0, 0.15)',
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
