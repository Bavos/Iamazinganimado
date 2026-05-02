import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const TextReveal: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const reveal = spring({
    frame: frame - 420,
    fps,
    config: {
      damping: 28,
      stiffness: 120,
      mass: 0.9,
    },
    durationInFrames: 140,
  });

  const opacity = interpolate(frame, [380, 500, 600], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: 110,
        fontWeight: 700,
        letterSpacing: 1,
        color: '#111111',
        opacity,
        transform: `translateY(${(1 - reveal) * 16}px) scale(${0.985 + reveal * 0.015})`,
      }}
    >
      {text}
    </div>
  );
};
