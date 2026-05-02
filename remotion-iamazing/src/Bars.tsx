import {useMemo} from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

type BarSpec = {
  id: number;
  x: number;
  y: number;
  hue: number;
  baseHeight: number;
  phase: number;
  amplitude: number;
  targetX: number;
  targetY: number;
};

const BAR_COUNT = 220;

const createBars = (width: number, height: number, textWidth: number): BarSpec[] => {
  const centerX = width / 2;
  const centerY = height / 2;

  return new Array(BAR_COUNT).fill(null).map((_, i) => {
    const spreadX = Math.random() * width;
    const spreadY = Math.random() * height;
    const progress = i / (BAR_COUNT - 1);

    return {
      id: i,
      x: spreadX,
      y: spreadY,
      hue: Math.round(180 + Math.random() * 180),
      baseHeight: 14 + Math.random() * 26,
      phase: Math.random() * Math.PI * 2,
      amplitude: 4 + Math.random() * 12,
      targetX: centerX - textWidth / 2 + progress * textWidth,
      targetY: centerY + (Math.sin(progress * Math.PI * 6) * 18 - 14),
    };
  });
};

export const Bars: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();

  const bars = useMemo(() => createBars(width, height, 760), [width, height]);

  const settle = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 80,
      mass: 1.4,
    },
    durationInFrames: 420,
  });

  const globalOpacity = interpolate(frame, [0, 25, 560, 600], [0, 1, 1, 0.95]);

  return (
    <div style={{position: 'absolute', inset: 0, opacity: globalOpacity}}>
      {bars.map((bar) => {
        const wave = Math.sin(frame / 16 + bar.phase) * bar.amplitude;
        const x = interpolate(settle, [0, 1], [bar.x, bar.targetX]);
        const y = interpolate(settle, [0, 1], [bar.y + wave, bar.targetY + wave * 0.3]);

        return (
          <div
            key={bar.id}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 3,
              height: bar.baseHeight + Math.abs(wave) * 0.8,
              borderRadius: 999,
              backgroundColor: `hsl(${bar.hue} 85% 52%)`,
              transform: 'translate(-50%, -50%)',
              opacity: 0.9,
            }}
          />
        );
      })}
    </div>
  );
};
