import {Composition} from 'remotion';
import {Main} from './Composition';

export const Root: React.FC = () => {
  return (
    <Composition
      id="IamazingSchool"
      component={Main}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
