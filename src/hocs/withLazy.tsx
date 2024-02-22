import Spinner from '@/components/Spinner';
import { FunctionComponent, Suspense } from 'react';

const withLazy = <TProps extends object>(Component: FunctionComponent<TProps>): FunctionComponent<TProps> => {
  const ComponentLazy = (props: TProps): JSX.Element => (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );

  return ComponentLazy;
};

export default withLazy;
