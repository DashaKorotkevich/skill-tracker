import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@stores/auth';
import type { LoginBase } from '@shared/types/auth';

// Валидация
const validationSchema = Yup.object({
  username: Yup.string()
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .required('Обязательное поле'),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const login = useAuthStore(state => state.login);
  const isLoading = useAuthStore(state => state.isLoading);
  const error = useAuthStore(state => state.error);
  
  const from = location.state?.from?.pathname || '/';
  
  const initialValues: LoginBase = {
    username: '',
    password: '',
  };
  
  const handleSubmit = async (values: LoginBase, { resetForm }: { resetForm: () => void }) => {
    
    try {
      // Используем метод стора вместо прямого вызова API
      const user = await login(values);
      console.log('Привет,', user);
      
      resetForm();

      navigate(from, { replace: true });
      
    } catch (error) {
      console.error('❌ Ошибка:', error);
      // Ошибка уже установлена в сторе
    }
  };



  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Вход в Skill Tracker</h1>
        <p>Система управления навыками сотрудников</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="username">Имя пользователя</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="username"
                  placeholder="admin"
                  className="form-input"
                  disabled={isLoading}
                />
                <ErrorMessage name="username" component="div" className="error-text" />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="admin123123"
                  className="form-input"
                  disabled={isLoading}
                />
                <ErrorMessage name="password" component="div" className="error-text" />
              </div>
              
              <button
                type="submit"
                className="login-button"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};