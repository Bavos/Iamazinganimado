import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Bars} from './Bars';
import {TextReveal} from './TextReveal';

export const Main = () => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [420, 560], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Bars />
      <TextReveal opacity={textOpacity} />
    </AbsoluteFill>
  );
};
