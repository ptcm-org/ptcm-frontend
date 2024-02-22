import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Constants
import { ROUTES } from '@/constants';

// Layouts
import ProtectedRoutes from '@/components/ProtectedRoute';

const Login = lazy(() => import('@/pages/Login'));
const Dashboard = lazy(() => import('@/pages/PlantingDiary'));
const TreeScreening = lazy(() => import('@/pages/TreeScreening'));
const TissueDevelopment = lazy(() => import('@/pages/TissueDevelopment'));
const ScanForInfectedSamples = lazy(() => import('@/pages/ScanForInfectedSamples'));
const EnterInfectedSampleInformation = lazy(() => import('@/pages/EnterInfectedSampleInformation'));
const Environment = lazy(() => import('@/pages/Environment'));
const BrightRoom = lazy(() => import('@/pages/BrightRoom'));
const User = lazy(() => import('@/pages/User'));
const UserManagement = lazy(() => import('@/pages/UserManagement'));

export const ROUTER = createBrowserRouter([
  {
    path: '/',
    Component: ProtectedRoutes,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: ROUTES.TREE_SCREENING,
        Component: TreeScreening,
      },
      {
        path: ROUTES.TISSUE_DEVELOPMENT,
        Component: TissueDevelopment,
      },
      {
        path: ROUTES.ENTER_INFECTED_SAMPLE_INFORMATION,
        Component: EnterInfectedSampleInformation,
      },
      {
        path: ROUTES.SCAN_FOR_INFECTED_SAMPLES,
        Component: ScanForInfectedSamples,
      },
      {
        path: ROUTES.ENVIRONMENT,
        Component: Environment,
      },
      {
        path: ROUTES.BRIGHT_ROOM,
        Component: BrightRoom,
      },
      {
        path: ROUTES.USER,
        Component: User,
      },
      {
        path: ROUTES.USER_MANAGEMENT,
        Component: UserManagement,
      },
    ],
  },
  {
    path: '/auth',
    children: [
      {
        path: ROUTES.LOGIN,
        Component: Login,
      },
    ],
  },
]);
