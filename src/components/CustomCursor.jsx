import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target;
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('[role="button"]');

      setIsHovering(!!isInteractive);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out will-change-transform"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : isClicking ? 0.8 : 1})`
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 border ${
            isHovering
              ? 'w-9 h-9 border-[#5A2D91] bg-[#5A2D91]/10'
              : 'w-7 h-7 border-[#8E63CB]/40'
          }`}
        />
      </div>

      {/* Center Laser Precision Dot */}
      <div
        className="fixed pointer-events-none z-[9999] will-change-transform"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#5A2D91]" />
      </div>
    </>
  );
}
