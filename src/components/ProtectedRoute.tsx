import Layout from '@/layouts/MainLayout';
import useAuthStore from '@/stores/authStore';

import { Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? <Layout /> : <Navigate to="/ptcmauth/login" replace />;
};

export default ProtectedRoutes;
