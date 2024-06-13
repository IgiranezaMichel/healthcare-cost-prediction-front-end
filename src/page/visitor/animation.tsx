import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingAnimation = (prop:{ text:string, speed:number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + prop.text[currentIndex]);
      currentIndex++;
      if (currentIndex === prop.text.length-1) {
        clearInterval(interval);
      }
    }, prop.speed);

    return () => clearInterval(interval);
  }, [prop.text, prop.speed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      style={{ fontFamily: 'monospace', fontSize: 'larger', whiteSpace: 'nowrap' }}
    >
      {displayedText}
    </motion.div>
  );
};

export default TypingAnimation;
