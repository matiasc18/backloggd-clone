import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to top of the screen
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;