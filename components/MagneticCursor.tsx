
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MagneticCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [targetDimensions, setTargetDimensions] = useState({ width: 24, height: 24, borderRadius: "50%", xOffset: 0, yOffset: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If not snapping to an element, follow the mouse center
      if (!isHovering) {
        mouseX.set(e.clientX - 12);
        mouseY.set(e.clientY - 12);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-magnetic]');
      if (target) {
        const { width, height, top, left } = target.getBoundingClientRect();
        
        setIsHovering(true);
        // Grow to cover the element plus a small padding
        setTargetDimensions({ 
          width: width + 12, 
          height: height + 12, 
          borderRadius: "16px",
          xOffset: -6,
          yOffset: -6
        });
        
        mouseX.set(left - 6);
        mouseY.set(top - 6);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-magnetic]');
      if (target) {
        setIsHovering(false);
        setTargetDimensions({ width: 24, height: 24, borderRadius: "50%", xOffset: 0, yOffset: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isHovering]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[1000] border border-cyan-400 mix-blend-screen hidden lg:block"
      style={{
        x: cursorX,
        y: cursorY,
        width: targetDimensions.width,
        height: targetDimensions.height,
        borderRadius: targetDimensions.borderRadius,
      }}
      animate={{
        backgroundColor: isHovering ? "rgba(34, 211, 238, 0.15)" : "transparent",
        boxShadow: isHovering ? "0 0 20px rgba(34, 211, 238, 0.4)" : "0 0 0px rgba(34, 211, 238, 0)",
      }}
      transition={{
        backgroundColor: { duration: 0.2 },
        boxShadow: { duration: 0.2 },
        borderRadius: { duration: 0.3 }
      }}
    />
  );
};

export default MagneticCursor;
