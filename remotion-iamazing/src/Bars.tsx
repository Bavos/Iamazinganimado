import {useMemo} from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

type BarData = {
  xStart: number;
  yStart: number;
  wavePhase: number;
  waveSpeed: number;
  amplitude: number;
  height: number;
  width: number;
  hue: number;
  targetX: number;
  targetY: number;
};

const BAR_COUNT = 260;
const LETTER_GRID_COLUMNS = 52;
const LETTER_GRID_ROWS = 5;
const VIEW_W = 1920;
const VIEW_H = 1080;

const seeded = (seed: number) => {
  const x = Math.sin(seed * 999.91) * 10000;
  return x - Math.floor(x);
};

export const Bars: React.FC = () => {
  const frame = useCurrentFrame();

  const bars = useMemo<BarData[]>(() => {
    const textAreaWidth = 1260;
    const textAreaHeight = 260;
    const startX = (VIEW_W - textAreaWidth) / 2;
    const startY = (VIEW_H - textAreaHeight) / 2;

    return new Array(BAR_COUNT).fill(0).map((_, i) => {
      const col = i % LETTER_GRID_COLUMNS;
      const row = Math.floor(i / LETTER_GRID_COLUMNS) % LETTER_GRID_ROWS;
      const targetX = startX + (col / (LETTER_GRID_COLUMNS - 1)) * textAreaWidth;
      const targetY = startY + (row / (LETTER_GRID_ROWS - 1)) * textAreaHeight;

      return {
        xStart: seeded(i + 1) * VIEW_W,
        yStart: seeded(i + 100) * VIEW_H,
        wavePhase: seeded(i + 200) * Math.PI * 2,
        waveSpeed: 0.045 + seeded(i + 300) * 0.02,
        amplitude: 28 + seeded(i + 400) * 52,
        height: 22 + seeded(i + 500) * 62,
        width: 4 + seeded(i + 600) * 2,
        hue: 220 + seeded(i + 700) * 60,
        targetX,
        targetY,
      };
    });
  }, []);

  const alignProgress = interpolate(frame, [210, 450, 600], [0, 0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const motionDamping = interpolate(frame, [420, 600], [1, 0.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{position: 'absolute', inset: 0}}>
      {bars.map((bar, i) => {
        const wave = Math.sin(frame * bar.waveSpeed + bar.wavePhase) * bar.amplitude * motionDamping;
        const x = bar.xStart + (bar.targetX - bar.xStart) * alignProgress;
        const y = bar.yStart + (bar.targetY - bar.yStart) * alignProgress + wave;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: bar.width,
              height: bar.height,
              borderRadius: 999,
              backgroundColor: `hsl(${bar.hue}, 55%, 56%)`,
              opacity: 0.9,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
  );
};
