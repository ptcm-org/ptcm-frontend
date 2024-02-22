import { ReactNode, Suspense, memo } from 'react';
import areEqual from 'react-fast-compare';
import Spinner from './Spinner';

type TLazyProps = { children: ReactNode };

const LazyComponent = ({ children }: TLazyProps) => <Suspense fallback={<Spinner />}>{children}</Suspense>;

const Lazy = memo(LazyComponent, (prevProps: TLazyProps, nextProps: TLazyProps) => areEqual(prevProps, nextProps));

export default Lazy;
