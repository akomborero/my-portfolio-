import { useState, useEffect, useCallback } from 'react';

export const useTypewriter = (
  phrases,
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseDuration = 1000,
  loop = true
) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleTyping = useCallback(() => {
    const currentPhrase = phrases[index];
    const speed = isDeleting ? deletingSpeed : typingSpeed;

    if (isPaused) return;

    const timeout = setTimeout(() => {
      setText(prevText =>
        isDeleting
          ? currentPhrase.substring(0, prevText.length - 1)
          : currentPhrase.substring(0, prevText.length + 1)
      );

      if (!isDeleting && text === currentPhrase) {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      } 
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        if (loop || index < phrases.length - 1) {
          setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, isPaused, phrases, typingSpeed, deletingSpeed, pauseDuration, loop]);

  useEffect(() => {
    handleTyping();
  }, [handleTyping]);

  const reset = useCallback(() => {
    setText('');
    setIndex(0);
    setIsDeleting(false);
    setIsPaused(false);
  }, []);

  return { text, reset };
};