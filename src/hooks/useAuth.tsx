import { useDispatch } from "react-redux";
import ruletaApi from "../api/ruletaApi"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/user/userSlice";
import { toast } from 'react-toastify';
interface LoginProps {
    email: string;
    password: string;
}


export const useAuth = () => {
    const dispatch = useDispatch()

    const startLogin = async (values: LoginProps) => {
        dispatch( onChecking() );

        try{

            toast.info('Iniciando sesión...', { position: toast.POSITION.TOP_CENTER });
            const data = await ruletaApi.post('/auth/login', values);
            localStorage.setItem('token', data.data.token);
            dispatch( onLogin(data.data.user) );
            toast.success('Inicio exitoso!', { position: toast.POSITION.TOP_CENTER });
        }catch(error){
            console.log(error);
            dispatch( onLogout('An error ocurred while loged user') );
            toast.error('Error al iniciar sesion', { position: toast.POSITION.TOP_CENTER });
        }
   
    }

    const startRegister = async (values: LoginProps) => {
        try{
            dispatch( onChecking() );
            toast.info('Iniciando sesión...', { position: toast.POSITION.TOP_CENTER });
            const data = await ruletaApi.post('/auth/register', values);
            localStorage.setItem('token', data.data.token);

            dispatch( onLogin(data.data.user) );
            toast.success('¡Registro exitoso!', { position: toast.POSITION.TOP_CENTER });
        }catch(error){
            dispatch( onLogout('An error ocurred while loged user') );
            toast.error('Error al registrar usuario', { position: toast.POSITION.TOP_CENTER });
        }
    }

    const checkAuth = async () => {

        try{
            const token = localStorage.getItem('token');
            if(!token) {
                return dispatch( onLogout('Cerrando Sesion') )
            }
            
            const {data} = await ruletaApi.get('/auth/renew');

            dispatch(onLogin(data.user));
            
    
        }catch(error){

            dispatch( onLogout('Usuario no autenticado') );
            console.log(error);
            dispatch( clearErrorMessage() );

        }
    }
    

    return {startLogin, checkAuth, startRegister}
}

