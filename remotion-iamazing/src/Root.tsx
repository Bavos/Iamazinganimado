import {Composition} from 'remotion';
import {MainComposition} from './Composition';

export const Root: React.FC = () => {
  return (
    <Composition
      id="IamazingSchool"
      component={MainComposition}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
