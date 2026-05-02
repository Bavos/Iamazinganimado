import {AbsoluteFill, Composition} from 'remotion';
import {Bars} from './Bars';
import {TextReveal} from './TextReveal';

const IamazingSchoolComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#ffffff'}}>
      <Bars />
      <TextReveal text="Iamazing School" />
    </AbsoluteFill>
  );
};

export default function Root() {
  return (
    <Composition
      id="IamazingSchool"
      component={IamazingSchoolComposition}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
    />
  );
}
