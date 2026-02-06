// providers/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@stores/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute = ({ 
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  
  const isAuthenticated = useAuthStore(state => state.user);
  
  console.log('🛡️ ProtectedRoute:', {
    path: location.pathname,
    isAuthenticated,
  });
  
  if (!isAuthenticated) {
    console.log('🚫 Нет авторизации, редирект на /login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  console.log('✅ Доступ разрешён');
  return <>{children}</>;
};