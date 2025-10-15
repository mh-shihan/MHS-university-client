import { Navigate, useLocation } from 'react-router';
import { selectCurrentToken } from '../../redux/features/auth/authSlice';
import { useAppSelector } from '../../redux/hooks';
import type { childrenTypes } from '../../types';

const ProtectedRoute = ({ children }: childrenTypes) => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
