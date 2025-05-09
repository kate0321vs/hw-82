import { Navigate } from 'react-router-dom';

interface IProtectedRouteProps extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to='/' />
  }
  return children as React.ReactElement;
};

export default ProtectedRoute;