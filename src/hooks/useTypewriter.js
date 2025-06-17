// hooks/useTypewriter.ts
import { useState, useEffect } from 'react';

const useTypewriter = (
  words: string[],
  typingSpeed: number = 150,
  deletingSpeed: number = 100,
  delayBetweenWords: number = 1000,
  loop: boolean = true
) => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (text.length < words[currentIndex].length) {
        timeout = setTimeout(() => {
          setText(words[currentIndex].substring(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenWords);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.substring(0, text.length - 1));
        }, deletingSpeed);
      } else {
        const nextIndex = (currentIndex + 1) % words.length;
        setCurrentIndex(loop ? nextIndex : Math.min(nextIndex, words.length - 1));
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, currentIndex, isTyping, words, typingSpeed, deletingSpeed, delayBetweenWords, loop]);

  return { text };
};

export default useTypewriter;