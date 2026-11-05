import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Disable completely on touch devices or fine pointer absent
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse), (hover: none)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isPressed = false;
    let isVisible = false;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      // Check interactive elements with quick tag/class check
      const target = e.target;
      const interactive = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button, a, input, select, textarea, [role="button"]')
      );
      
      const newHover = !!interactive;
      if (newHover !== isHovered) {
        isHovered = newHover;
        if (ringRef.current) {
          if (isHovered) {
            ringRef.current.classList.add('cursor-hover');
          } else {
            ringRef.current.classList.remove('cursor-hover');
          }
        }
      }
    };

    const onMouseDown = () => {
      isPressed = true;
      if (ringRef.current) ringRef.current.classList.add('cursor-press');
    };

    const onMouseUp = () => {
      isPressed = false;
      if (ringRef.current) ringRef.current.classList.remove('cursor-press');
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    // Smooth RAF loop for the follower ring (60-120fps hardware accelerated)
    const updateCursor = () => {
      if (isVisible) {
        ringX += (mouseX - ringX) * 0.22;
        ringY += (mouseY - ringY) * 0.22;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 -ml-3.5 -mt-3.5 w-7 h-7 rounded-full border border-[#8E63CB]/50 pointer-events-none z-[9999] opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          transitionProperty: 'opacity, width, height, background-color, border-color'
        }}
      />

      {/* Center Precision Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#5A2D91] pointer-events-none z-[9999] opacity-0 transition-opacity duration-300 will-change-transform"
      />

      <style>{`
        .cursor-hover {
          width: 38px !important;
          height: 38px !important;
          margin-left: -19px !important;
          margin-top: -19px !important;
          border-color: #5A2D91 !important;
          background-color: rgba(90, 45, 145, 0.12) !important;
        }
        .cursor-press {
          transform: scale(0.8) !important;
        }
      `}</style>
    </>
  );
}
