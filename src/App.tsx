// App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { TaskDetailPage } from './pages/TaskDetailPage';
import { TestsPage } from './pages/TestsPage';
import { TestDetailPage } from './pages/TestDetailPage';
import { UsersPage } from './pages/UsersPage';
import { UserDetailPage } from './pages/UserDetailPage';
import { LoginPage } from './pages/auth/LoginPage'
import { ProtectedRoute } from '@providers/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />

      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>

        <Route index element={<DashboardPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/:id" element={<TaskDetailPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserDetailPage />} />
        <Route path="tests" element={<TestsPage />} />
        <Route path="tests/:id" element={<TestDetailPage />} />

      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App
