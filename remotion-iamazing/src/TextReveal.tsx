import React from 'react';

type TextRevealProps = {
  opacity: number;
};

export const TextReveal: React.FC<TextRevealProps> = ({opacity}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, Arial, Helvetica, sans-serif',
        fontWeight: 800,
        fontSize: 140,
        letterSpacing: 1,
        color: '#1d2340',
        opacity,
        textAlign: 'center',
      }}
    >
      Iamazing School
    </div>
  );
};
