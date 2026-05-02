import {AbsoluteFill} from 'remotion';
import {Bars} from './Bars';
import {TextReveal} from './TextReveal';

export const Main: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#ffffff'}}>
      <Bars />
      <TextReveal text="Iamazing School" />
    </AbsoluteFill>
  );
};
