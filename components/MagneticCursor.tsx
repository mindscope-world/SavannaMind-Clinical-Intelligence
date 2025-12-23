
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MagneticCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [targetDimensions, setTargetDimensions] = useState({ 
    width: 24, 
    height: 24, 
    borderRadius: "50%"
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Custom spring for a physical, tactile feel
  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) {
        // Center the cursor circle on the actual mouse tip
        mouseX.set(e.clientX - 12);
        mouseY.set(e.clientY - 12);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-magnetic]');
      if (target) {
        const { width, height, top, left } = target.getBoundingClientRect();
        
        setIsHovering(true);
        // Snapping and growing effect
        const padding = 12;
        setTargetDimensions({ 
          width: width + padding, 
          height: height + padding, 
          borderRadius: "14px"
        });
        
        mouseX.set(left - padding / 2);
        mouseY.set(top - padding / 2);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-magnetic]');
      if (target) {
        setIsHovering(false);
        setTargetDimensions({ width: 24, height: 24, borderRadius: "50%" });
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
      className="fixed top-0 left-0 pointer-events-none z-[1000] border-2 border-cyan-400 mix-blend-screen hidden lg:block"
      style={{
        x: cursorX,
        y: cursorY,
        width: targetDimensions.width,
        height: targetDimensions.height,
        borderRadius: targetDimensions.borderRadius,
      }}
      animate={{
        backgroundColor: isHovering ? "rgba(34, 211, 238, 0.1)" : "transparent",
        boxShadow: isHovering ? "0 0 20px rgba(34, 211, 238, 0.3)" : "none",
        scale: isHovering ? 1.02 : 1,
      }}
      transition={{
        backgroundColor: { duration: 0.2 },
        boxShadow: { duration: 0.2 },
        borderRadius: { duration: 0.3 },
        scale: { duration: 0.2 }
      }}
    >
      {/* Precision Core Dot */}
      <motion.div 
        animate={{ opacity: isHovering ? 0 : 1 }}
        className="absolute inset-0 m-auto w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)]"
      />
    </motion.div>
  );
};

export default MagneticCursor;
