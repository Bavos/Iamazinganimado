import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Bars} from './Bars';

export const MainComposition: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        overflow: 'hidden',
      }}
    >
      <Bars />
    </AbsoluteFill>
  );
};
