import { RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';

// Components
import { Toaster } from '@/components/ui/toaster';

// Routes
import { ROUTER } from './routes';

// Provider
import { ThemeProvider } from './theme/theme-wrapper';

const App = () => {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <ThemeProvider>
        <RouterProvider router={ROUTER} />
      </ThemeProvider>
      <Toaster />
    </SWRConfig>
  );
};

export default App;
