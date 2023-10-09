// hoc/withAuth.tsx
import { useEffect, ComponentType, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/slices';

const withAuth = <P extends object>(Component: ComponentType<P>) => function ProtectedRoute(
  props: P,
) {
  const user = useSelector((state: RootState) => state.session.user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = user?.token;
    if (!token) {
      setIsAuthenticated(false);
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return isAuthenticated ? <Component {...props} /> : null;
};

export default withAuth;
