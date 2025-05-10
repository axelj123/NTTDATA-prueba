import { Navigate, Route, Routes } from 'react-router';
import DashboardView from '../modules/dashboard/page/DashboardView';
import LoginView from '../modules/auth/page/LoginView';
import { useIsAuthenticated } from '../store/auth/authSelectors';
import Layout from '@/layout/Layout';

export default function AppRoutes() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Routes>
      {
        isAuthenticated ? (
          <>  
           <Route path="/" element={<Layout />}>
           
    
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardView />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginView />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )
      }
    </Routes>
  );
}
