import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

const WIDTH = 1920;
const HEIGHT = 1080;
const TOTAL_BARS = 620;

const TEXT = 'Iamazing School';

const textPattern = [
  'IIII   aaa   m   m   aaa   zzzzz  iii  n   n   gggg      SSSS   cccc  h   h   ooo   ooo   l    ',
  '  I   a   a  mm mm  a   a     z    iii  nn  n  g          S      c     h   h  o   o o   o  l    ',
  '  I   aaaaa  m m m  aaaaa    z     iii  n n n  g ggg      SSSS   c     hhhhh  o   o o   o  l    ',
  '  I   a   a  m   m  a   a   z      iii  n  nn  g   g         S   c     h   h  o   o o   o  l    ',
  'IIII  a   a  m   m  a   a  zzzzz   iii  n   n   gggg      SSSS   cccc  h   h   ooo   ooo   llll ',
];

const generateTextTargets = () => {
  const points: Array<{x: number; y: number}> = [];

  const cell = 14;
  const patternWidth = textPattern[0].length * cell;
  const patternHeight = textPattern.length * cell;

  const startX = WIDTH / 2 - patternWidth / 2;
  const startY = HEIGHT / 2 - patternHeight / 2;

  textPattern.forEach((row, rowIndex) => {
    [...row].forEach((char, colIndex) => {
      if (char !== ' ') {
        points.push({
          x: startX + colIndex * cell,
          y: startY + rowIndex * cell,
        });
      }
    });
  });

  return points;
};

const targets = generateTextTargets();

const getStartPosition = (index: number) => {
  const angle = index * 2.399963;
  const radius = 140 + (index % 31) * 17;

  return {
    x: WIDTH / 2 + Math.cos(angle) * radius,
    y: HEIGHT / 2 + Math.sin(angle) * radius,
  };
};

export const Bars: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({length: TOTAL_BARS}).map((_, index) => {
        const start = getStartPosition(index);
        const target = targets[index % targets.length];

        const progress = interpolate(frame, [180, 520], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const wave = Math.sin(frame * 0.06 + index * 0.35) * 42 * (1 - progress);

        const x = start.x + (target.x - start.x) * progress;
        const y = start.y + (target.y - start.y) * progress + wave;

        const height = interpolate(progress, [0, 1], [34, 16], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const hue = (index * 11 + frame * 0.4) % 360;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 5,
              height,
              borderRadius: 999,
              backgroundColor: `hsl(${hue}, 90%, 55%)`,
              transform: `translate(-50%, -50%) rotate(${progress * 90}deg)`,
              opacity: 0.96,
            }}
          />
        );
      })}
    </>
  );
};
