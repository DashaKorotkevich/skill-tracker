// providers/AppProviders.tsx
import { BrowserRouter } from 'react-router-dom';
import type { ReactNode } from 'react'; // Добавляем тип

// Тип для children
interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};