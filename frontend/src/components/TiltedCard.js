import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltedCard = ({
  imageSrc,
  altText = "Card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "300px",
  imageHeight = "300px",
  imageWidth = "300px",
  rotateAmplitude = 12,
  scaleOnHover = 1.2,
  showMobileWarning = false,
  showTooltip = true,
  displayOverlayContent = true,
  overlayContent = null,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="relative inline-block">
      {showMobileWarning && (
        <div className="md:hidden text-sm text-gray-600 dark:text-gray-400 mb-2 text-center">
          Hover effect works best on desktop
        </div>
      )}
      
      <motion.div
        ref={ref}
        className={`relative cursor-pointer ${className}`}
        style={{
          width: containerWidth,
          height: containerHeight,
          perspective: "1000px"
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: scaleOnHover }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.div
          className="relative w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Card Image */}
          <motion.img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-cover"
            style={{
              width: imageWidth,
              height: imageHeight
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Overlay Content */}
          {displayOverlayContent && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 text-white">
                {overlayContent ? (
                  <div className="tilted-card-overlay">
                    {overlayContent}
                  </div>
                ) : (
                  <p className="font-semibold text-lg">{captionText}</p>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 pointer-events-none"
            animate={{ 
              opacity: isHovered ? 1 : 0,
              background: isHovered 
                ? `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`
                : `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* 3D Border Effect */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: isHovered 
                ? `linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(16, 185, 129, 0.3) 100%)`
                : "transparent",
              transform: "translateZ(1px)"
            }}
            animate={{
              boxShadow: isHovered 
                ? "0 25px 50px rgba(59, 130, 246, 0.25)"
                : "0 10px 25px rgba(0, 0, 0, 0.1)"
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
      
      {/* Tooltip */}
      {showTooltip && isHovered && (
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg z-10 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          {captionText || altText}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TiltedCard;
