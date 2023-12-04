import { Form, Formik } from "formik"
import { MyInputAbstract } from ".."
import { registerSchema } from "../../schemas";
import logo from '../../../assets/Logo sin letras.png'
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { UserStateProps } from "../../../interfaces/interfaces";
import LoadingCircle from "../ui/Loading";
import { useEffect, useState } from "react";


interface RegisterProps {
    email: string;
    password: string;
    passConfirmation: string;
  }
  

export const FormRegister = () => {

    const { startRegister } = useAuth();
    const {status} = useSelector( (state: UserStateProps) => state.user );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === "checking") {
          setLoading(true);
        } else {
          setLoading(false);
        }
      }, [status]);
    

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                passConfirmation: '',
            }}
            onSubmit={ (values: RegisterProps) => {
                
                startRegister({ email: values.email, password: values.password})
                // startLogin( values )
            }}
            validationSchema={registerSchema} 

        >
        {
            () => (
                <Form className="login-form">
                {loading && <LoadingCircle />}
                <div className="logo">
                <img src={logo} alt="Logo" />
                </div>
                <h2 className='text-white'>Registro</h2>
                <p className='text-lightgray'>Ingresa los siguientes datos para registrarte y obtener un número de rifa</p>
                
                <MyInputAbstract 
                    label='Correo empresarial:'
                    type='email'
                    id='email'
                    name='email'
                />

                <MyInputAbstract 
                    label='Contraseña:'
                    type='password'
                    id='password'
                    name='password'
                />

                <MyInputAbstract 
                    label='Confirmar Contraseña:'
                    type='password'
                    id='passConfirmation'
                    name='passConfirmation'
                />


                <p className='text-lightgray text-size-1'>Si ya estas registrado inicia sesion para verificar tu número de rifa, <Link to="/auth/login"> inicia sesion </Link></p>


                <button type="submit" className="mt-3" >
                    Registrarse
                </button>
            

            </Form>
            )
        }

        </Formik>
    )
}
