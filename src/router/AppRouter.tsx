import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PublicRoutes } from './PublicRoutes'
import { AuthRouter } from './AuthRouter'
import { useEffect, useState } from 'react';
import { PrivateRoutes } from './PrivateRoutes';
import { HomePage } from '../Ruleta';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { UserStateProps } from '../interfaces/interfaces';
import LoadingCircle from '../Ruleta/components/ui/Loading';



export const AppRouter = () => {
    // const dispatch = useDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {checkAuth} = useAuth()
    const {status} = useSelector( (state: UserStateProps) => state.user );

    useEffect(() => {
        checkAuth()
        if(status ==='active'){
            setIsLoggedIn(true)
        }
        if(status ==='inactive'){
            setIsLoggedIn(false)
        }

    }, [status]);

    if(status === 'checking'){
        return (
            <LoadingCircle />
        )
    }
    

    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/auth/*" element={
                    <PublicRoutes isAuth={isLoggedIn}>
                        <AuthRouter/>

                    </PublicRoutes>
                    }
                />
            
                <Route 
                
                    path="/*"
                    element={
                        <PrivateRoutes isAuth={isLoggedIn}>
                            <HomePage />
                        </PrivateRoutes>
                    }
                />  
        
            </Routes>

            
        </BrowserRouter>
        
    )
}