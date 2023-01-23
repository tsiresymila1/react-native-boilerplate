import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthRequired = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token') || location.pathname === '/logout') {
      console.log('isExecuted');
      localStorage.removeItem('token');
      localStorage.removeItem('expiration_date');
      navigate('/login', {
        replace: true,
      });
    }
  }, [location.pathname, navigate]);

  return children;
};

export default AuthRequired;
