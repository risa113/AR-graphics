import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
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
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.6 : isClicking ? 0.8 : 1})`
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 border ${
            isHovering
              ? 'w-10 h-10 border-[#8E63CB] bg-[#8E63CB]/15 shadow-[0_0_15px_rgba(142,99,203,0.5)]'
              : 'w-7 h-7 border-[#D8C2F0]/40'
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
        <div className="w-1.5 h-1.5 rounded-full bg-[#D8C2F0] shadow-[0_0_8px_#FFFFFF]" />
      </div>
    </>
  );
}
