import { Formik, Form } from 'formik';
import { loginSchema } from "../../schemas";
import { MyInputAbstract } from "..";
import { Link } from "react-router-dom";

import logo from '../../../assets/Logo sin letras.png';
import { useAuth } from '../../../hooks/useAuth';



interface LoginProps {
  email: string;
  password: string;
}


export const FormLogin = () => {

  const {startLogin} = useAuth();

  return (
    <Formik
      initialValues={{
          email: '',
          password: ''
      }}
      onSubmit={ (values: LoginProps) => {
    
          startLogin( values )
      }}
      validationSchema={loginSchema} 
    >
      {
        () => (
          <Form className="login-form"> 

            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <h2 className='text-white'>Ingresar</h2>
            <MyInputAbstract 
              label="Email:"
              id="email"
              name='email'
              type='email'
            />

            <MyInputAbstract 
              label="Contraseña:"
              id="password"
              name='password'
              type='password'
            />
        
            <p className='text-lightgray text-size-1'>Si no tienes cuenta, registrate <Link to={'/auth/register'}> registrarse </Link></p>

            <button type="submit" className="mt-3" >
              Iniciar Sesión
            </button>

          </Form>
        )
      }

    </Formik>
  )
}


