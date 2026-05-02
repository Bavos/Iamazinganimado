import React from 'react';

export const TextReveal = ({opacity}: {opacity: number}) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 118,
        fontWeight: 800,
        letterSpacing: -3,
        color: '#111111',
        opacity,
      }}
    >
      Iamazing School
    </div>
  );
};
