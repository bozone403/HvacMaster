import { useState, useEffect } from 'react';

/**
 * Custom hook that tracks window scroll position
 * @returns The current scroll position in pixels
 */
const useScrollPosition = (): number => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Call handler right away so state gets updated with initial scroll position
    handleScroll();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
