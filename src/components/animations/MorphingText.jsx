import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MorphingTextAnimation({ texts }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 4000); // 4 seconds per text

    return () => clearInterval(interval);
  }, [texts]);

  return (
    <div className="relative inline-block overflow-hidden h-[1.5em] w-full text-center md:text-left">
      <TextAnimation text={texts[index]} />
    </div>
  );
}

function TextAnimation({ text }) {
  const chars = text.split("");
  const counts = {};

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {chars.map((char) => {
        counts[char] = counts[char] ?? 0;
        const id = `${char}-${counts[char]++}`;

        return (
          <motion.span
            style={{ display: "inline-block", whiteSpace: "pre" }}
            key={id}
            layout="position"
            layoutId={id}
            initial={{ opacity: 0, filter: "blur(4px)", scale: 0.8, y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)", scale: 0.8, y: -10 }}
            transition={{ ease: "easeInOut", duration: 0.6 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </AnimatePresence>
  );
}
