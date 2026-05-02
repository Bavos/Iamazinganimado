import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

const TOTAL_BARS = 260;
const WIDTH = 1920;
const HEIGHT = 1080;

const getTargetPosition = (index: number) => {
  const columns = 52;
  const rows = 5;

  const col = index % columns;
  const row = Math.floor(index / columns) % rows;

  const textWidth = 1050;
  const textHeight = 190;

  const x = WIDTH / 2 - textWidth / 2 + (col / (columns - 1)) * textWidth;
  const y = HEIGHT / 2 - textHeight / 2 + (row / (rows - 1)) * textHeight;

  return {x, y};
};

export const Bars = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({length: TOTAL_BARS}).map((_, index) => {
        const angle = index * 137.5;
        const startX = WIDTH / 2 + Math.cos(angle) * (250 + (index % 9) * 55);
        const startY = HEIGHT / 2 + Math.sin(angle) * (120 + (index % 7) * 35);

        const target = getTargetPosition(index);

        const progress = interpolate(frame, [0, 360, 540], [0, 0.15, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const wave = Math.sin(frame * 0.06 + index * 0.35) * 34;

        const x = startX + (target.x - startX) * progress;
        const y = startY + (target.y - startY) * progress + wave * (1 - progress);

        const barHeight = 18 + Math.abs(Math.sin(frame * 0.08 + index)) * 58 * (1 - progress);
        const hue = (index * 9 + frame * 0.25) % 360;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 6,
              height: barHeight,
              borderRadius: 999,
              backgroundColor: `hsl(${hue}, 85%, 58%)`,
              transform: 'translate(-50%, -50%)',
              opacity: 0.95,
            }}
          />
        );
      })}
    </>
  );
};
