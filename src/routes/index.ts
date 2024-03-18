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
const LOVSettingPage = lazy(() => import('@/pages/Settings/Lov/Pages/LovPage'));
const CategoryPage = lazy(() => import('@/pages/Category'));
const PTCMLogin = lazy(() => import('@/pages/Auth/Pages/LoginPage'));
const GlobalSetting = lazy(() => import('@/pages/Settings/Global/Pages/GlobalSettingsPage'));
const SettingPage = lazy(() => import('@/pages/Settings/Pages/SettingPage'));
const OrderPages = lazy(() => import('@/pages/Orders/Pages/OrderPages'));
const CreateOrder = lazy(() => import('@/pages/Orders/Pages/CreateOrder'));
const SubCulturingPages = lazy(() => import('@/pages/SubCulturing/Pages/SubCulturingPages'));
const CreateSubCulturingPage = lazy(() => import('@/pages/SubCulturing/Pages/CreateSubCulturingPage'));
const UpdateSubCulturingPage = lazy(() => import('@/pages/SubCulturing/Pages/UpdateSubCulturingPage'));
const InitiateCulturePages = lazy(() => import('@/pages/InitiateCulture/Pages/InitiateCulturePages'));
const CulturingCellPages = lazy(() => import('@/pages/CulturingCell/Pages/CulturingCellPages'));
const CreateInitiateCulture = lazy(() => import('@/pages/InitiateCulture/Pages/CreateInitiateCulture'));
const CreateCulturingCell = lazy(() => import('@/pages/CulturingCell/Pages/CreateCulturingCell'));
const CellCultureRoomPages = lazy(() => import('@/pages/CellCultureRoom/Pages/CellCultureRoomPages'));
const CreateCellCultureRoomPage = lazy(() => import('@/pages/CellCultureRoom/Pages/CreateCellCultureRoomPage'));
const ContaminatedBatchPages = lazy(() => import('@/pages/ContaminatedBatch/Pages/ContaminatedBatchPages'));
const CreateContaminatedBatchPage = lazy(() => import('@/pages/ContaminatedBatch/Pages/CreateContaminatedBatchPage'));

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
      {
        path: ROUTES.LOV,
        Component: LOVSettingPage,
      },
      {
        path: ROUTES.CATEGORY,
        Component: CategoryPage,
      },
      {
        path: ROUTES.ORDERS,
        Component: OrderPages,
      },
      {
        path: ROUTES.CREATEORDER,
        Component: CreateOrder,
      },
      {
        path: ROUTES.SUBCULTURING,
        Component: SubCulturingPages,
      },
      {
        path: ROUTES.CREATESUBCULTURING,
        Component: CreateSubCulturingPage,
      },
      {
        path: ROUTES.UPDATESUBCULTURING,
        Component: UpdateSubCulturingPage,
      },
      {
        path: ROUTES.INITIATECULTURE,
        Component: InitiateCulturePages,
      },
      {
        path: ROUTES.CREATEINITIATECULTURE,
        Component: CreateInitiateCulture,
      },
      {
        path: ROUTES.UPDATEINITIATECULTURE,
        Component: InitiateCulturePages,
      },
      {
        path: ROUTES.CULTURINGCELL,
        Component: CulturingCellPages,
      },
      {
        path: ROUTES.CREATECULTURINGCELL,
        Component: CreateCulturingCell,
      },
      {
        path: ROUTES.CELLCULTURES,
        Component: CellCultureRoomPages,
      },
      {
        path: ROUTES.CREATECELLCULTURE,
        Component: CreateCellCultureRoomPage,
      },
      {
        path: ROUTES.CONTAMINATEBATCH,
        Component: ContaminatedBatchPages,
      },
      {
        path: ROUTES.CREATECONTAMINATEBATCH,
        Component: CreateContaminatedBatchPage,
      },
      {
        path: 'settings',
        children: [
          {
            index: true,
            Component: SettingPage,
          },
          {
            path: ROUTES.LOV,
            Component: LOVSettingPage,
          },
          {
            path: ROUTES.GLOBALSETTING,
            Component: GlobalSetting,
          },
        ]
      }
    ],
  },
  {
    path: '/auth',
    children: [
      {
        path: ROUTES.LOGIN,
        Component: PTCMLogin,
      },
    ],
  },
]);
