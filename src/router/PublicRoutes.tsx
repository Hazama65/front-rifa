import { Navigate } from "react-router-dom"

interface Props {
    isAuth: boolean;
    children: React.ReactNode
}

export const PublicRoutes = ({isAuth,children}: Props) => {
    
    return isAuth  
      ? <Navigate to="/home"/>
      : children
}