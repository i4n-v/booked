import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
const RequireAuth = ({ children }: any) => {
    const [authData] = useContext(AuthContext)
    if (!authData?.valid) return <Navigate to={'/'} />
    return <>{children}</>
}

export default RequireAuth