import { useState, useEffect } from 'react';

/**
 * Hook that returns true if the screen width is below the mobile breakpoint
 * @param breakpoint - The pixel width that defines a mobile device (default: 768px)
 * @returns Whether the current viewport is considered mobile
 */
export function useMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check on initial load
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Set initial value
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [breakpoint]);

  return isMobile;
}

export default useMobile;
