import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AuthActionsKind } from '../contexts/AuthContext/types';
import { useNavigate } from 'react-router-dom';
import { BookBackground } from '../assets/SVG';
const RequireAuth = ({ children }: any) => {

    const navigate = useNavigate()
    const [authData, authDispach] = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    function isLogged() {
        return new Promise((resolve, reject) => {
            authDispach({ type: AuthActionsKind.VERIFY })
            resolve(setLoading)
        })
    }

    useEffect(() => {
        async function verify() {
            await isLogged().then((r: any) => {
                if (authData?.valid) {
                    setLoading(false)
                } else {
                    navigate('/')
                }
            }).catch(err => navigate('/'))
        }
        verify()
    }, [])
    return loading ?
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <BookBackground />
        </div> : <>{children}</>
}

export default RequireAuth