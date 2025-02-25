import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user || !user.token) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.user_role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;