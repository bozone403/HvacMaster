import React, { useEffect, useState } from 'react';
import useScrollPosition from '@/hooks/useScrollPosition';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    // Show button when page is scrolled down 300px
    if (scrollPosition > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scrollPosition]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 h-12 w-12 bg-primary text-dark rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      aria-label="Scroll to top"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default BackToTop;
